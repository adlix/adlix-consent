'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/abstentions/:roundId/analyse',
      handler: 'abstention.analyseAbstentions',
      config: {
        auth: { strategies: ['api-token', 'jwt'] },
        policies: [],
      },
    },
  ],
};
