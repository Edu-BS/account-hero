const UserModels = require('../models/User')


class UserServices {


    /**
     * Funcion para crear un nuevo usuario 
     * @param {string} name Nombre del nuevo usuario
     * @param {string} surname Apellido del nuevo usuario 
     * @param {string} birthday Fecha de naciomento del nuevo usuario 
     * @param {string} username Username del nuevo usuario (username tiene que ser unico) 
     * @param {string} email Email del nuevo usuario (email tiene que ser unico)  
     * @throws si el usuario no existe  
     * @returns {Object} el usuario nuevo 
     */
    static async createUser({name,surname,birthday,username,email,password}) {
    
        // verifico si existe ya el usuario 
        const userFound = await UserModels.find({$or: [{ email: email},{username: username}]})

        // verifico si existe algun usuario 
        if (userFound) {
            // verifico si existe el email
            userFound.find(user => {
                if (user.email === email) throw 'correo ya existe'
                return user
            })

            // verifico si existe el username 
            userFound.find(user => {
                if (user.username === username) throw 'username ya existe'
                return user
            })
        }

        // si todo va bien creo el usuario 
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
        return newUser
    }


    /**
     * Funcion que verifica si el usuario existe o np 
     * @param {string} _id id del usuario  
     * @returns true si el usuario existe, false si no existe 
     */
    static async userExists(_id) {
        let user = this.getUser(_id)
        
        if (!user) return false
        
        return true
    }

    /**
     * Funcion para buscar usuario por id en la base de datos 
     * @param {string} _id id de la base de datos del usuario a buscar 
     * @returns {object} usuario de la base de datos 
     */
    static async getUser(_id) {
        const user = UserModels.findById(_id)
        return user
    }

    static async getByUsernameLike(username) {
        const users = await UserModels.find({'username': {$regex: username, $options: 'i'}}).select('username name _id').limit(5)
        return users
    }
}


module.exports = UserServices