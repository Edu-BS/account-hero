const UserModels = require('../models/User')


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

        // recupero los datos del body 
        const { name, surname, birthday, username, email, password } = req.body

        // verifico si existe ya el usuario 
        const userFound =  await UserModels.findOne({email: email})

        // si el usuario no existe regreso el error 
        if (userFound) return res.status(403).json({error: "Usuario ya existe"})
        
        // creo el nuevo usuario 
        const user = new UserModels({
            name: name,
            surname: surname,
            birthday: birthday,
            username: username,
            email: email,
            password: await UserModels.encryptPassword(password)
        })

        // guardo el nuevo usuario en la base de datos 
        const newUser = await user.save()
        console.log(newUser.username);
        req.user = newUser
        return next()
    }
}


module.exports = UserController;