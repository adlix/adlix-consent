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
  ],
}
