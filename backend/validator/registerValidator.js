const {validate} = require('./validator')
const { body } = require('express-validator');


const registerValidator = validate([
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
            .bail(),
    // validacion del campo name
    body('name')
        .exists()
            .bail()
        .notEmpty()
        .withMessage('el campo name esta vacio')
            .bail(),
    // validacion del campo surname
    body('surname')
        .exists()
            .bail()
        .notEmpty()
        .withMessage('el campo surname esta vacio')
            .bail(),
    // validacion del campo birthday
    body('birthday')
        .exists()
            .bail()
        .notEmpty()
        .withMessage('el campo birthday esta vacio')
            .bail()
        .isDate()
        .withMessage('el campo birthday tiene que ser una fecha')
            .bail(),
    // validacion del campo username 
    body('username')
        .exists()
            .bail()
        .notEmpty()
        .withMessage('el campo username esta vacio')
            .bail()  
])          


module.exports = {registerValidator}