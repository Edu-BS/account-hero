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

    static async validateToken(req, res, next) {
        try {
            let token = req.headers.authorization
            token = token.replace('Bearer ', '')

            if (!token) return res.status(401).json({ errors: [{ message: "no hay token" }] })

            const decoded = await jwt.verify(token, process.env.JWT_SECRET)
            req.userId = decoded.id

            return next()
        } catch (error) {
            return res.status(401).json({ errors: [{ message: "token invalido" }] })
        }
    }


}

module.exports = AuthMiddleware 