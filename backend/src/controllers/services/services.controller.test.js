const { mockRequest, mockResponse } = require('jest-mock-req-res');

const servicesController = require('./services.controller');
const servicesService = require('./services.service');

jest.mock('./services.service');

describe('services controller', () => {
  const mockData = [{
    id: 1,
    name: 'Service BT',
    type: 'Food',
  },
  {
    id: 2,
    name: 'Other Service',
    type: 'Delivery',
  },
  {
    id: 3,
    name: 'Service 3',
    type: 'Carpenter',
  },
  {
    id: 4,
    name: 'Plumber and Sons',
    type: 'Plumbing',
  }];

  let response;
  const nextFunction = jest.fn();

  beforeEach(() => {
    // eslint-disable-next-line no-underscore-dangle
    servicesService.__setMockData(mockData);
    response = mockResponse;
  });

  test('Find one user with valid id', () => {
    const USER_ID = 1;
    const request = mockRequest({ params: { id: USER_ID } });

    return servicesController.findOne(request, response, nextFunction)
      .then(() => {
        expect(servicesService.findOne).toBeCalledWith(USER_ID);
      });
  });

  test('Testing http-post /services : create new service', () => {
    const createData = {
      name: 'Service',
      type: 'service',
      description: 'description',
      contacts: {
        contactPerson: 'person',
        available: 'always',
        tel: '123456789',
        email: 'mail@mail.com',
        addr: {
          city: 'City',
          street: 'Street',
          houseNumber: 'number',
        },
        webpageUrl: 'http://service.com',
      },
      active: true,
      uploader: '611ac84d7f7f560017eb1324',
    };
    const request = mockRequest({
      method: 'POST',
      body: createData,
    });

    servicesController.create(request, response, nextFunction);
    expect(servicesService.create).toHaveBeenCalledWith(createData);
  });
});
