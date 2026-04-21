/**
 * Export API Routes
 */
import type { Route } from '@strapi/strapi';

export const routes: Route[] = [
  {
    method: 'GET',
    path: '/export/data',
    handler: 'export.exportData',
    config: {
      auth: { strategies: ['api-token', 'jwt'] },
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/export/schedule-delete',
    handler: 'export.scheduleDelete',
    config: {
      auth: { strategies: ['api-token', 'jwt'] },
      policies: [],
    },
  },
  {
    method: 'DELETE',
    path: '/export/schedule-delete',
    handler: 'export.cancelDelete',
    config: {
      auth: { strategies: ['api-token', 'jwt'] },
      policies: [],
    },
  },
];