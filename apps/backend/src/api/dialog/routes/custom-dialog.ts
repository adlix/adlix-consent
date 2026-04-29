'use strict'

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/dialogs/:id/advance',
      handler: 'dialog.advance',
      config: {
        auth: { strategies: ['api-token', 'jwt'] },
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/dialogs/:id/complete',
      handler: 'dialog.complete',
      config: {
        auth: { strategies: ['api-token', 'jwt'] },
        policies: [],
      },
    },
  ],
}
