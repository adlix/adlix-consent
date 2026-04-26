'use strict'
const { createCoreRouter } = require('@strapi/strapi').factories

module.exports = createCoreRouter('api::circle.circle', {
  only: ['find', 'findOne', 'create', 'update', 'delete'],
  routes: [
    {
      method: 'POST',
      path: '/circles/join/:token',
      handler: 'join',
      config: { auth: true },
    },
    {
      method: 'POST',
      path: '/circles/:id/invite',
      handler: 'generateInvite',
      config: { auth: true },
    },
    {
      method: 'GET',
      path: '/circles/:id/members',
      handler: 'members',
      config: { auth: true },
    },
  ],
})
