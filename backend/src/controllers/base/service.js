module.exports = (Model, populateList = []) => ({
  create: (entityData) => {
    const entity = new Model(entityData);
    return entity.save();
  },

  findAll: () => Model.find().populate(...populateList),

  findOne: (id) => Model.findById(id).populate(...populateList),

  update: (id, updateData) => Model.findByIdAndUpdate(id, updateData, { new: true }),

  delete: (id) => Model.findByIdAndRemove(id),

  deleteManyById: (arrayOfIds) => Model.deleteMany({ _id: { $in: arrayOfIds } }),
});
