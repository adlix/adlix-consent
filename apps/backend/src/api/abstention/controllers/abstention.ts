"use strict";

const { createCoreController } = require("@strapi/strapi").factories;
const teamsWebhook = require("../../../utils/teamsWebhook").default;

/** Simple keyword-based thematic grouping */
const THEME_KEYWORDS = {
  Ressourcen: [
    "ressourc",
    "budget",
    "geld",
    "kosten",
    "personal",
    "zeit",
    "kapazität",
    "aufwand",
    "mitarbeiter",
  ],
  Zeitplan: [
    "zeitplan",
    "termin",
    "deadline",
    "frist",
    "dauer",
    "verzöger",
    "dringend",
    "eilig",
    "pünktlich",
  ],
  Qualität: [
    "qualität",
    "standard",
    "anforderung",
    "prüfung",
    "test",
    "fehler",
    "mangel",
    "risiko",
    "sicherheit",
  ],
  Kommunikation: [
    "kommunikation",
    "transparenz",
    "information",
    "rückmeldung",
    "feedback",
    "mitteilung",
    "klärung",
  ],
  Prozess: [
    "prozess",
    "ablauf",
    "verfahren",
    "methode",
    "struktur",
    "organisation",
    "rolle",
    "verantwortung",
  ],
  Betroffene: [
    "betroffen",
    "auswirkung",
    "konsequenz",
    "folge",
    "nebenwirkung",
    "stakeholder",
    "team",
    "gruppe",
  ],
};

function groupByTheme(texts) {
  const groups = {};

  for (const [theme, keywords] of Object.entries(THEME_KEYWORDS)) {
    const matches = texts.filter((t) =>
      keywords.some((kw) => t.toLowerCase().includes(kw)),
    );
    if (matches.length > 0) {
      groups[theme] = matches;
    }
  }

  // Collect ungrouped texts
  const groupedTexts = new Set(Object.values(groups).flat());
  const ungrouped = texts.filter((t) => !groupedTexts.has(t));
  if (ungrouped.length > 0) {
    groups["Sonstiges"] = ungrouped;
  }

  return groups;
}

function generateSummary(groups) {
  const themes = Object.keys(groups);
  if (themes.length === 0) return "Keine anonymen Bedenken vorhanden.";

  const parts = themes.map((theme) => {
    const count = groups[theme].length;
    return `${count} ${count === 1 ? "Bedenken" : "Bedenken"} zum Thema ${theme}`;
  });
  return parts.join(", ") + ". Keine Rückschlüsse auf Einzelpersonen möglich.";
}

const coreController = createCoreController("api::abstention.abstention");

/**
 * Audit log helper — fire-and-forget, never throws.
 */
async function auditLog(strapi, action, entityType, entityId, details, userId) {
  try {
    await strapi.entityService.create("api::audit-log.audit-log", {
      data: { action, entityType, entityId, details, user: userId || null },
    });
  } catch (_) {}
}

/**
 * Sends a Teams notification for a B/C abstention info/clarification request.
 * Gracefully ignores if webhook not configured.
 */
async function notifyInfoRequest(strapi, round, user, detail, reason) {
  try {
    const project = round.project;
    const owner = project?.owner;
    await teamsWebhook.notifyAbstentionRequest(
      project?.name || "Unbekanntes Projekt",
      round?.roundNumber || 0,
      user?.username || user?.email || "Unbekannt",
      reason,
      detail,
      owner?.username || owner?.email || "Kreiskoordination",
    );
  } catch (err) {
    console.warn("Teams notification failed:", err.message);
  }
}

module.exports = createCoreController(
  "api::abstention.abstention",
  ({ strapi }) => ({
    ...coreController,

    /**
     * GET /abstentions/:roundId/anonymous-concerns
     * Returns aggregated anonymous concerns for a round — no author info.
     */
    async anonymousConcerns(ctx) {
      const { roundId } = ctx.params;

      const abstentions = await strapi
        .documents("api::abstention.abstention")
        .findMany({
          filters: {
            round: { id: { $eq: roundId } },
            reason: "D",
            anonymousConcern: { $notNull: true },
          },
          // Explicitly do NOT populate user — anonymity is critical
          populate: {},
        });

      // Extract only the concern texts — strip ALL author info
      const concerns = abstentions
        .map((a) => a.anonymousConcern)
        .filter(Boolean);

      const thematicGroups = groupByTheme(concerns);
      const summary = generateSummary(thematicGroups);

      ctx.body = {
        data: {
          roundId: Number(roundId),
          totalConcerns: concerns.length,
          thematicGroups,
          summary,
        },
      };
    },

    /**
     * POST /abstentions/:roundId/analyse
     * Abstention pattern analysis — Pro feature.
     * Triggers when >= 3 abstentions exist for the round.
     */
    async analyse(ctx) {
      const { roundId } = ctx.params;

      const abstentions = await strapi
        .documents("api::abstention.abstention")
        .findMany({
          filters: {
            round: { id: { $eq: roundId } },
          },
          populate: {},
        });

      if (abstentions.length < 3) {
        return ctx.badRequest(
          "Mindestens 3 Enthaltungen erforderlich für Analyse.",
        );
      }

      // Count by reason
      const reasonCounts = { A: 0, B: 0, C: 0, D: 0, E: 0 };
      for (const a of abstentions) {
        if (reasonCounts[a.reason] !== undefined) reasonCounts[a.reason]++;
      }

      // Extract detail texts for theme analysis
      const detailTexts = abstentions.map((a) => a.detail).filter(Boolean);

      // Also extract anonymous concerns
      const anonymousConcerns = abstentions
        .map((a) => a.anonymousConcern)
        .filter(Boolean);

      const allTexts = [...detailTexts, ...anonymousConcerns];
      const thematicGroups = groupByTheme(allTexts);

      // Generate recommendations
      const recommendations = [];

      if (reasonCounts.B > 0 || reasonCounts.C > 0) {
        recommendations.push(
          "Erwäge eine weitere Informationsrunde — einige Teilnehmer brauchen mehr Klärung.",
        );
      }
      if (reasonCounts.D > 0) {
        recommendations.push(
          "Es gibt anonyme Bedenken. Prüfe die aggregierten Bedenken und erwäge eine Anpassung des Vorhabens.",
        );
      }
      if (reasonCounts.E >= 3) {
        recommendations.push(
          `${reasonCounts.E} Enthaltungen ohne klare Position — mögliche Ursachen: Komplexität des Vorhabens, mangelnde Information, Konfliktvermeidung.`,
        );
        recommendations.push(
          "Empfehlung: Erwäge ein direktes Gespräch mit Betroffenen.",
        );
      }
      if (reasonCounts.A > abstentions.length / 2) {
        recommendations.push(
          "Mehrheit der Enthaltungen wegen Nicht-Betroffenheit — prüfe ob der richtigen Gruppe abgestimmt wird.",
        );
      }
      if (recommendations.length === 0) {
        recommendations.push(
          "Die Enthaltungen verteilen sich gleichmäßig. Kein auffälliges Muster erkennbar.",
        );
      }

      ctx.body = {
        data: {
          roundId: Number(roundId),
          totalAbstentions: abstentions.length,
          reasonCounts,
          thematicGroups,
          recommendations,
          _meta: {
            typ: "Enthaltungs-Analyse (Pro)",
            hinweis:
              "Diese Analyse zeigt Muster in den Enthaltungen. Bei Unsicherheit: direktes Gespräch mit Betroffenen.",
          },
        },
      };
    },

    /**
     * POST /abstentions/:roundId/info-request
     * Creates an abstention for Reason B or C and notifies the project owner
     * via Teams webhook + audit log.
     *
     * Body: { data: { reason: "B" | "C", detail: string, user: number, finalChoice?: string } }
     */
    async createInfoRequest(ctx) {
      const { roundId } = ctx.params;
      const body = ctx.request.body as Record<string, unknown>;
      const data = (body?.data as Record<string, unknown>) || body;

      const { reason, detail, user: userId, finalChoice } = data as {
        reason: string;
        detail?: string;
        user?: number;
        finalChoice?: string;
      };

      if (!reason || (reason !== "B" && reason !== "C")) {
        return ctx.badRequest(
          "Ungültiger Grund. Nur B (Mehr Info) oder C (Klärung) erlaubt.",
        );
      }
      if (!userId) {
        return ctx.badRequest("user ID required");
      }

      // Look up round with project + owner
      const round = await strapi.entityService.findOne(
        "api::round.round",
        Number(roundId),
        { populate: ["project", "project.owner"] },
      );
      if (!round) {
        return ctx.notFound("Runde nicht gefunden");
      }

      // Look up user
      const user = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        Number(userId),
        { fields: ["username", "email"] },
      );

      // Create abstention record
      const abstention = await strapi.entityService.create(
        "api::abstention.abstention",
        {
          data: {
            reason,
            detail: detail || undefined,
            finalChoice: finalChoice || undefined,
            user: Number(userId),
            round: Number(roundId),
          },
        },
      );

      // Notify project owner via Teams
      if (detail) {
        await notifyInfoRequest(strapi, round, user, detail, reason);
      }

      // Audit log
      await auditLog(
        strapi,
        "abstention_info_request",
        "abstention",
        String(abstention.id),
        `Enthaltung ${reason}: ${detail || "(kein Detail)"} — Round #${round?.roundNumber}`,
        Number(userId),
      );

      ctx.body = { data: abstention };
    },

    /**
     * POST /abstentions/:id/answer
     * Project owner answers a B/C info request, notifies requester via Teams
     * so they can re-cast their vote.
     *
     * Body: { answer: string }
     */
    async answerInfoRequest(ctx) {
      const { id } = ctx.params;
      const body = ctx.request.body as Record<string, unknown>;
      const answer = body?.answer as string | undefined;

      if (!answer || typeof answer !== "string" || answer.trim().length === 0) {
        return ctx.badRequest("Antwort darf nicht leer sein.");
      }

      const ownerId = ctx.state.user?.id;
      if (!ownerId) return ctx.unauthorized();

      // Load abstention with round and user
      const abstention = await strapi.entityService.findOne(
        "api::abstention.abstention",
        Number(id),
        { populate: ["round", "round.project", "round.project.owner", "user"] },
      );

      if (!abstention) return ctx.notFound("Enthaltung nicht gefunden");

      // Only project owner may answer
      const projectOwnerId = abstention.round?.project?.owner?.id;
      if (projectOwnerId && String(projectOwnerId) !== String(ownerId)) {
        return ctx.forbidden("Nur der Vorhaben-Einreicher kann antworten.");
      }

      // Mark abstention as answered and store the reply
      const updated = await strapi.entityService.update(
        "api::abstention.abstention",
        Number(id),
        {
          data: {
            ownerAnswer: answer.trim(),
            answeredAt: new Date().toISOString(),
            answered: true,
          },
        },
      );

      // Notify requester via Teams
      try {
        const owner = ctx.state.user;
        const requester = abstention.user;
        const round = abstention.round;
        await teamsWebhook.notifyInfoRequestAnswered(
          round?.project?.name || "Unbekanntes Projekt",
          round?.roundNumber || 0,
          owner?.username || owner?.email || "Einreicher",
          answer.trim(),
          requester?.username || requester?.email || "Anfragender",
        );
      } catch (_) {}

      // Audit log
      await auditLog(
        strapi,
        "info_request_answered",
        "abstention",
        String(id),
        `Info-Anfrage beantwortet. ${answer.trim().substring(0, 200)}`,
        ownerId,
      );

      ctx.body = { data: updated };
    },
  }),
);