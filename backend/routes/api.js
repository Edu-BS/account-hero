const routes = require('express').Router()
const UserController = require('../controller/userController')
const AuthController = require('../controller/authController')

// 1 validar los campos del formulario    
// 2 verificar si el usuario existe, si existe no seguir *  
// 3 crear un nuevo usuario *
// 4 crear el token del usuario *
// 5 devolver el token 
routes.post('/register',[
    UserController.createUser,
    AuthController.createToken

],(req,res)=>{
    const user = req.user
    const token = req.token
    console.log(user.username);
    return res.json({token: token, username: user.username})
});


module.exports = routes;

