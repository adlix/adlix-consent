"use strict";

/**
 * Custom Strapi endpoint: one-time login code verification.
 * POST /api/auth/one-time-login
 * Body: { email, code }
 * Returns: { jwt, user }
 *
 * This allows users to log in with a 6-digit code sent to their email.
 */
module.exports = {
  async oneTimeLogin(ctx) {
    const { email, code } = ctx.request.body || {};

    if (!email || !code) {
      return ctx.badRequest("E-Mail und Code erforderlich.");
    }

    // Find user by email
    const users = await strapi
      .documents("plugin::users-permissions.user")
      .findMany({
        filters: { email: { $eq: email } },
      });

    if (!users || users.length === 0) {
      return ctx.unauthorized("Ungültiger Code.");
    }

    const user = users[0];

    // Verify code
    if (user.loginCode !== code) {
      return ctx.unauthorized("Ungültiger Code.");
    }

    // Check expiry
    if (user.loginCodeExpires && new Date(user.loginCodeExpires) < new Date()) {
      return ctx.unauthorized("Code abgelaufen. Bitte fordere einen neuen an.");
    }

    // Clear the code
    await strapi
      .documents("plugin::users-permissions.user")
      .update(user.documentId, {
        data: {
          loginCode: null,
          loginCodeExpires: null,
        },
      });

    // Generate JWT
    const token = await strapi.service("plugin::users-permissions.jwt").issue({
      id: user.id,
    });

    ctx.body = {
      jwt: token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    };
  },
};
