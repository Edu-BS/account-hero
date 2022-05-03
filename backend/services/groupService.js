const GroupModel = require('../models/Group');
const UserModel = require('../models/User');
const InvitationService = require('../services/invitationService');
class GroupService {

   static async createGroup({ admin, name, description, users }) {
      try {
         const groupData = { admin, name, description }

         members = users.filter(user => user !== admin);

         const group = await GroupModel.create(groupData)
            .then(groupRes => {
               return groupRes
            })
            .catch(err => {
               console.log(err);
               throw err;
            })


         members.forEach(async user => {
            await InvitationService.createInvitation({ hostId: admin, guestId: user, groupId: group._id })
               .catch(err => {
                  console.log(err);
                  throw err;
               })
         });

         return group;
      } catch (error) {
         throw error;
      }
   }

   static async addUser({ groupId, userId }) {
      const group = await GroupModel.findByIdAndUpdate(groupId, {
         $push: {
            users: userId,
         },
      });
      const user = await UserModel.findByIdAndUpdate(userId, {
         $push: {
            groups: groupId,
         },
      });
      return group;
   }

   static async inviteUser({ hostId, guestId, groupId }) {
      await InvitationModel.create({ hostId, guestId, groupId })
         .then(invitation => {
            return invitation;
         })
         .catch(err => {
            throw err;
         })
   }

}

module.exports = GroupService;