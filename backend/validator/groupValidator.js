const {validate} = require('./validator')
// const { body } = require('express-validator');


const groupValidator = validate([
    body('name')
        .exists()
            .bail()
        .notEmpty()
        .withMessage('el campo email esta vacio')
            .bail()
        .isEmail()
        .withMessage('el email no es valido')
            .bail(),
    body('password')
        .exists()
            .bail()
        .notEmpty()
        .withMessage('el campo password esta vacio')
            .bail()
    
])


module.exports = {loginValidator: groupValidator}