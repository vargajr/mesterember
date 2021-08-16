const Services = require('../../models/service.model');
const servicesService = require('./services.service');
const controllerFactory = require('../base/controller');

const userController = controllerFactory(Services, servicesService);

module.exports = userController;
