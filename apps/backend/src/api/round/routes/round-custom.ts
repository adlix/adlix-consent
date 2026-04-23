'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/rounds/:id/transition',
      handler: 'round.transitionPhase',
      config: {
        auth: { strategies: ['api-token', 'jwt'] },
        policies: [],
      },
    },
  ],
};
