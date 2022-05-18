const UserServices = require('../services/userServices')
const UserModel = require('../models/User')
const { handleError } = require('../helpers/handleError')
const helperToken = require('../helpers/helperToken')

/**
 * Controller donde estas todos los metodos de las operaciones con los usuarios  
 */
class UserController {

    static async getUser(req, res, next) {
        try {
            await UserServices.getUser(req.userId)
                .then(user => {
                    return res.json(user)
                })
        } catch (error) {
            return res.status(500)
        }
    }

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

    static async updateUser(req, res, next) {
        try {
            await UserServices.updateUser(req.userId, req.body.user)
                .then(user => {
                    return res.json(user)
                })
        } catch (error) {
            handleError(res, '', 500, "user")
        }
    }

    static async getGroups(req, res, next) {
        return await UserModel.findById(req.userId).populate('groups')
            .then(user => {
                return res.json(user.groups)
            })
            .catch(err => {
                console.log(err)
                return res.status(500)
            })
    }

    static async getByUsernameLike(req, res, next) {
        return await UserServices.getByUsernameLike(req.body.user.username, req.body.user.isEther)
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
        return UserServices.acceptInvitation(req.body.invitationId, req.userId)
            .then(invitation => {
                return res.json(invitation)
            })
            .catch(err => {
                console.log(err);
                // if (!err.message)
                //     return res.status(500)
                return res.status(403).json(err)
            })
    }

    static async rejectInvitation(req, res, next) {
        try {
            await UserServices.rejectInvitation(req.body.invitationId, req.userId)
                .then(invitation => {
                    return res.json(invitation)
                })
                .catch(err => {
                    if (err == 'Only the guest can reject the invitation')
                        return res.status(403).json(err)
                    throw err
                })
        } catch (error) {
            res.status(500).json({ 'error': 'Server error' })
        }
    }

    static async addWalletAddress(req, res, next) {
        try {
            await UserServices.addWalletAddress(req.userId, req.body.walletAddress)
                .then(user => {
                    return res.json(user)
                })
                .catch(err => {
                    throw err
                })
        } catch (error) {
            return res.status(500).json({ 'error': 'Server error' })
        }
    }

    static async getByWalletAddress(req, res, next) {
        try {
            await UserServices.getByWalletAddress(req.params.walletAddress)
                .then(user => {
                    return res.json(user)
                })
                .catch(err => {
                    throw err
                })
        } catch (error) {
            return res.status(500).json({ 'error': 'Server error' })
        }
    }

}


module.exports = UserController;