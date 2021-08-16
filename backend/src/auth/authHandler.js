const jwt = require('jsonwebtoken');
const createError = require('http-errors');
// const userService = require('../controllers/user/user.service');
const userModel = require('../models/user.model');

const refreshTokens = [];

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  let person = null;

  try {
    person = await userModel.findOne({ email });
    if (!person) {
      throw new Error('User not found.');
    }
    // const verified = await person.verifyPassword(password);
    const verified = person.password === password;
    if (!verified) {
      throw new Error('Incorrect credentials!');
    }
  } catch (e) {
    // console.log(person);
    return next(new createError.BadRequest('login error: ', e.message));
  }

  const accessToken = jwt.sign({
    email: person.email,
    role: person.role,
  }, process.env.ACCES_TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });
  const refreshToken = jwt.sign({
    email: person.email,
    role: person.role,
  }, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);

  return res.json({
    accessToken,
    refreshToken,
    user: person,
  });
};

module.exports.refresh = (req, res, next) => {
  const { token } = req.body;
  if (!token) {
    next(new createError.BadRequest(401, 'Unauthorized.'));
  } else if (!refreshTokens.includes(token)) {
    next(new createError.BadRequest(403, 'Unauthorized.'));
  } else {
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return next(new createError.BadRequest(403, err.message));
      }
      const accessToken = jwt.sign(
        {
          email: user.email,
          role: user.role,
        },
        process.env.ACCES_TOKEN_SECRET,
        { expiresIn: process.env.TOKEN_EXPIRY },
      );

      return res.json({ accessToken });
    });
  }
};

module.exports.logout = (req, res, next) => {
  const { token } = req.body;

  if (!refreshTokens.includes(token)) {
    next(new createError.BadRequest(403, 'Unauthorized.'));
  } else {
    refreshTokens.splice(refreshTokens.indexOf(token), 1);
    res.sendStatus(200);
  }
};
