const { Schema, model } = require('mongoose');
const idValidator = require('mongoose-id-validator');
// const mongooseBcrypt = require('mongoose-bcrypt');

const AddressSchema = Schema({
  city: String,
  street: String,
  houseNumber: String,
});

const UserSchema = Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
  },
  addr: AddressSchema,
  active: Boolean,
  password: String,
  postList: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Service',
    },
  ],
  role: {
    type: String,
    enum: ['user', 'editor', 'admin'],
    default: 'user',
  },
}, {
  collection: 'vizsgaremekUsers',
  timestamps: true,
});

UserSchema.plugin(idValidator);
// UserSchema.plugin(mongooseBcrypt);

module.exports = model('User', UserSchema);

/*
export class User {
  _id: string = '';
  firstName?: string = '';
  lastName?: string = '';
  email?: string = '';
  address?: Address = new Address();
  active?: boolean = true;
  password?: string = '';
  accessToken?: string = '';
}
*/
