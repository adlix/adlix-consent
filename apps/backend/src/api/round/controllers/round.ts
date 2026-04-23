'use strict';

/**
 * Round controller with Teams webhook integration and phase transitions
 */

const { createCoreController } = require('@strapi/strapi').factories;
const teamsWebhook = require('../../../utils/teamsWebhook').default;

const PHASE_ORDER = ['information', 'reaction', 'adjustment', 'voting', 'integration', 'completed'];

module.exports = createCoreController('api::round.round', ({ strapi }) => ({
  async create(ctx) {
    const response = await super.create(ctx);

    if (response.data) {
      const round = response.data;
      const project = await strapi.entityService.findOne(
        'api::project.project',
        round.project?.id || round.attributes?.project?.id,
        { populate: ['owner'] }
      );

      if (project) {
        teamsWebhook.notifyNewRound(
          project.name,
          round.roundNumber || round.attributes?.roundNumber,
          round.proposal || round.attributes?.proposal
        );
      }
    }

    return response;
  },

  async updateVoteStatus(ctx) {
    const { roundId, status } = ctx.request.body;

    const round = await strapi.entityService.update(
      'api::round.round',
      roundId,
      { data: { status } }
    );

    if (status === 'voting' && round) {
      const project = await strapi.entityService.findOne(
        'api::project.project',
        round.project,
        { populate: ['owner'] }
      );

      if (project) {
        teamsWebhook.notifyVoteStarted(
          project.name,
          round.roundNumber,
          round.proposal
        );
      }
    }

    return round;
  },

  async transitionPhase(ctx) {
    const { id } = ctx.params;
    const { targetPhase } = ctx.request.body;

    const round = await strapi.entityService.findOne('api::round.round', id, {
      populate: ['project'],
    });

    if (!round) {
      return ctx.notFound('Round not found');
    }

    const currentIndex = PHASE_ORDER.indexOf(round.status);
    const targetIndex = targetPhase ? PHASE_ORDER.indexOf(targetPhase) : currentIndex + 1;

    if (targetIndex === -1 || targetIndex <= currentIndex) {
      return ctx.badRequest('Invalid phase transition');
    }

    const nextPhase = PHASE_ORDER[targetIndex];

    const updated = await strapi.entityService.update('api::round.round', id, {
      data: { status: nextPhase, phaseStartedAt: new Date().toISOString() },
    });

    try {
      await strapi.entityService.create('api::audit-log.audit-log', {
        data: {
          action: 'phase_transition',
          entityType: 'round',
          entityId: String(id),
          details: `Phase wechselte von ${round.status} zu ${nextPhase}`,
          project: round.project?.id,
        },
      });
    } catch (_) {
      // Audit log is best-effort
    }

    return { data: updated };
  },
}));
