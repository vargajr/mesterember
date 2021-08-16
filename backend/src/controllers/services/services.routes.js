const servicesController = require('./services.controller');
const routerFactory = require('../base/router');

const servicesRouter = routerFactory(servicesController);

module.exports = servicesRouter;
