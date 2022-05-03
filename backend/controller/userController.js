const UserServices = require('../services/userServices')
const UserModel = require('../models/User')
const { handleError } = require('../helpers/handleError')
const helperToken = require('../helpers/helperToken')

/**
 * Controller donde estas todos los metodos de las operaciones con los usuarios  
 */
class UserController {

    /**
     * @description Controller para crear nuevo usuario 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    static async createUser(req, res, next) {
        try {
            let user = await UserServices.createUser(req.body)
            let token = helperToken.createToken(user)
            res.json({ token: token, username: user.username })
        } catch (error) {
            handleError(res, error, 400, "user")
        }
    }

    static async getGroups(req, res, next) {
        await UserModel.findById(req.userId).populate('groups')
            .then(user => {
                res.json(user.groups)
            })
            .catch(err => {
                console.log(err)
            })
    }

    static async getByUsernameLike(req, res, next) {
        await UserServices.getByUsernameLike(req.body.user.username)
            .then(users => {
                return res.json(users)
            })
            .catch(err => {
                return res.status(500)
            })
    }

    static async getInvitations(req, res, next) {
        await UserServices.getInvitations(req.userId)
            .then(invitations => {
                return res.json(invitations)
            })
            .catch(err => {
                console.log(err);
                return res.status(500)
            })
    }

    static async acceptInvitation(req, res, next) {
        await UserServices.acceptInvitation(req.body.invitationId, req.userId)
            .then(invitation => {
                return res.json(invitation)
            })
            .catch(err => {
                console.log(err);
                res.status(500)
            })
    }

}


module.exports = UserController;