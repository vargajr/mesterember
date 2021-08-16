const express = require('express');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const cors = require('./config/cors');
const logger = require('./config/logger');

const swaggerDocument = YAML.load('./docs/swagger.yaml');

const app = express();

app.use(cors());
app.use(morgan('combined', { stream: logger.stream }));
app.use(express.static('public'));
app.use(express.json());

// Authentication
const authenticateJwt = require('./auth/authenticate');
const notForUsers = require('./auth/notForUsers');

// Login - Logout - Register
const authHandler = require('./auth/authHandler');

// ROUTERS
app.post('/login', authHandler.login);
app.post('/refresh', authHandler.refresh);
app.post('/logout', authHandler.logout);

app.use('/users', authenticateJwt, notForUsers, require('./controllers/user/user.routes'));
app.use('/services', authenticateJwt, notForUsers, require('./controllers/services/services.routes'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((err, req, res, next) => {
  res.status(err.statusCode);
  res.json({
    hasError: true,
    message: err.message,
  });
  logger.error(`ERR ${err.statusCode}: ${err.message}`);
  next();
});

module.exports = app;
