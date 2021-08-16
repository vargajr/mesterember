const express = require('express');

const routerFactory = (controller) => {
  const router = express.Router();

  // create
  router.post('/', (req, res, next) => controller.create(req, res, next));

  // read
  router.get('/', (req, res, next) => controller.findAll(req, res, next));

  router.get('/:id', (req, res, next) => controller.findOne(req, res, next));

  // update
  router.put('/:id', (req, res, next) => controller.update(req, res, next));

  router.patch('/:id', (req, res, next) => controller.update(req, res, next));

  // deletemany
  router.delete('/', (req, res, next) => controller.deleteManyById(req, res, next));

  // delete
  router.delete('/:id', (req, res, next) => controller.delete(req, res, next));

  return router;
};

module.exports = routerFactory;
