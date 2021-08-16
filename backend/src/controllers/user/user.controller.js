const createError = require('http-errors');
const User = require('../../models/user.model');
const userService = require('./user.service');
const controllerFactory = require('../base/controller');

const userController = controllerFactory(User, userService);

userController.createFirstAdmin = async (req, res) => {
  const adminQuery = {
    firstName: 'Admin',
    lastName: 'Adminum',
    email: 'admin@test.com',
    active: true,
    role: 'admin',
  };
  const adminImput = { ...adminQuery };
  adminImput.password = 'admin_pw';

  try {
    const firstAdmin = await userService.queryOne(adminQuery);
    if (!firstAdmin) {
      throw new Error('FirstAdmin not found - it will be created: admin@test.com, admin_pw');
    }
    const verified = await firstAdmin.verifyPassword('admin_pw');
    if (!verified) {
      throw new Error('Incorrect credentials!');
    }
  } catch (e) {
    await userService.create(adminImput);
  }
  return res.json(adminImput);
};

const getContacts = async (req, res, next, role) => {
  let list = null;
  try {
    list = await userService.getContacts({ role });
  } catch (e) {
    return next(new createError.InternalServerError(e.message));
  }
  list = list.map((user) => ({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  }));
  return res.json(list);
};

userController.getAdminContacts = async (req, res, next) => getContacts(req, res, next, 'admin');

userController.getEditorContacts = async (req, res, next) => getContacts(req, res, next, 'editor');

module.exports = userController;
