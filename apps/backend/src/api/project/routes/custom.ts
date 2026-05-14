"use strict";
module.exports = {
  routes: [
    {
      method: "POST",
      path: "/projects/create-with-round",
      handler: "project.createWithRound",
      config: { policies: [], middlewares: [] },
    },
  ],
};
