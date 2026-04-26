'use strict';

module.exports = (plugin) => {
  const originalBootstrap = plugin.bootstrap;

  plugin.bootstrap = async ({ strapi }) => {
    await originalBootstrap({ strapi });
    await configurePublicPermissions(strapi);
    await configureAuthenticatedPermissions(strapi);
  };

  return plugin;
};

async function configurePublicPermissions(strapi) {
  const publicRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) return;

  const existing = await strapi
    .query('plugin::users-permissions.permission')
    .findMany({ where: { role: { id: publicRole.id } } });

  const existingActions = new Set(existing.map((p) => p.action));

  const publicActions = [
    'plugin::users-permissions.auth.callback',
    'plugin::users-permissions.auth.connect',
    'plugin::users-permissions.auth.register',
    'plugin::users-permissions.auth.forgotPassword',
    'plugin::users-permissions.auth.resetPassword',
    'plugin::users-permissions.auth.sendEmailConfirmation',
    'plugin::users-permissions.user.me',
  ];

  for (const action of publicActions) {
    if (!existingActions.has(action)) {
      await strapi
        .query('plugin::users-permissions.permission')
        .create({ data: { action, role: publicRole.id } });
    }
  }
}

async function configureAuthenticatedPermissions(strapi) {
  const authenticatedRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'authenticated' } });

  if (!authenticatedRole) return;

  const existing = await strapi
    .query('plugin::users-permissions.permission')
    .findMany({ where: { role: { id: authenticatedRole.id } } });

  const existingActions = new Set(existing.map((p) => p.action));

  const apiActions = [
    'plugin::users-permissions.user.me',
    'api::project.project.find',
    'api::project.project.findOne',
    'api::project.project.create',
    'api::project.project.update',
    'api::round.round.find',
    'api::round.round.findOne',
    'api::round.round.create',
    'api::round.round.update',
    'api::vote.vote.find',
    'api::vote.vote.findOne',
    'api::vote.vote.create',
    'api::vote.vote.update',
    'api::objection.objection.find',
    'api::objection.objection.findOne',
    'api::objection.objection.create',
    'api::comment.comment.find',
    'api::comment.comment.findOne',
    'api::comment.comment.create',
    'api::audit-log.audit-log.find',
    'api::audit-log.audit-log.findOne',
    'api::circle.circle.find',
    'api::circle.circle.findOne',
    'api::circle.circle.create',
    'api::circle.circle.update',
    'api::circle-member.circle-member.find',
    'api::circle-member.circle-member.findOne',
    'api::circle-member.circle-member.create',
    'api::circle-member.circle-member.delete',
    'api::abstention.abstention.find',
    'api::abstention.abstention.findOne',
    'api::abstention.abstention.create',
    'api::abstention.abstention.update',
  ];

  for (const action of apiActions) {
    if (!existingActions.has(action)) {
      await strapi
        .query('plugin::users-permissions.permission')
        .create({ data: { action, role: authenticatedRole.id } });
    }
  }
}
