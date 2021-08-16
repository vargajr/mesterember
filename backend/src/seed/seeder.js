const User = require('../models/user.model');
const Services = require('../models/service.model');
const userService = require('../controllers/user/user.service');

const userMockList = require('./users');
const serviceMockList = require('./services');

module.exports = async () => {
  await User.deleteMany({});
  await Services.deleteMany({});

  // https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
  const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index += 1) {
    // eslint-disable-next-line no-await-in-loop
      await callback(array[index]);
    }
  };

  const seedUsers = async () => {
    await asyncForEach(userMockList, async (person) => {
      await userService.create(person);
    });
    const userList = await User.find();
    return userList;
  };

  const userList = await seedUsers();
  const updatedServiceMockList = serviceMockList.map((s) => {
    const rndIndex = Math.floor(Math.random() * userList.length);
    // eslint-disable-next-line no-underscore-dangle
    return { ...s, uploader: userList[rndIndex]._id };
  });
  const serviceDbList = await Services.insertMany(updatedServiceMockList);
  const assignUser = async () => {
    await asyncForEach(serviceDbList, async (ser) => {
      const uploader = await User.findById(ser.uploader);
      // eslint-disable-next-line no-underscore-dangle
      uploader.postList.push(ser._id);
      const modUploader = new User(uploader);
      await modUploader.save();
    });
    const admin = await User.findOne({ email: 'admin@test.com' });
    return admin;
  };

  const admin = await assignUser();
  return admin;
};
