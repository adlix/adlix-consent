'use strict';

/**
 * Objection controller with Teams webhook integration
 */

const { createCoreController } = require('@strapi/strapi').factories;
const teamsWebhook = require('../../../utils/teamsWebhook').default;

module.exports = createCoreController('api::objection.objection', ({ strapi }) => ({
  async create(ctx) {
    const response = await super.create(ctx);
    
    // Notify Teams about new objection
    if (response.data) {
      const objection = response.data;
      
      // Get user info
      const user = await strapi.entityService.findOne(
        'plugin::users-permissions.user',
        objection.user?.id || objection.attributes?.user?.id,
        { fields: ['username', 'email'] }
      );
      
      // Get round and project info
      const roundId = objection.round?.id || objection.attributes?.round?.id;
      if (roundId) {
        const round = await strapi.entityService.findOne(
          'api::round.round',
          roundId,
          { populate: ['project'] }
        );
        
        if (round && round.project) {
          const project = round.project;
          
          teamsWebhook.notifyObjection(
            project.name || (typeof project === 'object' ? project.name : ''),
            round.roundNumber || round.attributes?.roundNumber,
            user?.username || user?.email || 'Unbekannt',
            objection.reason || objection.attributes?.reason,
            objection.severity || objection.attributes?.severity
          );
        }
      }
    }
    
    return response;
  },
}));
