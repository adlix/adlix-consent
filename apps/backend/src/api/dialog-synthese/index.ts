'use strict';

const routes = require('./routes/dialog-synthese');
const controllers = require('./controllers/dialog-synthese');
const services = require('./services/dialog-synthese');

module.exports = {
  'dialog-synthese': {
    routes,
    controllers,
    services,
  },
};
