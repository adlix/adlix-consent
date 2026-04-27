'use strict';

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::api-token.api-token');
