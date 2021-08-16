// Authenctication.
const express = require('express');
const userController = require('./user.controller');
// const authenticateJwt = require('../../auth/authenticate');
const adminOnly = require('../../auth/adminOnly');
// const notForUsers = require('../../auth/notForUsers');

const userRouter = express.Router();

// create
userRouter.post('/',
  // authenticateJwt,
  adminOnly,
  (req, res, next) => userController.create(req, res, next));

// read
userRouter.get('/',
  // authenticateJwt,
  // notForUsers,
  (req, res, next) => userController.findAll(req, res, next));

userRouter.get('/:id',
  // authenticateJwt,
  // notForUsers,
  (req, res, next) => userController.findOne(req, res, next));

// update
userRouter.put('/:id',
  // authenticateJwt,
  adminOnly,
  (req, res, next) => userController.update(req, res, next));

userRouter.patch('/:id',
  // authenticateJwt,
  adminOnly,
  (req, res, next) => userController.update(req, res, next));

// delete
userRouter.delete('/:id',
  // authenticateJwt,
  adminOnly,
  (req, res, next) => userController.delete(req, res, next));

// getadmincontacts
/* userRouter.get('/getadmincontacts',
  (req, res, next) => userController.getAdminContacts(req, res, next)); */

// geteditorcontacts
/* userRouter.get('/geteditorcontacts',
  authenticateJwt,
  (req, res, next) => userController.getEditorContacts(req, res, next)); */

module.exports = userRouter;

/*
const userController = require('./user.controller');
const routerFactory = require('../base/router');

const userRouter = routerFactory(userController);

module.exports = userRouter; */
