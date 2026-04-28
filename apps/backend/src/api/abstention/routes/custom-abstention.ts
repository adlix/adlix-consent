'use strict'

/**
 * Custom routes for abstention API
 * - GET  /abstentions/:roundId/anonymous-concerns → aggregated anonymous concerns
 * - POST /abstentions/:roundId/analyse            → abstention pattern analysis (Pro)
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/abstentions/:roundId/anonymous-concerns',
      handler: 'abstention.anonymousConcerns',
      config: {
        auth: { strategies: ['api-token', 'jwt'] },
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/abstentions/:roundId/analyse',
      handler: 'abstention.analyse',
      config: {
        auth: { strategies: ['api-token', 'jwt'] },
        policies: [],
      },
    },
  ],
}
