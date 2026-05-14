"use strict";

/**
 * Project controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::project.project", ({ strapi }) => ({
  async createWithRound(ctx) {
    const { name, description, goal, tension, circle } =
      ctx.request.body.data || ctx.request.body;
    const userId = ctx.state.user?.id;
    if (!userId) return ctx.unauthorized("Not authenticated");
    if (!name || !description)
      return ctx.badRequest("name and description required");

    // Create project
    const project = await strapi.entityService.create("api::project.project", {
      data: {
        name,
        description,
        goal: goal || undefined,
        tension: tension || undefined,
        status: "active",
        owner: userId,
        participants: [userId],
        circle: circle || undefined,
        publishedAt: new Date().toISOString(),
      },
    });

    // Auto-create first Round in 'information' phase
    const round = await strapi.entityService.create("api::round.round", {
      data: {
        roundNumber: 1,
        proposal: description,
        status: "information",
        project: project.id,
        startDate: new Date().toISOString(),
        phaseStartedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
      },
    });

    // Set currentRound on project
    await strapi.entityService.update("api::project.project", project.id, {
      data: { currentRound: round.id },
    });

    // Audit log
    try {
      await strapi.entityService.create("api::audit-log.audit-log", {
        data: {
          action: "create",
          entityType: "project",
          entityId: String(project.id),
          details: `Vorhaben "${name}" eingereicht`,
          user: userId,
          project: project.id,
        },
      });
    } catch (_) {}

    return { data: { project, round } };
  },
}));
