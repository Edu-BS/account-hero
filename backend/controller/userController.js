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
            handleError(res, error, 400,"user")
        }
    }

    static async getGroups(req, res, next) {
        await UserModel.findById(req.userId).populate('groups')
            .then(user => {
                console.log("entra")
                res.json(user.groups)
            })
            .catch(err => {
                console.log(err)
            })
    }

}


module.exports = UserController;