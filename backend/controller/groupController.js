const GroupModel = require("../models/Group");
const GroupService = require("../services/groupService");
const UserModel = require("../models/User");

class GroupController {

   static async createGroup(req, res, next) {
      let groupData = {
         admin: req.user.id,
         name: req.body.name,
         description: req.body.description,
      }

      const group = await GroupModel.create(groupData)
         .then(group => {
            return group
         })
         .catch(err => {
            res.json(err);
         })

      await UserModel.findByIdAndUpdate(req.user.id, { $push: { groups: group._id } })
         .then(user => {
            res.status(200);
         })
         .catch(err => {
            res.json(err);
         })
   }

   static async getGroup(req, res, next) {
      await GroupModel.findById(req.params.groupId)
         .then(group => {
            res.json(group);
         })
         .catch(err => {
            res.json(err);
         })
   }

   static async updateGroup(req, res, next) {
      await GroupModel.findByIdAndUpdate(req.params.groupId, req.body)
         .then(group => {
            res.json(group);
         })
         .catch(err => {
            res.json(err);
         })
   }
   
}

module.exports = GroupController;