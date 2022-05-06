const InvitationModel = require('../models/Invitation');
const UserModel = require('../models/User');
const mongoose = require('mongoose');

class InvitationService {

   static async getInvitations(userId) {

      return InvitationModel.find({
         $or: [{ 'guest': userId }, { 'host': userId }]
      }).populate([
         {
            path: 'host',
            select: '_id username'
         }, {
            path: 'guest',
            select: '_id username'
         }, {
            path: 'group',
            select: '_id name'
         }
      ])
         .then(invitations => {
            return invitations
         })
         .catch(err => {
            throw err;
         })
   }


   static async createInvitation({ hostId, guestId, groupId }) {
      let invitationData = {
         host: mongoose.Types.ObjectId(hostId),
         guest: mongoose.Types.ObjectId(guestId),
         group: mongoose.Types.ObjectId(groupId),
      }
      await InvitationModel.create(invitationData)
         .then(async invitation => {
            await UserModel.findByIdAndUpdate(hostId, {
               $push: { invitations: invitation._id }
            });

            await UserModel.findByIdAndUpdate(guestId, {
               $push: { invitations: invitation._id }
            });
         })
         .catch(err => {
            console.log(err);
            throw err;
         })
   }

   static async acceptInvitation(invitationId, guest) {
      return await InvitationModel.findById(invitationId).where('guest').equals(guest._id)
         .then(async invitation => {
            if (invitation) {                  
               invitation.accepted = true;
               invitation.save();
            } else {
               throw 'Only the guest can accept the invitation';
            }
            return invitation;
         })
         .catch(err => {
            throw err;
         })
   }

   static async rejectInvitation({ invitationId }) {
      await InvitationModel.findByIdAndUpdate(invitationId, {
         $set: { rejected: true }
      })
   }

}

module.exports = InvitationService;