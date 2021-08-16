const BaseServiceFactory = require('../base/service');
const User = require('../../models/user.model');

const userService = BaseServiceFactory(User, ['posts']);

userService.queryOne = (query) => User.findOne(query);

userService.getContacts = (query) => User.find(query);

module.exports = userService;
