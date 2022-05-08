const routes = require('express').Router()
const UserController = require('../controller/userController')
const AuthController = require('../controller/authController')
const GroupController = require('../controller/groupController')
const GroupMiddleware = require('../middleware/groupMiddleware')
const { loginValidator } = require('../validator/loginValidator');
const { registerValidator } = require('../validator/registerValidator')
const AuthMiddleware = require('../middleware/authMiddleware')


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

routes.route('/user')
    .all(AuthMiddleware.validateToken)
    .get(UserController.getUser)
    .put(UserController.updateUser)

routes.route('/users/nameLike')
    // .param('nameLike', UserController.getByUsernameLike)
    .all(AuthMiddleware.validateToken)
    .post(UserController.getByUsernameLike)
    // .get(UserController.getByUsernameLike)

routes.route('/user/invitations')
    .all(AuthMiddleware.validateToken)
    .get(UserController.getInvitations)

routes.route('/user/invitation/accept')
    .all(AuthMiddleware.validateToken)
    .put(UserController.acceptInvitation)

routes.route('/user/invitation/reject')
    .all(AuthMiddleware.validateToken)
    // .post(UserController.rejectInvitation)


routes.route('/user/groups')
    .all(AuthMiddleware.validateToken)
    .get(UserController.getGroups)
    

routes.route('/group')
    .all(AuthMiddleware.validateToken)
    .post(GroupController.createGroup)

routes.route('/group/:groupId')
    .all(AuthMiddleware.validateToken)
    .get(GroupMiddleware.userInGroup, GroupController.getGroup)
    .put(GroupMiddleware.userIsAdmin, GroupController.updateGroup)
    .delete(GroupMiddleware.userIsAdmin, GroupController.deleteGroup)


module.exports = routes;

