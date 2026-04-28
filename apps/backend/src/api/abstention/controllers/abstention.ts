'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

const GERMAN_STOP_WORDS = new Set([
  'der', 'die', 'das', 'und', 'in', 'ist', 'zu', 'den', 'von', 'des',
  'ich', 'ein', 'eine', 'mit', 'auf', 'für', 'nicht', 'es', 'auch', 'an',
  'bei', 'noch', 'aber', 'wie', 'oder', 'wenn', 'so', 'als', 'war', 'am',
  'im', 'dem', 'dass', 'sich', 'wir', 'mir', 'mich', 'doch', 'mein', 'mehr',
  'keine', 'kein', 'bis', 'nur', 'aus', 'ob', 'da', 'hier', 'dann', 'weil',
  'um', 'nach', 'durch', 'über', 'vor', 'sehr', 'wurde', 'werden', 'sind',
  'haben', 'worden', 'kann', 'wird', 'hat', 'sein', 'bin', 'dieser', 'diese',
  'diesem', 'diesen', 'dieses', 'wird', 'wurde', 'müssen', 'sollte', 'wäre',
  'gibt', 'gabe', 'werde', 'beim', 'zum', 'zur', 'ins', 'vom', 'ans',
]);

function extractKeywords(texts: string[]): string[] {
  const wordCount: Record<string, number> = {};
  for (const text of texts) {
    const words = text.toLowerCase().replace(/[^a-zäöüß\s]/g, ' ').split(/\s+/);
    for (const word of words) {
      if (word.length > 3 && !GERMAN_STOP_WORDS.has(word)) {
        wordCount[word] = (wordCount[word] || 0) + 1;
      }
    }
  }
  return Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word]) => word);
}

function generateRecommendations(
  counts: Record<string, number>,
  total: number
): string[] {
  const recs: string[] = [];

  if (counts.A > total / 2) {
    recs.push(
      'Mehr als die Hälfte der Enthaltungen stammen von Personen, die sich nicht betroffen fühlen. Das Vorhaben kann wahrscheinlich ohne weitere Anpassungen fortgesetzt werden.'
    );
  }

  if (counts.B + counts.C >= 2) {
    recs.push(
      'Mehrere Personen haben Informations- oder Klärungsbedarf. Eine zusätzliche Informationsrunde oder ein Q&A-Format könnte helfen, offene Fragen zu beantworten.'
    );
  } else if (counts.B + counts.C === 1) {
    recs.push(
      'Eine Person benötigt weitere Informationen. Ein direktes Gespräch oder ein ergänzendes Dokument könnte hilfreich sein.'
    );
  }

  if (counts.D >= 1) {
    recs.push(
      'Es gibt anonyme Bedenken. Eine vertrauliche Einzelkonsultation oder ein anonymer Rückkanal könnte helfen, diese zu adressieren, ohne Personen zu exponieren.'
    );
  }

  if (counts.E >= 2) {
    recs.push(
      'Mehrere Personen können sich nicht festlegen. Eine Klärung des Rahmens, des Zeitplans oder der Verantwortlichkeiten könnte die Entscheidungsgrundlage verbessern.'
    );
  } else if (counts.E === 1) {
    recs.push(
      'Eine Person kann sich nicht festlegen. Ein direktes Gespräch über konkrete Vorbehalte wird empfohlen.'
    );
  }

  if (recs.length === 0) {
    recs.push(
      'Die Enthaltungen zeigen kein eindeutiges Muster. Ein direktes Gespräch mit den betroffenen Personen wird empfohlen.'
    );
  }

  return recs;
}

module.exports = createCoreController('api::abstention.abstention', ({ strapi }) => ({
  async analyseAbstentions(ctx) {
    if (!ctx.state.user) {
      return ctx.unauthorized('Authentifizierung erforderlich');
    }

    const { roundId } = ctx.params;

    const round = await strapi.entityService.findOne('api::round.round', roundId, {
      populate: ['project'],
    });

    if (!round) {
      return ctx.notFound('Runde nicht gefunden');
    }

    const project = await strapi.entityService.findOne(
      'api::project.project',
      (round as any).project?.id,
      { populate: ['owner'] }
    );

    if (!project || (project as any).owner?.id !== ctx.state.user.id) {
      return ctx.forbidden('Nur der Einreicher kann die Analyse abrufen');
    }

    const abstentions = await strapi.entityService.findMany('api::abstention.abstention', {
      filters: { round: { id: roundId } },
      populate: ['user'],
    });

    if (!abstentions || abstentions.length < 3) {
      return ctx.badRequest('Mindestens 3 Enthaltungen erforderlich für eine Analyse');
    }

    const counts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 };
    const detailsByReason: Record<string, string[]> = { A: [], B: [], C: [], D: [], E: [] };

    for (const abstention of abstentions as any[]) {
      const r = abstention.reason as string;
      if (r in counts) {
        counts[r]++;
        if (abstention.detail) {
          detailsByReason[r].push(abstention.detail);
        }
      }
    }

    const clusters = [
      {
        id: 'not_affected',
        label: 'Nicht betroffen',
        reasonCodes: ['A'],
        description: 'Personen, die sich vom Vorhaben nicht direkt betroffen fühlen',
        count: counts.A,
        keywords: extractKeywords(detailsByReason.A),
      },
      {
        id: 'needs_info',
        label: 'Informationsbedarf',
        reasonCodes: ['B', 'C'],
        description: 'Personen, die mehr Informationen oder Klärung benötigen',
        count: counts.B + counts.C,
        keywords: extractKeywords([...detailsByReason.B, ...detailsByReason.C]),
      },
      {
        id: 'anonymous_concerns',
        label: 'Anonyme Bedenken',
        reasonCodes: ['D'],
        description: 'Personen mit Bedenken, die sie nicht öffentlich äußern möchten',
        count: counts.D,
        keywords: [],
      },
      {
        id: 'no_commitment',
        label: 'Keine Zusage möglich',
        reasonCodes: ['E'],
        description: 'Personen, die sich aktuell nicht festlegen können',
        count: counts.E,
        keywords: extractKeywords(detailsByReason.E),
      },
    ].filter((c) => c.count > 0);

    return ctx.send({
      data: {
        total: abstentions.length,
        clusters,
        recommendations: generateRecommendations(counts, abstentions.length),
        analysedAt: new Date().toISOString(),
      },
    });
  },
}));
