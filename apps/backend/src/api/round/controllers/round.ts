'use strict';

/**
 * Round controller with Teams webhook integration
 */

const { createCoreController } = require('@strapi/strapi').factories;
const teamsWebhook = require('../../../utils/teamsWebhook').default;

module.exports = createCoreController('api::round.round', ({ strapi }) => ({
  async create(ctx) {
    const response = await super.create(ctx);
    
    // Notify Teams about new round
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
    
    // Notify Teams if voting started
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
}));
