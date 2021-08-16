const createError = require('http-errors');

module.exports = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next(new createError.Unauthorized('Access is allowed only for admin users'));
  }
  return next();
};
