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
    {
      method: 'POST',
      path: '/rounds/reminders',
      handler: 'round.sendReminders',
      config: {
        auth: { strategies: ['api-token', 'jwt'] },
        policies: [],
      },
    },
  ],
};
