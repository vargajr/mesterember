require('dotenv').config();
const config = require('config');
const mongoose = require('mongoose');
const logger = require('./config/logger');
const server = require('./server');
const seeder = require('./seed/seeder');

mongoose.Promise = global.Promise;

const port = process.env.PORT || 3000;

// database connection
if (!config.has('database')) {
  logger.error('No database config found.');
  process.exit();
}
const {
  protocol, username, colon, password, at, host,
} = config.get('database');
mongoose.connect(`${protocol}${username}${colon}${password}${at}${host}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    logger.info('Seeding the database with mock data. This takes time...');
    const admin = await seeder();
    logger.info(`Database is filled with mock data.    ---={  Use    ${admin.email}    and    admin_pw    for login.  }=---`);
  })
  .then(() => {
    logger.info('MongoDB connection has been established succesfully.');
  })
  .catch((err) => {
    logger.error(err);
    process.exit();
  });

server.listen(port, () => logger.info(`Server listening at http://127.0.0.1:${port}`));
