const EtherExpenseModel = require("../models/EtherExpense")
const GroupModel = require("../models/Group")

class EtherExpenseService {
    static async list() {
        return await EtherExpenseModel.find()
            .then(data => {
                return data
            })
            .catch(err => {
                throw err;
            })
    }

    static async getExpense(expenseId) {
        return await EtherExpenseModel.findById(expenseId)
            .populate([{ path: 'payer', select: 'username' }])
            .then(data => {
                if (!data)
                    throw new Error('Expense not found')
                return data
            })
            .catch(err => {
                throw err;
            })
    }

    static async create(etherExpense) {
        return await EtherExpenseModel.create(etherExpense)
            .then(async data => {
                await GroupModel.findByIdAndUpdate(etherExpense.group, { $push: { expenses: data._id } })

                return data
            })
            .catch(err => {
                throw err;
            })
    }
}

module.exports = EtherExpenseService