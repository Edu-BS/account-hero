const GroupModel = require("../models/Group");
const GroupService = require("../services/groupService");
const UserModel = require("../models/User");
const mongoose = require("mongoose");

class GroupController {

   static async createGroup(req, res, next) {
      try {

         let allUsersId = req.body.users.map(user => user._id)
         allUsersId.push(req.userId)

         let groupData = {
            admin: req.userId,
            name: req.body.name,
            description: req.body.description,
            users: Array.from(new Set(allUsersId)),
         }

         if (!groupData.name)
            return res.status(400).json({ message: "Group name is required" })

         let validUsers = groupData.users.filter(user => mongoose.Types.ObjectId.isValid(user))

         if (validUsers.length !== groupData.users.length)
            return res.status(400).json({ message: "Invalid users" })

         GroupService.createGroup(groupData)
            .then(group => {
               res.status(201).json({ group });
            })
            .catch(err => {
               console.log("Controlled error", err);
               res.status(500).json({
                  errors: [{ message: "group error" }]
               });
            });
      } catch (error) {
         return res.status(500)
      }
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

}

module.exports = GroupController;