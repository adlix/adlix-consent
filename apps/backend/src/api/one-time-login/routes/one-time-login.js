'use strict'

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/auth/one-time-login',
      handler: 'one-time-login.oneTimeLogin',
      config: {
        auth: false,
        policies: [],
      },
    },
  ],
}