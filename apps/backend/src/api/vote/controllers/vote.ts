'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::vote.vote', ({ strapi }) => ({
  async create(ctx) {
    const { data } = ctx.request.body;
    const roundId = data?.round || data?.attributes?.round;
    const userId = ctx.state.user?.id;

    if (!roundId || !userId) {
      return ctx.badRequest('Round ID and authenticated user required');
    }

    // Check round is in voting phase
    const round = await strapi.entityService.findOne('api::round.round', roundId);
    if (!round) return ctx.notFound('Round not found');
    if (round.status !== 'voting') {
      return ctx.badRequest('Diese Runde befindet sich nicht in der Abstimmungsphase.');
    }

    // Check if user already voted — if so, this becomes a vote change
    const existingVotes = await strapi.entityService.findMany('api::vote.vote', {
      filters: { round: roundId, user: userId },
    });

    if (existingVotes.length > 0) {
      // Update existing vote (vote change)
      const existing = existingVotes[0];
      const newChoice = data?.choice || data?.attributes?.choice;
      const reasonForChange = data?.reasonForChange || data?.attributes?.reasonForChange;

      // Build vote history
      const history = existing.voteHistory || [];
      history.push({
        choice: existing.choice,
        changedAt: new Date().toISOString(),
        reason: existing.reason || null,
      });

      const updated = await strapi.entityService.update('api::vote.vote', existing.id, {
        data: {
          choice: newChoice,
          previousChoice: existing.choice,
          reasonForChange,
          voteHistory: history,
          reason: data?.reason || data?.attributes?.reason || existing.reason,
        },
      });

      // Audit log
      try {
        await strapi.entityService.create('api::audit-log.audit-log', {
          data: {
            action: 'change_vote',
            entityType: 'vote',
            entityId: String(existing.id),
            details: `Stimme geändert von ${existing.choice} zu ${newChoice}`,
            user: userId,
            project: round.project?.id,
          },
        });
      } catch (_) {}

      return { data: updated };
    }

    // New vote
    const response = await super.create(ctx);

    // Audit log
    try {
      await strapi.entityService.create('api::audit-log.audit-log', {
        data: {
          action: 'submit_vote',
          entityType: 'vote',
          entityId: String(response.data?.id || response.data),
          details: `Abstimmung: ${data?.choice || data?.attributes?.choice}`,
          user: userId,
          project: round.project?.id,
        },
      });
    } catch (_) {}

    return response;
  },
}));
