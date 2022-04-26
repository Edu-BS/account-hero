const GroupModel = require('../models/Group');

class GroupMiddleware {
   static async userInGroup (req, res, next) {
      const { groupId } = req.params;
      const user = req.user;
      const group = await GroupModel.findById(groupId)
         .then((group) => {
            return group;
         }).catch((err) => {
            res.status(404).json({ errors: [{ message: "group error" }] });
         });
      
      if (!group) 
         res.status(404).json({ errors: [{ message: "group not found" }] });
      if (!group.users.includes(user.id) && group.admin != user.id) 
         res.status(401).json({ errors: [{ message: "user not in group" }] });
      
      next();
   }

   static async userIsAdmin (req, res, next) {
      const { groupId } = req.params;
      const user = req.user;
      const group = await GroupModel.findById(groupId);
      


      if (!group) 
         res.status(404).json({ errors: [{ message: "group not found" }] });
      if (!group.admin.equals(user.id)) 
         res.status(401).json({ errors: [{ message: "user not admin" }] });
      
      next();
   }
}

module.exports = GroupMiddleware;