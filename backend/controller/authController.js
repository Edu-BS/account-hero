const UserModels = require('../models/User')
const {handleError} = require('../helpers/handleError')
const helperToken = require('../helpers/helperToken')
const jwt = require('jsonwebtoken')




/**
 * Controlador para la authentificacion de la app 
 */
class AuthController {


    /**
     * Controller para logear a usuario 
     * @param {*} req 
     * @param {*} res 
     * @throws si el usuario no existe, si la contraseña no es valida 
     * @returns 
     */
    static async login(req,res) {
        try {
            // busco el usuario en la bd
            const {email, password} = req.body
            const userFound = await UserModels.findOne({email : email})
 
            // si no existe lanzo una excepcion 
            if (!userFound) throw 'usuario no existe'
            
            // verifico si la clave es correcta 
            const matchPassword = await UserModels.comparePassword(password,userFound.password)

            // si no es correcta lanzo una excepcion
            if (!matchPassword) throw 'clave invalida'
            
            // creo el token 
            const token = helperToken.createToken(userFound) 
            
            return res.json({token: token, username: userFound.username})

        } catch (error) {
            console.log(error)
            handleError(res,error,400)
        }
    }

}


module.exports = AuthController