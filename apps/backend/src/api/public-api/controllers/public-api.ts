/**
 * Public API Controller
 */
import type { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  // ── Projects ──────────────────────────────────────────
  async listProjects(ctx) {
    const data = await strapi.documents('api::project.project').findMany({
      populate: { circle: { fields: ['id', 'name'] }, owner: { fields: ['id', 'username'] } },
    });
    ctx.body = { data };
  },

  async getProject(ctx) {
    const { id } = ctx.params;
    const data = await strapi.documents('api::project.project').findOne({
      documentId: id,
      populate: { circle: { fields: ['id', 'name'] }, owner: { fields: ['id', 'username'] }, rounds: { fields: ['id', 'roundNumber', 'status'] } },
    });
    if (!data) ctx.throw(404, 'Project not found');
    ctx.body = { data };
  },

  async createProject(ctx) {
    const tokenRecord = ctx.state.apiToken;
    const userId = tokenRecord?.user?.id || tokenRecord?.user;
    const body = ctx.request.body?.data || ctx.request.body;

    const data = await strapi.documents('api::project.project').create({
      data: {
        ...body,
        owner: userId,
        status: body.status || 'draft',
      },
    });
    ctx.body = { data };
  },

  // ── Circles ──────────────────────────────────────────
  async listCircles(ctx) {
    const data = await strapi.documents('api::circle.circle').findMany({
      populate: { owner: { fields: ['id', 'username'] } },
    });
    ctx.body = { data };
  },

  async getCircle(ctx) {
    const { id } = ctx.params;
    const data = await strapi.documents('api::circle.circle').findOne({
      documentId: id,
      populate: { owner: { fields: ['id', 'username'] }, projects: { fields: ['id', 'name', 'status'] } },
    });
    if (!data) ctx.throw(404, 'Circle not found');
    ctx.body = { data };
  },

  // ── Rounds ───────────────────────────────────────────
  async listRounds(ctx) {
    const data = await strapi.documents('api::round.round').findMany({
      populate: { project: { fields: ['id', 'name'] } },
    });
    ctx.body = { data };
  },

  async getRound(ctx) {
    const { id } = ctx.params;
    const data = await strapi.documents('api::round.round').findOne({
      documentId: id,
      populate: { project: { fields: ['id', 'name'] } },
    });
    if (!data) ctx.throw(404, 'Round not found');
    ctx.body = { data };
  },
});
