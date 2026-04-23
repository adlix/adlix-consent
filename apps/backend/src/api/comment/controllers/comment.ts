'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::comment.comment', ({ strapi }) => ({
  async create(ctx) {
    const { data } = ctx.request.body;
    const type = data?.type || data?.attributes?.type;
    const content = data?.content || data?.attributes?.content;
    const roundId = data?.round || data?.attributes?.round;

    // Phase-based validation
    if (roundId) {
      const round = await strapi.entityService.findOne('api::round.round', roundId);
      if (!round) return ctx.notFound('Round not found');

      // Information phase: only questions allowed
      if (round.status === 'information' && type !== 'question') {
        return ctx.badRequest('In der Informationsrunde sind nur Fragen erlaubt. Keine Meinungen oder Diskussion.');
      }

      // Validate question format
      if (type === 'question' && content && !content.includes('?')) {
        return ctx.badRequest('Fragen müssen ein Fragezeichen enthalten.');
      }

      // Reaction phase: only reactions/perspectives allowed
      if (round.status === 'reaction' && type !== 'reaction' && type !== 'perspective') {
        return ctx.badRequest('In der Reaktionsrunde sind nur Perspektiven erlaubt. Kein Gegenargumentieren.');
      }

      // Other phases: no comments allowed via this endpoint
      if (round.status === 'voting' || round.status === 'integration') {
        return ctx.badRequest(`In der Phase "${round.status}" sind keine Kommentare möglich.`);
      }
    }

    // Create the comment
    const response = await super.create(ctx);

    // Audit log
    try {
      if (roundId && response.data) {
        const round = await strapi.entityService.findOne('api::round.round', roundId, { populate: ['project'] });
        await strapi.entityService.create('api::audit-log.audit-log', {
          data: {
            action: type === 'question' ? 'submit_question' : type === 'answer' ? 'submit_answer' : 'submit_reaction',
            entityType: 'comment',
            entityId: String(response.data.id || response.data),
            details: content?.substring(0, 200),
            project: round?.project?.id,
          },
        });
      }
    } catch (_) {}

    return response;
  },
}));
