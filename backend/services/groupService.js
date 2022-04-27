const GroupModel = require('../models/Group');

class GroupService {
   
   static async createGroup({ admin, name, description, users }) {
      
      const group = await GroupModel.create({
         admin,
         name,
         description,
      })
      .then(group => {
         group.users.push(users)
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