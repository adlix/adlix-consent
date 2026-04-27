/**
 * Public API Routes — authenticated via custom API token
 */
import type { Route } from '@strapi/strapi';

export const routes: Route[] = [
  // Projects
  {
    method: 'GET',
    path: '/public/projects',
    handler: 'public-api.listProjects',
    config: {
      auth: false,
      policies: ['api-token-auth'],
    },
  },
  {
    method: 'GET',
    path: '/public/projects/:id',
    handler: 'public-api.getProject',
    config: {
      auth: false,
      policies: ['api-token-auth'],
    },
  },
  {
    method: 'POST',
    path: '/public/projects',
    handler: 'public-api.createProject',
    config: {
      auth: false,
      policies: ['api-token-auth', 'api-token-write'],
    },
  },
  // Circles
  {
    method: 'GET',
    path: '/public/circles',
    handler: 'public-api.listCircles',
    config: {
      auth: false,
      policies: ['api-token-auth'],
    },
  },
  {
    method: 'GET',
    path: '/public/circles/:id',
    handler: 'public-api.getCircle',
    config: {
      auth: false,
      policies: ['api-token-auth'],
    },
  },
  // Rounds
  {
    method: 'GET',
    path: '/public/rounds',
    handler: 'public-api.listRounds',
    config: {
      auth: false,
      policies: ['api-token-auth'],
    },
  },
  {
    method: 'GET',
    path: '/public/rounds/:id',
    handler: 'public-api.getRound',
    config: {
      auth: false,
      policies: ['api-token-auth'],
    },
  },
];
