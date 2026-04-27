/**
 * Policy: Authenticate custom API token from Authorization header
 * Sets ctx.state.apiToken on success
 */
import type { Strapi } from '@strapi/strapi';

export default (policyContext: any, config: any, { strapi }: { strapi: Strapi }) => {
  return async (ctx: any, next: () => Promise<void>) => {
    const authHeader = ctx.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      ctx.throw(401, 'Missing or invalid Authorization header. Use: Bearer <api-token>');
    }

    const tokenValue = authHeader.slice(7);

    const tokens = await strapi.documents('api::api-token.api-token').findMany({
      filters: { token: { $eq: tokenValue }, isActive: true },
      populate: { user: true },
    });

    if (!tokens || tokens.length === 0) {
      ctx.throw(401, 'Invalid or inactive API token');
    }

    const tokenRecord = tokens[0];
    ctx.state.apiToken = tokenRecord;

    // Update lastUsedAt
    await strapi.documents('api::api-token.api-token').update(tokenRecord.documentId, {
      data: { lastUsedAt: new Date().toISOString() },
    });

    await next();
  };
};
