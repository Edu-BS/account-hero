const jwt = require('jsonwebtoken')



/**
 * Controlador para la authentificacion de la app 
 */
class AuthController {

    /**
     * @description Controller para crear un token 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    static createToken(req,res,next) {
        // recupero el usuario del token 
        const user = req.user 
        
        // se crea el token 
        const token = jwt.sign({
            id : user._id
        },process.env.SECRET,{
            expiresIn : 86400
        })

        req.token = token
        return next()
    }

}

module.exports = AuthController