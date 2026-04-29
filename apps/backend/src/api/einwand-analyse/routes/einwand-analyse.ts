import type { Route } from '@strapi/strapi';

export const routes: Route[] = [
  {
    method: 'POST',
    path: '/einwand/analyse',
    handler: 'einwand-analyse.analyse',
    config: {
      auth: { strategies: ['api-token', 'jwt'] },
      policies: [],
    },
  },
];
