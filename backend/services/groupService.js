const GroupModel = require('../models/Group');

class GroupService {
   
   static async createGroup({ admin, name, description }) {
      const group = await GroupModel.create({
         admin,
         name,
         description,
      })
      const user = await UserModel.findByIdAndUpdate(admin, {
         $push: {
            groups: group._id,
         },
      });
      return group;
   }

}

module.exports = GroupService;