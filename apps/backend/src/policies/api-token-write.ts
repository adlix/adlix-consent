/**
 * Policy: Require write or admin scope on API token
 */
import type { Strapi } from '@strapi/strapi';

export default (policyContext: any, config: any, { strapi }: { strapi: Strapi }) => {
  return async (ctx: any, next: () => Promise<void>) => {
    const tokenRecord = ctx.state.apiToken;
    if (!tokenRecord) {
      ctx.throw(401, 'API token not authenticated');
    }

    const scope = tokenRecord.scope;
    if (scope !== 'write' && scope !== 'admin') {
      ctx.throw(403, 'Insufficient scope. Required: write or admin');
    }

    await next();
  };
};
