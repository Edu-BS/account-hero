const ExpenseService = require('../services/expenseService')
const FraccionService = require('../services/fraccionService')
const { handleError } = require('../helpers/handleError');
const GroupService = require('../services/groupService');

class ExpenseController {


    static async createExpense(req, res) {

        try {
            const data = req.body;
            const userPayer = req.userId
            const usersFraccion = data.fractions.filter(user => user.checked)

            // agrego a data con los nombres que necesito para almacenar en la bd
            data.group = data.idGroup
            data.payer = userPayer

            // creo las fracciones a pagar del gasto 
            const fractions = await FraccionService.createFraccions(usersFraccion)
            data.fractions = fractions


            // creo el nuevo gasto 
            const newExpense = await ExpenseService.createExpense(data)
            let idExpense = newExpense._id

            // añado el gasto a el grupo 
            await GroupService.addExpense(data.idGroup, newExpense._id)

            // agrego el grupo a las fracciones nuevas 
            const updateFractions = []

            // agrego a la fraccion el id del grupo 
            for (let i = 0; i < fractions.length; i++) {
                let fraction = fractions[i];
                let updateFraction = await FraccionService.updateFraccionById(fraction._id, { expense: idExpense })
                updateFractions.push(updateFraction._id)
            }
            // agrego al gasto las fracciones 
            ExpenseService.updateExpenseById(newExpense._id, { fractions: updateFractions })

            // cambio el estado de pago del usuario que creo el gasto 
            // NOTA: cambiar esto y pasarlo al frontend
            let fractionPayed = fractions.find(fraction => fraction.user == userPayer)
            console.log(fractionPayed != 'undefined')
            if (fractionPayed) {
                FraccionService.updateFraccionById(fractionPayed._id, { state: 'payed' })
            }

            res.json({ expense: newExpense })

        } catch (error) {
            handleError(res, error, 400, "expense")
        }
    }

    static async getExpense(req, res) {
        try {
            await ExpenseService.getExpense(req.params.expenseId)
                .then(expense => {
                    return res.json(expense);
                })
                .catch(err => {
                    throw err;
                })
        } catch (error) {
            // console.log(error)
            if (error.message === 'Expense not found') 
                return res.status(404).json({ error: 'Expense not found' })
            return res.status(500).json({ error: 'Server error'})
        }
    }
}


module.exports = ExpenseController