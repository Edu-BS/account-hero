const UserModels = require('../models/User')
const jwt = require('jsonwebtoken')


class AuthMiddleware {

    /**
     * @description middleware para validar la contraseña
     * @async 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    static async validatePassword(req, res, next) {
        const password = req.body.password
        const user = req.user
        // verifico si la contraseña es valida 
        const matchPassword = await UserModels.comparePassword(password, user.password);
        // si no es valida envio el mesaje al cliente 
        if (!matchPassword) return res.status(401).json({ errors: [{ message: "contraseña invalida" }] })

        return next()
    }

}

module.exports =  AuthMiddleware 