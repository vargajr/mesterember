const jwt = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    // Bearer lhsdlhslghsljghljgljsgl
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err, user) => {
      if (err) {
        next(new createError.Forbidden('Authentication failed'));
      }
      req.user = user;
      next();
    });
  } else {
    next(new createError.Unauthorized('Login required'));
  }
};

// Unauthorized access attempt
