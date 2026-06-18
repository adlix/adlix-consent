"use strict";

const _ = require("lodash");

module.exports = (plugin) => {
  const originalBootstrap = plugin.bootstrap;

  plugin.bootstrap = async ({ strapi }) => {
    await originalBootstrap({ strapi });
    await configurePublicPermissions(strapi);
    await configureAuthenticatedPermissions(strapi);
    await addCustomUserFields(strapi);
    await configureGitHubProvider(strapi);
  };

  // Override the auth callback to redirect social logins to the frontend
  // instead of returning JSON (which the browser can't use).
  const originalControllers = plugin.controllers;
  const originalCallback = originalControllers.auth.callback;

  plugin.controllers.auth.callback = async (ctx) => {
    const provider = ctx.params.provider || "local";

    // For local auth, use the original callback (returns JSON)
    if (provider === "local") {
      return originalCallback(ctx);
    }

    // For social providers: intercept ctx.send to capture the JWT
    // and redirect to the frontend instead.
    const originalSend = ctx.send.bind(ctx);
    ctx.send = function (body) {
      // Restore original send
      ctx.send = originalSend;

      const frontendUrl =
        process.env.FRONTEND_URL || process.env.STRAPI_URL || "https://consent.adlix-club.de";
      const callbackUrl = new URL("/api/auth/social/" + provider + "/callback", frontendUrl);
      callbackUrl.searchParams.set("access_token", body.jwt);
      ctx.redirect(callbackUrl.toString());
    };

    try {
      await originalCallback(ctx);
    } catch (err) {
      // On error, redirect to login
      ctx.send = originalSend; // restore
      const frontendUrl =
        process.env.FRONTEND_URL || process.env.STRAPI_URL || "https://consent.adlix-club.de";
      const loginUrl = new URL("/login", frontendUrl);
      loginUrl.searchParams.set("error", "social_login_failed");
      ctx.redirect(loginUrl.toString());
    }
  };

  return plugin;
};

async function configurePublicPermissions(strapi) {
  const publicRole = await strapi
    .query("plugin::users-permissions.role")
    .findOne({ where: { type: "public" } });

  if (!publicRole) return;

  const existing = await strapi
    .query("plugin::users-permissions.permission")
    .findMany({ where: { role: { id: publicRole.id } } });

  const existingActions = new Set(existing.map((p) => p.action));

  const publicActions = [
    "plugin::users-permissions.auth.callback",
    "plugin::users-permissions.auth.connect",
    "plugin::users-permissions.auth.register",
    "plugin::users-permissions.auth.forgotPassword",
    "plugin::users-permissions.auth.resetPassword",
    "plugin::users-permissions.auth.sendEmailConfirmation",
    "plugin::users-permissions.user.me",
  ];

  for (const action of publicActions) {
    if (!existingActions.has(action)) {
      await strapi
        .query("plugin::users-permissions.permission")
        .create({ data: { action, role: publicRole.id } });
    }
  }
}

async function addCustomUserFields(strapi) {
  // Ensure custom fields exist on the user content type
  // These are managed through Strapi's Content-Type Builder,
  // but we auto-provision them on first boot for convenience.

  const contentType = strapi.contentType("plugin::users-permissions.user");
  if (!contentType) return;

  // The fields are documented in user-schema-extension.js
  // They need to be added via Strapi admin Content-Type Builder.
  // This function is a no-op placeholder for future auto-creation logic.
}

async function configureAuthenticatedPermissions(strapi) {
  const authenticatedRole = await strapi
    .query("plugin::users-permissions.role")
    .findOne({ where: { type: "authenticated" } });

  if (!authenticatedRole) return;

  const existing = await strapi
    .query("plugin::users-permissions.permission")
    .findMany({ where: { role: { id: authenticatedRole.id } } });

  const existingActions = new Set(existing.map((p) => p.action));

  const apiActions = [
    "plugin::users-permissions.user.me",
    "api::project.project.find",
    "api::project.project.findOne",
    "api::project.project.create",
    "api::project.project.update",
    "api::round.round.find",
    "api::round.round.findOne",
    "api::round.round.create",
    "api::round.round.update",
    "api::vote.vote.find",
    "api::vote.vote.findOne",
    "api::vote.vote.create",
    "api::vote.vote.update",
    "api::objection.objection.find",
    "api::objection.objection.findOne",
    "api::objection.objection.create",
    "api::comment.comment.find",
    "api::comment.comment.findOne",
    "api::comment.comment.create",
    "api::audit-log.audit-log.find",
    "api::audit-log.audit-log.findOne",
    "api::circle.circle.find",
    "api::circle.circle.findOne",
    "api::circle.circle.create",
    "api::circle.circle.update",
    "api::circle-member.circle-member.find",
    "api::circle-member.circle-member.findOne",
    "api::circle-member.circle-member.create",
    "api::circle-member.circle-member.delete",
    "api::abstention.abstention.find",
    "api::abstention.abstention.findOne",
    "api::abstention.abstention.create",
    "api::abstention.abstention.update",
    // Custom actions (from today's consent-loop MVP)
    "api::project.project.createWithRound",
    "api::round.round.transitionPhase",
    "api::round.round.sendReminders",
  ];

  for (const action of apiActions) {
    if (!existingActions.has(action)) {
      await strapi
        .query("plugin::users-permissions.permission")
        .create({ data: { action, role: authenticatedRole.id } });
    }
  }
}

/**
 * Auto-configure GitHub OAuth provider from environment variables.
 * Reads GITHUB_OAUTH_CLIENT_ID and GITHUB_OAUTH_CLIENT_SECRET and
 * injects them into the users-permissions grant store.
 */
async function configureGitHubProvider(strapi) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    strapi.log.info(
      "[users-permissions] GitHub OAuth env vars not set — skipping provider auto-config."
    );
    return;
  }

  const store = strapi.store({ type: "plugin", name: "users-permissions", key: "grant" });
  const providers = await store.get();

  if (!providers || !providers.github) {
    strapi.log.warn(
      "[users-permissions] Grant store has no 'github' key — skipping provider auto-config."
    );
    return;
  }

  const existing = providers.github;
  const alreadyConfigured =
    existing.enabled === true &&
    existing.key === clientId &&
    existing.secret === clientSecret;

  if (alreadyConfigured) {
    strapi.log.info("[users-permissions] GitHub provider already configured — skipping.");
    return;
  }

  // Update the GitHub provider entry
  providers.github = {
    ...existing,
    enabled: true,
    key: clientId,
    secret: clientSecret,
  };

  await store.set({ value: providers });

  strapi.log.info(
    `[users-permissions] GitHub OAuth provider configured (clientId=${clientId.slice(0, 6)}…)`
  );
}
