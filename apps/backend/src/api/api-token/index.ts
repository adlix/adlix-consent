'use strict';

const apiToken = require('./content-types/api-token/schema.json');
const routes = require('./routes/api-token');
const controllers = require('./controllers/api-token');
const services = require('./services/api-token');

module.exports = {
  'api-token': {
    contentTypes: {
      'api-token': apiToken,
    },
    routes,
    controllers,
    services,
  },
};
