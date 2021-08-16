const createError = require('http-errors');

module.exports = (req, res, next) => {
  if (req.user.role === 'user') {
    return next(new createError.Unauthorized(403, 'Access is allowed for editors or admins'));
  }
  return next();
};
