const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
   name: {
      type: String,
      required: true,
   },
   surname: {
      type: String,
      required: true,
   },
   birthday: {
      type: Date,
      required: true,
   },
   username: {
      type: String,
      required: true,
      unique: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
   },
   salt: {
      type: String,
      required: true,
   },
   groups: [{
      type: Schema.Types.ObjectId,
      ref: 'Group',
   }]
}) 



module.exports = mongoose.model('User', UserSchema);