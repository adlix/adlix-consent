'use strict';

const routes = require('./routes/einwand-analyse');
const controllers = require('./controllers/einwand-analyse');
const services = require('./services/einwand-analyse');

module.exports = {
  'einwand-analyse': {
    routes,
    controllers,
    services,
  },
};
