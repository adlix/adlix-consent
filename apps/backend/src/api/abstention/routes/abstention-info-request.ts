"use strict";

/**
 * Custom routes for abstention B/C info-request endpoint
 */

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/abstentions/:roundId/info-request",
      handler: "api::abstention.abstention.createInfoRequest",
      config: {
        middlewares: [],
        prefix: "",
        auth: {
          scope: ["api::abstention.abstention.findOne"],
        },
      },
    },
  ],
};
