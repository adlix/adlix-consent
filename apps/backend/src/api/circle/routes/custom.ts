'use strict'

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/circles/join/:token',
      handler: 'circle.join',
      config: { policies: [], middlewares: [] },
    },
    {
      method: 'POST',
      path: '/circles/:id/generate-invite',
      handler: 'circle.generateInvite',
      config: { policies: [], middlewares: [] },
    },
    {
      method: 'GET',
      path: '/circles/:id/members',
      handler: 'circle.members',
      config: { policies: [], middlewares: [] },
    },
  ],
}
