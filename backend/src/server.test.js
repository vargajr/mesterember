require('dotenv').config();
const config = require('config');
// const supertest = require('supertest');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./server');
const User = require('./models/user.model');

/*
describe('GET /', () => {
  // token not being sent - should respond with a 401
  test('It should require authorization', () => request(app)
    .get('/')
    .then((response) => {
      expect(response.statusCode).toBe(401);
    }));
  // send the token - should respond with a 200
  test('It responds with JSON', () => request(app)
    .get('/')
    .set('Authorization', `Bearer ${token}`)
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.type).toBe('application/json');
    }));
});

*/

describe('REST API integration tests', () => {
  const insertData = [
    {
      firstName: 'User',
      lastName: 'Usero',
      email: 'user@test.com',
      addr: {
        city: 'P',
        street: 'M',
        houseNumber: '1',
      },
      active: true,
      password: 'user_pw',
      postList: [],
      role: 'user',
    },
    {
      firstName: 'Edit',
      lastName: 'Editor',
      email: 'editor@test.com',
      addr: {
        city: 'P',
        street: 'M',
        houseNumber: '1',
      },
      active: true,
      password: 'editor_pw',
      postList: [],
      role: 'editor',
    },
  ];

  const {
    protocol, username, colon, password, at, host,
  } = config.get('database');
  beforeEach((done) => {
    mongoose.connect(`${protocol}${username}${colon}${password}${at}${host}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }, () => done());
  });

  afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done());
    });
  });

  test('PUT /person - update function', async () => {
    const admin = new User({
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin@test.com',
      addr: {
        city: 'P',
        street: 'M',
        houseNumber: '1',
      },
      active: true,
      password: 'admin_pw',
      postList: [],
      role: 'admin',
    });
    admin.save();

    const resp = await request(app)
      .post('/login')
      .send({
        email: 'admin@test.com',
        password: 'admin_pw',
      });

    const token = resp.body.accessToken;

    const insertPerson = new User(insertData[0]);
    const inserted = await insertPerson.save();
    const { id } = inserted;
    const updatePerson = {
      _id: id,
      firstName: 'Barba',
      lastName: 'Papa',
      email: 'user@test.com',
      addr: {
        city: 'P',
        street: 'M',
        houseNumber: '1',
      },
      active: true,
      password: 'user_pw',
      postList: [],
      role: 'user',
    };

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send(updatePerson);
    // .expect(202);
    expect(response.type).toBe('application/json');
    /* expect(response.body.firstName).toBe(updatePerson.firstName);
    expect(response.body.lastName).toBe(updatePerson.lastName); */
  });

  /* test('DELETE /person - delete with invalid id', async () => {
    await supertest(app).delete('/person').send({ id: 1 }).expect(404);
  }); */
});
