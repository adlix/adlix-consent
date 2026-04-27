/**
 * Token Management Controller — JWT-authenticated CRUD for API tokens
 */
import crypto from 'crypto';
import type { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  async list(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) ctx.throw(401, 'Unauthorized');

    const tokens = await strapi.documents('api::api-token.api-token').findMany({
      filters: { user: { id: { $eq: userId } } },
      populate: { user: { fields: ['id'] } },
    });

    // Strip the actual token value for listing
    const safe = (tokens as any[]).map((t: any) => ({
      documentId: t.documentId,
      name: t.name,
      scope: t.scope,
      isActive: t.isActive,
      lastUsedAt: t.lastUsedAt,
      createdAt: t.createdAt,
    }));

    ctx.body = { data: safe };
  },

  async create(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) ctx.throw(401, 'Unauthorized');

    const { name, scope } = ctx.request.body?.data || ctx.request.body;
    if (!name) ctx.throw(400, 'name is required');
    if (!scope || !['read', 'write', 'admin'].includes(scope)) ctx.throw(400, 'scope must be read, write, or admin');

    const tokenValue = crypto.randomBytes(32).toString('hex');

    const tokenRecord = await strapi.documents('api::api-token.api-token').create({
      data: {
        token: tokenValue,
        name,
        scope,
        isActive: true,
        user: userId,
      },
    });

    ctx.body = {
      data: {
        documentId: tokenRecord.documentId,
        name,
        scope,
        token: tokenValue, // Return only on creation
        isActive: true,
        createdAt: tokenRecord.createdAt,
      },
    };
  },

  async delete(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) ctx.throw(401, 'Unauthorized');
    const { id } = ctx.params;

    const existing = await strapi.documents('api::api-token.api-token').findOne({
      documentId: id,
      populate: { user: { fields: ['id'] } },
    });

    if (!existing) ctx.throw(404, 'Token not found');
    if ((existing as any).user?.id !== userId) ctx.throw(403, 'Not your token');

    await strapi.documents('api::api-token.api-token').delete(id);

    ctx.body = { data: { deleted: true, documentId: id } };
  },
});
