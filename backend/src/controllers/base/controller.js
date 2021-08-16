// const express = require('express');
const createError = require('http-errors');

const checkModel = (Model, body, next) => {
  const validationErrors = new Model(body).validateSync();
  if (validationErrors) {
    next(
      new createError.BadRequest(400,
        JSON.stringify({
          message: 'Scmema validation error',
          error: validationErrors,
        })),
    );
    return false;
  }
  return true;
};

module.exports = (ModelClass, serviceObj) => ({

  create: (req, res, next) => {
    if (!checkModel(ModelClass, req.body, next)) {
      next(new createError.BadRequest('Invalid data'));
    } else {
      serviceObj.create(req.body)
        .then((created) => {
          res.status(201);
          return res.json(created);
        })
        .catch((err) => next(new createError.InternalServerError(err.message)));
    }
  },

  findAll: (req, res, next) => serviceObj.findAll()
    .then((list) => {
      if (!list) {
        return next(new createError.NotFound('No data found'));
      }
      return res.json(list);
    })
    .catch((err) => next(new createError.InternalServerError(err.message))),

  findOne: (req, res, next) => serviceObj.findOne(req.params.id)
    .then((item) => {
      if (!item) {
        return next(new createError.NotFound('Data is not found'));
      }
      return res.json(item);
    })
    .catch((err) => next(new createError.InternalServerError(err.message))),

  update: (req, res, next) => {
    if (!checkModel(ModelClass, req.body, next)) {
      next(new createError.BadRequest('Invalid data'));
    } else {
      serviceObj.update(req.params.id, req.body)
        .then((item) => {
          if (!item) {
            return next(new createError.NotFound('Data is not found'));
          }
          return res.json(item);
        })
        .catch((err) => next(new createError.InternalServerError(err.message)));
    }
  },

  delete: (req, res, next) => serviceObj.delete(req.params.id)
    .then((deletedItem) => {
      if (!deletedItem) {
        return next(new createError.NotFound('Data is not found.'));
      }
      return res.json(deletedItem);
    })
    .catch((err) => next(new createError.InternalServerError(err.message))),

  deleteManyById: async (req, res, next) => {
    const { arrayOfIds } = req.body;
    try {
      await serviceObj.deleteManyById(arrayOfIds);
      return res.json({
        hasError: false,
        message: 'Deleted.',
      });
    } catch (err) {
      return next(new createError.InternalServerError(err.message));
    }
  },
});
