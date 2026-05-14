"use strict";
module.exports = {
  routes: [
    {
      method: "POST",
      path: "/rounds/:id/transition",
      handler: "round.transitionPhase",
      config: { policies: [], middlewares: [] },
    },
    {
      method: "POST",
      path: "/rounds/send-reminders",
      handler: "round.sendReminders",
      config: { policies: [], middlewares: [] },
    },
  ],
};
