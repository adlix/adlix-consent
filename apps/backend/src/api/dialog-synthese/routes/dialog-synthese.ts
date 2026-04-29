import type { Route } from '@strapi/strapi';

export const routes: Route[] = [
  {
    method: 'POST',
    path: '/dialog/synthese',
    handler: 'dialog-synthese.synthese',
    config: {
      auth: { strategies: ['api-token', 'jwt'] },
      policies: [],
    },
  },
];
