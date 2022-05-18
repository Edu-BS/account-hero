const GroupModel = require('../models/Group');
const UserModel = require('../models/User');
const InvitationService = require('../services/invitationService');
const mongoose = require('mongoose');
class GroupService {

   static async createGroup({ admin, name, description, users, isEtherGroup }) {
      try {
         const groupData = { admin, name, description, 'users': admin, isEtherGroup }

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

   static async addExpense(id, idExpense) {
      const group = await GroupModel.findByIdAndUpdate(id, {
         $push: {
            expenses: idExpense,
         }
      })

      return group;
   }

   static async getExpenses(groupId) {
      return await GroupModel.findById(groupId).populate('expenses')
         .then(group => {
            return group.expenses;
         })
         .catch(err => {
            throw err;
         })
   }
}

module.exports = GroupService;