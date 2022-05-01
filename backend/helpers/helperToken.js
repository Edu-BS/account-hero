const jwt = require('jsonwebtoken')


class HelperToken {

    /**
     * Funcion para generar un token
     * @param {object} user 
     * @returns token 
     */
    static createToken(user) {
        // se crea el token 
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: 86400
        })
        return token
    }
}


module.exports = HelperToken