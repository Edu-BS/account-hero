const UserServices = require('../services/userServices')
const {handleError} = require('../helpers/handleError')
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
            res.json({token: token, username: user.username})
        } catch (error) {
            handleError(res,error,400)
        }   
    }



}


module.exports = UserController;