const GroupModel = require('../models/Group');

class GroupMiddleware {
   static async userInGroup(req, res, next) {
      try {
         const { groupId } = req.params;
         const userId = req.userId;

         const group = await GroupModel.findById(groupId)
            .then((group) => {
               return group;
            })
            .catch((err) => {
               throw err;
            });
            if (!group.users.includes(userId) && group.admin != userId) 
               return res.status(403).json({ errors: [{ message: "user not in group" }] });

         return next();
      } catch (error) {
         if (!error._doc)
            return res.status(404).json({ errors: [{ message: "group not found" }] });
         return res.status(500).json({ errors: [{ message: "group error" }] });
      }
   }

   static async userIsAdmin(req, res, next) {
      const { groupId } = req.params;
      const user = req.userId;
      const group = await GroupModel.findById(groupId);



      if (!group)
         res.status(404).json({ errors: [{ message: "group not found" }] });
      if (!group.admin.equals(user.id))
         res.status(403).json({ errors: [{ message: "user not admin" }] });

      next();
   }
}

module.exports = GroupMiddleware;