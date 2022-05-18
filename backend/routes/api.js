const routes = require('express').Router()
const UserController = require('../controller/userController')
const AuthController = require('../controller/authController')
const GroupController = require('../controller/groupController')
const GroupMiddleware = require('../middleware/groupMiddleware')
const { loginValidator } = require('../validator/loginValidator');
const { registerValidator } = require('../validator/registerValidator')
const AuthMiddleware = require('../middleware/authMiddleware')
const ExpenseController = require('../controller/expenseController')
const FractionController = require('../controller/fractionController')
const EtherExpenseController = require('../controller/etherExpenseController')


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

routes.route('/user/wallet')
    .all(AuthMiddleware.validateToken)
    .post(UserController.addWalletAddress)


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
    .put(UserController.rejectInvitation)


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

routes.route('/group/:groupId/expenses')
    .all(AuthMiddleware.validateToken)
    .get(GroupMiddleware.userInGroup, GroupController.getExpenses)

routes.route('/expense/:expenseId')
    .all(AuthMiddleware.validateToken)
    .get(ExpenseController.getExpense)

routes.route('/expense/:expenseId/fraction/:fractionId')
    .all(AuthMiddleware.validateToken)
    .get(ExpenseController.getFraction)

routes.route('/fraction/:fractionId')
    .all(AuthMiddleware.validateToken)
    .get(FractionController.getFraction)

routes.route('/fraction/:fractionId/pay')
    .all(AuthMiddleware.validateToken)
    .put(FractionController.payFraction)


routes.route('/fraction/:fractionId/confirm')
    .all(AuthMiddleware.validateToken)
    .put(FractionController.confirmFraction)



// ruta para crear nuevo gasto 
routes.post("/newExpense",
    AuthMiddleware.validateToken,
    ExpenseController.createExpense
)

routes.route('/etherExpense/:expenseId')
    .all(AuthMiddleware.validateToken)
    .get(EtherExpenseController.getById)

routes.route('/etherExpense')
    .all(AuthMiddleware.validateToken)
    .get(EtherExpenseController.list)
    .post(EtherExpenseController.create)


module.exports = routes;

