const UserModels = require('../models/User')



class UserMiddleware {

    /**
     * @description middelware para verificar si existe el usuario 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns
     */
    static async userExists(req, res, next) {
        // consulto en la base de datos por el usuario 
        let email = req.body.email
        const userFound = await UserModels.findOne({ email: email })

        // veirifico si no existe el usuario 
        if (!userFound) return res.status(402).json({
            errors: [
                { message: "Usuario no existe" }
            ]
        })

        req.userId = userFound

        return next()
    }

}


module.exports = UserMiddleware