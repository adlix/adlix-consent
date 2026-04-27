'use strict';

const routes = require('./routes/token-management');
const controllers = require('./controllers/token-management');
const services = require('./services/token-management');

module.exports = {
  'token-management': {
    routes,
    controllers,
    services,
  },
};
