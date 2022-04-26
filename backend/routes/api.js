const routes = require('express').Router()
const UserController = require('../controller/userController')
const AuthController = require('../controller/authController')
const {loginValidator} = require('../validator/loginValidator');
const {registerValidator} = require('../validator/registerValidator')


/**
 * peticion post para registrar nuevo usuario
 */
routes.post('/register',
    // 1 validar los campos del formulario
    registerValidator,
    // 2 crear nuevo usuario  
    UserController.createUser,
);



/**
 * peticion post para logear a usuario 
 */
routes.post('/login',
    // 1 validarlos campos del formulario
    loginValidator,
    // 2 logear a usuario  
    AuthController.login
)


module.exports = routes;

