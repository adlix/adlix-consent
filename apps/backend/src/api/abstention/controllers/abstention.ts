'use strict'

const { createCoreController } = require('@strapi/strapi').factories

/** Simple keyword-based thematic grouping */
const THEME_KEYWORDS = {
  'Ressourcen': ['ressourc', 'budget', 'geld', 'kosten', 'personal', 'zeit', 'kapazität', 'aufwand', 'mitarbeiter'],
  'Zeitplan': ['zeitplan', 'termin', 'deadline', 'frist', 'dauer', 'verzöger', 'dringend', 'eilig', 'pünktlich'],
  'Qualität': ['qualität', 'standard', 'anforderung', 'prüfung', 'test', 'fehler', 'mangel', 'risiko', 'sicherheit'],
  'Kommunikation': ['kommunikation', 'transparenz', 'information', 'rückmeldung', 'feedback', 'mitteilung', 'klärung'],
  'Prozess': ['prozess', 'ablauf', 'verfahren', 'methode', 'struktur', 'organisation', 'rolle', 'verantwortung'],
  'Betroffene': ['betroffen', 'auswirkung', 'konsequenz', 'folge', 'nebenwirkung', 'stakeholder', 'team', 'gruppe'],
}

function groupByTheme(texts) {
  const groups = {}

  for (const [theme, keywords] of Object.entries(THEME_KEYWORDS)) {
    const matches = texts.filter(t =>
      keywords.some(kw => t.toLowerCase().includes(kw))
    )
    if (matches.length > 0) {
      groups[theme] = matches
    }
  }

  // Collect ungrouped texts
  const groupedTexts = new Set(Object.values(groups).flat())
  const ungrouped = texts.filter(t => !groupedTexts.has(t))
  if (ungrouped.length > 0) {
    groups['Sonstiges'] = ungrouped
  }

  return groups
}

function generateSummary(groups) {
  const themes = Object.keys(groups)
  if (themes.length === 0) return 'Keine anonymen Bedenken vorhanden.'

  const parts = themes.map(theme => {
    const count = groups[theme].length
    return `${count} ${count === 1 ? 'Bedenken' : 'Bedenken'} zum Thema ${theme}`
  })
  return parts.join(', ') + '. Keine Rückschlüsse auf Einzelpersonen möglich.'
}

const coreController = createCoreController('api::abstention.abstention')

module.exports = createCoreController('api::abstention.abstention', ({ strapi }) => ({
  ...coreController,

  /**
   * GET /abstentions/:roundId/anonymous-concerns
   * Returns aggregated anonymous concerns for a round — no author info.
   */
  async anonymousConcerns(ctx) {
    const { roundId } = ctx.params

    const abstentions = await strapi.documents('api::abstention.abstention').findMany({
      filters: {
        round: { id: { $eq: roundId } },
        reason: 'D',
        anonymousConcern: { $notNull: true },
      },
      // Explicitly do NOT populate user — anonymity is critical
      populate: {},
    })

    // Extract only the concern texts — strip ALL author info
    const concerns = abstentions
      .map(a => a.anonymousConcern)
      .filter(Boolean)

    const thematicGroups = groupByTheme(concerns)
    const summary = generateSummary(thematicGroups)

    ctx.body = {
      data: {
        roundId: Number(roundId),
        totalConcerns: concerns.length,
        thematicGroups,
        summary,
      },
    }
  },

  /**
   * POST /abstentions/:roundId/analyse
   * Abstention pattern analysis — Pro feature.
   * Triggers when >= 3 abstentions exist for the round.
   */
  async analyse(ctx) {
    const { roundId } = ctx.params

    const abstentions = await strapi.documents('api::abstention.abstention').findMany({
      filters: {
        round: { id: { $eq: roundId } },
      },
      populate: {},
    })

    if (abstentions.length < 3) {
      return ctx.badRequest('Mindestens 3 Enthaltungen erforderlich für Analyse.')
    }

    // Count by reason
    const reasonCounts = { A: 0, B: 0, C: 0, D: 0, E: 0 }
    for (const a of abstentions) {
      if (reasonCounts[a.reason] !== undefined) reasonCounts[a.reason]++
    }

    // Extract detail texts for theme analysis
    const detailTexts = abstentions
      .map(a => a.detail)
      .filter(Boolean)

    // Also extract anonymous concerns
    const anonymousConcerns = abstentions
      .map(a => a.anonymousConcern)
      .filter(Boolean)

    const allTexts = [...detailTexts, ...anonymousConcerns]
    const thematicGroups = groupByTheme(allTexts)

    // Generate recommendations
    const recommendations = []

    if (reasonCounts.B > 0 || reasonCounts.C > 0) {
      recommendations.push('Erwäge eine weitere Informationsrunde — einige Teilnehmer brauchen mehr Klärung.')
    }
    if (reasonCounts.D > 0) {
      recommendations.push('Es gibt anonyme Bedenken. Prüfe die aggregierten Bedenken und erwäge eine Anpassung des Vorhabens.')
    }
    if (reasonCounts.E >= 3) {
      recommendations.push(`${reasonCounts.E} Enthaltungen ohne klare Position — mögliche Ursachen: Komplexität des Vorhabens, mangelnde Information, Konfliktvermeidung.`)
      recommendations.push('Empfehlung: Erwäge ein direktes Gespräch mit Betroffenen.')
    }
    if (reasonCounts.A > abstentions.length / 2) {
      recommendations.push('Mehrheit der Enthaltungen wegen Nicht-Betroffenheit — prüfe ob der richtigen Gruppe abgestimmt wird.')
    }
    if (recommendations.length === 0) {
      recommendations.push('Die Enthaltungen verteilen sich gleichmäßig. Kein auffälliges Muster erkennbar.')
    }

    ctx.body = {
      data: {
        roundId: Number(roundId),
        totalAbstentions: abstentions.length,
        reasonCounts,
        thematicGroups,
        recommendations,
      },
    }
  },
}))
