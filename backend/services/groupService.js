const GroupModel = require('../models/Group');
const UserModel = require('../models/User');

class GroupService {

   static async createGroup({ admin, name, description, users }) {
      try {
         const groupData = { admin, name, description, users }

         const group = await GroupModel.create(groupData)
            .then(group => {
               return group
            })
            .catch(err => {
               throw err;
            })
   
         users.forEach(async user => {
            await UserModel.findByIdAndUpdate(user, {
               $push: {
                  groups: group._id,
               },
            });
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

}

module.exports = GroupService;