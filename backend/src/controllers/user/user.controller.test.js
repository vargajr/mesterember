const { mockRequest, mockResponse } = require('jest-mock-req-res');
const createError = require('http-errors');

const userController = require('./user.controller');
const userService = require('./user.service');

jest.mock('./user.service');

describe('user controller', () => {
  const mockData = [{
    id: 1,
    firstName: 'Winnie',
    lastName: 'Kembrey',
    vaccine: 'vaccine-4',
  },
  {
    id: 2,
    firstName: 'Esmaria',
    lastName: 'Taks',
    vaccine: 'vaccine-1',
  },
  {
    id: 3,
    firstName: 'Archambault',
    lastName: 'Dugan',
    vaccine: '',
  },
  {
    id: 4,
    firstName: 'Charmine',
    lastName: 'Baxstair',
    vaccine: 'vaccine-3',
  }];

  let response;
  const nextFunction = jest.fn();

  beforeEach(() => {
    // eslint-disable-next-line no-underscore-dangle
    userService.__setMockData(mockData);
    response = mockResponse;
  });

  test('Find one user with invalid id', () => {
    const USER_ID = 8;
    const request = mockRequest({ params: { id: USER_ID } });

    return userController.findOne(request, response, nextFunction)
      .catch((err) => {
        expect(userService.findOne).toBeCalledWith(USER_ID);
        expect(err).toEqual(new createError.NotFound('Data is not found'));
      });
  });

  test('Testing http-post /user : create new person', () => {
    const createData = {
      firstName: 'Johny',
      lastName: 'Firpo',
      email: 'mail@server.com',
      addr: {
        city: 'P',
        street: 'M',
        houseNumber: '1',
      },
      active: true,
      password: 'test',
      postList: [],
      role: 'user',
    };
    const request = mockRequest({
      method: 'POST',
      body: createData,
    });

    userController.create(request, response, nextFunction);
    expect(userService.create).toHaveBeenCalledWith(createData);
  });
});
