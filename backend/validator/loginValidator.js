const {validate} = require('./validator')
const { body } = require('express-validator');


const loginValidator = validate([
    // validacion del campo email
    body('email')
        .exists()
            .bail()
        .notEmpty()
        .withMessage('el campo email esta vacio')
            .bail()
        .isEmail()
        .withMessage('el email no es valido')
            .bail(),
    // validacion del campo password
    body('password')
        .exists()
            .bail()
        .notEmpty()
        .withMessage('el campo password esta vacio')
            .bail()
    
])


module.exports = {loginValidator}