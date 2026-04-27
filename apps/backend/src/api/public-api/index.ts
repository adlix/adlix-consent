'use strict';

const routes = require('./routes/public-api');
const controllers = require('./controllers/public-api');
const services = require('./services/public-api');

module.exports = {
  'public-api': {
    routes,
    controllers,
    services,
  },
};
