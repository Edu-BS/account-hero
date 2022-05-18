const GroupModel = require("../models/Group");
const GroupService = require("../services/groupService");
const UserModel = require("../models/User");
const mongoose = require("mongoose");
const { populate } = require("../models/User");
const Payment = require("../models/Payment");

class GroupController {

   static async createGroup(req, res, next) {
      try {

         let allUsersId = req.body.users.map(user => user._id)
         allUsersId.push(req.userId)

         let groupData = {
            admin: req.userId,
            name: req.body.name,
            description: req.body.description,
            isEtherGroup: req.body.isEtherGroup ? true : false,
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
         .then(async group => {
            if (!group.isEtherGroup) {
               group = await GroupModel.findById(req.params.groupId)
                  .populate({ path: 'users', select: '_id username walletAddress' })
                  .populate({
                     path: 'expenses',
                     populate: {
                        path: 'fractions',
                        populate: {
                           path: 'user',
                           select: 'username'
                        }
                     }
                  })
            } else {
               group = await GroupModel.findById(req.params.groupId)
                  .populate({ path: 'users', select: '_id username walletAddress' })
                  .populate("etherExpenses")
            }
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

   static async getExpenses(req, res, next) {
      try {
         GroupService.getExpenses(req.params.groupId)
            .then(expenses => {
               return res.json(expenses)
            });
      } catch (error) {
         res.status(500)
      }
   }


}

module.exports = GroupController;