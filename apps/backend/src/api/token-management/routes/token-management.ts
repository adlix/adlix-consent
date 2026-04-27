/**
 * Token Management Routes — authenticated via JWT
 */
import type { Route } from '@strapi/strapi';

export const routes: Route[] = [
  {
    method: 'GET',
    path: '/tokens',
    handler: 'token-management.list',
    config: {
      auth: { strategies: ['jwt'] },
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/tokens',
    handler: 'token-management.create',
    config: {
      auth: { strategies: ['jwt'] },
      policies: [],
    },
  },
  {
    method: 'DELETE',
    path: '/tokens/:id',
    handler: 'token-management.delete',
    config: {
      auth: { strategies: ['jwt'] },
      policies: [],
    },
  },
];
