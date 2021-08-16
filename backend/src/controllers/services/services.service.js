const BaseServiceFactory = require('../base/service');
const Service = require('../../models/service.model');
const User = require('../../models/user.model');

const servicesService = BaseServiceFactory(Service, ['uploader']);

servicesService.create = async (postData) => {
  const newPost = new Service(postData);
  const createdPost = await newPost.save();
  const author = await User.findById(postData.uploader);
  // eslint-disable-next-line no-underscore-dangle
  author.posts.push(createdPost._id);
  await author.save();
  return createdPost;
};

module.exports = servicesService;
