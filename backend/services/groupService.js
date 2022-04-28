const GroupModel = require('../models/Group');
const UserModel = require('../models/User');

class GroupService {

   static async createGroup({ admin, name, description, users }) {

      const groupData = { admin, name, description, users }

      const group = await GroupModel.create(groupData)
         .then(group => {
            return group.save()
         })
         .catch(err => {
            console.log(err);
         })
      const user = await UserModel.findByIdAndUpdate(admin, {
         $push: {
            groups: group._id,
         },
      });

      users.forEach(async user => {
         await UserModel.findByIdAndUpdate(user, {
            $push: {
               groups: group._id,
            },
         });
      });

      return group;
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