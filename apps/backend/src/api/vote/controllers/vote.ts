"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

async function checkAutoComplete(strapi, roundId) {
  const round = await strapi.entityService.findOne(
    "api::round.round",
    roundId,
    {
      populate: ["project", "project.participants", "votes", "votes.user"],
    },
  );
  if (!round || round.status !== "voting") return;

  const participants = round.project?.participants || [];
  const votes = round.votes || [];
  if (participants.length === 0) return;

  const voterIds = votes.map((v) => String(v.user?.id)).filter(Boolean);
  const allVoted = participants.every((p) => voterIds.includes(String(p.id)));
  const hasMajorObjection = votes.some((v) => v.choice === "major_objection");

  if (allVoted && !hasMajorObjection) {
    // Complete the round
    await strapi.entityService.update("api::round.round", roundId, {
      data: { status: "completed", endDate: new Date().toISOString() },
    });
    // Set project to beschlossen
    if (round.project?.id) {
      await strapi.entityService.update(
        "api::project.project",
        round.project.id,
        {
          data: { status: "beschlossen" },
        },
      );
    }
    // Audit log
    try {
      await strapi.entityService.create("api::audit-log.audit-log", {
        data: {
          action: "auto_complete",
          entityType: "round",
          entityId: String(roundId),
          details:
            "Konsent erreicht — alle abgestimmt, kein schwerwiegender Einwand",
          project: round.project?.id,
        },
      });
    } catch (_) {}
  } else if (allVoted && hasMajorObjection) {
    // Move to integration phase
    await strapi.entityService.update("api::round.round", roundId, {
      data: { status: "integration", phaseStartedAt: new Date().toISOString() },
    });
    try {
      await strapi.entityService.create("api::audit-log.audit-log", {
        data: {
          action: "phase_transition",
          entityType: "round",
          entityId: String(roundId),
          details: "Schwerwiegender Einwand — Integrationsprozess gestartet",
          project: round.project?.id,
        },
      });
    } catch (_) {}
  }
}

module.exports = createCoreController("api::vote.vote", ({ strapi }) => ({
  async create(ctx) {
    const { data } = ctx.request.body;
    const roundId = data?.round || data?.attributes?.round;
    const userId = ctx.state.user?.id;

    if (!roundId || !userId) {
      return ctx.badRequest("Round ID and authenticated user required");
    }

    // Check round is in voting phase
    const round = await strapi.entityService.findOne(
      "api::round.round",
      roundId,
    );
    if (!round) return ctx.notFound("Round not found");
    if (round.status !== "voting") {
      return ctx.badRequest(
        "Diese Runde befindet sich nicht in der Abstimmungsphase.",
      );
    }

    // Check if user already voted — if so, this becomes a vote change
    const existingVotes = await strapi.entityService.findMany(
      "api::vote.vote",
      {
        filters: { round: roundId, user: userId },
      },
    );

    if (existingVotes.length > 0) {
      // Update existing vote (vote change)
      const existing = existingVotes[0];
      const newChoice = data?.choice || data?.attributes?.choice;
      const reasonForChange =
        data?.reasonForChange || data?.attributes?.reasonForChange;

      // Build vote history
      const history = existing.voteHistory || [];
      history.push({
        choice: existing.choice,
        changedAt: new Date().toISOString(),
        reason: existing.reason || null,
      });

      const updated = await strapi.entityService.update(
        "api::vote.vote",
        existing.id,
        {
          data: {
            choice: newChoice,
            previousChoice: existing.choice,
            reasonForChange,
            voteHistory: history,
            reason: data?.reason || data?.attributes?.reason || existing.reason,
          },
        },
      );

      // Audit log
      try {
        await strapi.entityService.create("api::audit-log.audit-log", {
          data: {
            action: "change_vote",
            entityType: "vote",
            entityId: String(existing.id),
            details: `Stimme geändert von ${existing.choice} zu ${newChoice}`,
            user: userId,
            project: round.project?.id,
          },
        });
      } catch (_) {}

      // Check auto-complete after vote change
      try {
        await checkAutoComplete(strapi, roundId);
      } catch (_) {}

      return { data: updated };
    }

    // New vote
    const response = await super.create(ctx);

    // Audit log
    try {
      await strapi.entityService.create("api::audit-log.audit-log", {
        data: {
          action: "submit_vote",
          entityType: "vote",
          entityId: String(response.data?.id || response.data),
          details: `Abstimmung: ${data?.choice || data?.attributes?.choice}`,
          user: userId,
          project: round.project?.id,
        },
      });
    } catch (_) {}

    // Check auto-complete after new vote
    try {
      await checkAutoComplete(strapi, roundId);
    } catch (_) {}

    return response;
  },
}));
