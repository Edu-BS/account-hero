const GroupModel = require("../models/Group");
const GroupService = require("../services/groupService");
const UserModel = require("../models/User");

class GroupController {

   static async createGroup(req, res, next) {
      let groupData = {
         admin: req.userId,
         name: req.body.name,
         description: req.body.description,
         users: req.body.users
      }

      GroupService.createGroup(groupData)
         .then(group => {
            res.status(201).json({
               group
            });
         })
         .catch(err => {
            console.log(err);
            res.status(500).json({
               errors: [{ message: "group error" }]
            });
         });
   }

   static async getGroup(req, res, next) {
      await GroupModel.findById(req.params.groupId)
         .then(group => {
            res.json(group);
         })
         .catch(err => {
            console.log(err);
            res.status(500);
         })
   }

   static async updateGroup(req, res, next) {
      await GroupModel.findByIdAndUpdate(req.params.groupId, req.body)
         .then(group => {
            res.json(group);
         })
         .catch(err => {
            console.log(err);
            res.status(500);
         })
   }

   static async deleteGroup(req, res, next) {
      await GroupModel.findByIdAndDelete(req.params.groupId)
         .then(group => {
            res.json(group);
         })
         .catch(err => {
            console.log(err);
            res.status(500);
         })
   }

   static async addUser(req, res, next) {

   }

}

module.exports = GroupController;