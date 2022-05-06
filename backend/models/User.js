const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const GroupsModel = mongoose.model('Groups', GroupSchema);
const bcrypt = require('bcryptjs');

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
   groups: [{
      type: Schema.Types.ObjectId,
      ref: 'Group',
   }],
   invitations: [{
      type: Schema.Types.ObjectId,
      ref: 'Invitation',
   }],
})

/**
 * @description Funcion para encriptar una contraseña
 * @param {string} password Contraseña a encriptar
 * @returns {string} La contraseña encriptada
 */
UserSchema.statics.encryptPassword = async (password) => {
   const salt = await bcrypt.genSalt(10);
   const hash = await bcrypt.hash(password, salt);
   return hash;
}


/**
 * @description Funcion para validar una contraseña sin encriptar con otra encriptada
 * @param {string} password Contraseña sin encriptar
 * @param {string} recivedPassword  Contraseña encriptada
 * @returns {boolean} true si la contraseña es la misma, false si no es la misma
 */
UserSchema.statics.comparePassword = async (password, recivedPassword) => {
   return await bcrypt.compare(password, recivedPassword);
}

// UserSchema.pre('populate', function () {
//    // If a group is null when populating, remove it from user.groups
//    let groups = this.populating('groups');
   
//    for (const groupId of this.groups) {
//       if (!groups.includes(groupId)) {
//          this.groups.pull(groupId);
//       }
//    }

//    // If a invitation is null when populating, remove it from user.invitations
//    let invitations = this.populating('invitations');

//    for (const invitationId of this.invitations) {
//       if (!invitations.includes(invitationId)) {
//          this.invitations.pull(invitationId);
//       }
//    }
// })

module.exports = mongoose.model('User', UserSchema);