const InvitationModel = require('../models/Invitation');
const UserModel = require('../models/User');
const GroupService = require('../services/groupService');

class InvitationService {
   static async createInvitation({ hostId, guestId, groupId }) {
      await InvitationModel.create({ 'host': hostId, 'guest': guestId, 'group': groupId })
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

   static async acceptInvitation({ invitationId }) {
      await InvitationModel.findByIdAndUpdate(invitationId, {
         $set: { accepted: true }
      })
         .then(async invitation => {
            await GroupService.addUser({ groupId: invitation.group, userId: invitation.guest });
            // await UserModel.findByIdAndUpdate(invitation.guest, {
            //    $pull: { invitations: invitation._id }
            // })
         })
         .catch(err => {
            console.log(err);
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