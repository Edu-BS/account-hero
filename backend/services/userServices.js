const UserModel = require('../models/User')
const InvitationService = require('../services/invitationService')
const GroupService = require('./groupService')

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
    static async createUser({ name, surname, birthday, username, email, password }) {

        // verifico si existe ya el usuario 
        const userFound = await UserModel.find({ $or: [{ email: email }, { username: username }] })

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
        const user = new UserModel({
            name: name,
            surname: surname,
            birthday: birthday,
            username: username,
            email: email,
            password: await UserModel.encryptPassword(password)
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
        const user = UserModel.findById(_id).select('-password')
        return user
    }

    static async updateUser(userId, user) {
        return await UserModel.findByIdAndUpdate(userId, user, { new: true })
    }

    static async getByUsernameLike(username, isEther) {
        let users = await UserModel
                .find({ 'username': { $regex: username, $options: 'i' } })
                .select('username name _id walletAddress')
                .limit(5)
                
        if (isEther) {
            users = users.filter(user => { 
                if (user.walletAddress)
                    return true
            })
            // users = await UserModel.where("walletAddress").exists(tru).limit()
        }
        return users
    }

    static async getInvitations(userId) {
        return await InvitationService.getInvitations(userId)
            .then(invitations => {
                // return the invitations 
                return invitations
            })
            .catch(err => {
                throw err
            })
    }

    static async addGroup(groupId, userId) {
        return await UserModel.findByIdAndUpdate(userId, {
            $push: { groups: groupId }
        })
            .then(user => {
                return user
            })
            .catch(err => {
                throw err
            })
    }

    static async addInvitation(userId, invitationId) {
        return UserModel.findByIdAndUpdate(userId, { $push: { invitations: invitationId } })
            .then(user => {
                return user
            })
            .catch(err => {
                throw err
            })
    }

    static async acceptInvitation(invitationId, userId) {
        return await this.getUser(userId)
            .then(async user => {
                await InvitationService.acceptInvitation(invitationId, user)
                    .then(async invitation => {
                        if (invitation) {
                            await GroupService.addUser(invitation.group._id, userId)
                                .catch(err => {
                                    console.log(err);
                                    throw err
                                })
                        }
                        return invitation
                    })
                    .catch(err => {
                        throw err
                    })
            })
            .catch(err => {
                throw err
            })
    }

    static async rejectInvitation(invitationId, userId) {
        return await this.getUser(userId)
            .then(async user => {
                return await InvitationService.rejectInvitation(invitationId, user)
                    .then(invitation => {
                        return invitation
                    })
                    .catch(err => {
                        throw err
                    })
            })
            .catch(err => {
                throw err
            })
    }

    static async addWalletAddress(userId, walletAddress) {
        return await UserModel.findByIdAndUpdate(userId, { "walletAddress": walletAddress }, { new: true })
            .then(user => {
                return user
            })
            .catch(err => {
                throw err
            })
    }

    static async getByWalletAddress(walletAddress) {
        return await UserModel.findOne({ "walletAddress": walletAddress })
            .then(user => {
                return user
            })
            .catch(err => {
                throw err
            })
    }
}


module.exports = UserServices