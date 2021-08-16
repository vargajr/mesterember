const userService = jest.mock('./user.service');

let mockData;

userService.findOne = jest.fn((id) => Promise.resolve(mockData.find((p) => p.id === id)));

userService.create = jest.fn((createData) => {
  const id = mockData.sort((a, b) => a.id - b.id)[mockData.length - 1].id + 1;
  const newUser = { id, ...createData };
  return Promise.resolve(newUser);
});

// eslint-disable-next-line no-underscore-dangle
userService.__setMockData = (data) => { mockData = data; };

module.exports = userService;
