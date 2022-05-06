const GroupModel = require('../models/Group');
const UserModel = require('../models/User');
const InvitationService = require('../services/invitationService');
const mongoose = require('mongoose');
class GroupService {

   static async createGroup({ admin, name, description, users }) {
      try {
         const groupData = { admin, name, description }

         let members = users.filter(user => user !== admin);

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
               .then(invitation => {
                  return invitation;
               })
               .catch(err => {
                  console.log(err);
                  throw err;
               })
         });

         await UserModel.findByIdAndUpdate(admin, {
            $push: { groups: group._id }
         })


         return group;
      } catch (error) {
         throw error;
      }
   }

   static async addUser(groupId, userId) {
      const group = await GroupModel.findByIdAndUpdate(groupId, {
         $addToSet: { users: userId }
      })
         .catch(err => {
            throw err;
         })
      const user = await UserModel.findByIdAndUpdate(userId, {
         $addToSet: { groups: groupId }
      })
         .catch(err => {
            throw err;
         })
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