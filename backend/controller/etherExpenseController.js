const EtherExpenseService = require("../services/etherExpenseService")

class EthereumExpenseController {
    static async list(req, res, next) {
        try {
            await EtherExpenseService.list()
                .then(data => {
                    return res.status(200).json(data)
                })
                .catch(err => {
                    throw err
                })
        } catch (error) {
            return res.status(500).json({ 'error': 'Server error' })
        }
    }

    static async getById(req, res, next) {
        try {
            await EtherExpenseService.getExpense(req.params.expenseId)
                .then(data => {
                    return res.status(200).json(data)
                })
                .catch(err => {
                    throw err
                })
        } catch (error) {
            return res.status(500).json({ 'error': 'Server error' })
        }
    }

    static async create(req, res, next) {
        try {
            const etherExpense = req.body
            etherExpense.payer = req.userId
            await EtherExpenseService.create(etherExpense)
                .then(data => {
                    return res.status(200).json(data)
                })
                .catch(err => {
                    throw err
                })
        } catch (err) {
            console.log(err);
            return res.status(500).json({ 'error': 'Server error' })
        }
    }
}

module.exports = EthereumExpenseController