const ExpenseModel =  require('../models/Expense')


class ExpenseService {


    static async createExpense({name,payer,group, amount,fractions, date =  Date.now(), description = ""}) {
        
        const data = {group, name,payer, amount, fractions, date, description}
        // creo el nuevo gasto
        
        const expense = await ExpenseModel.create(data)
        .then(data => {
           return data
        })
        .catch(err => {
           throw err;
        })

        return expense
    }


    static async updateExpenseById(id,{name,group, amount,fractions,date, description}) {
        const data = {name,group, amount,fractions,date, description}
        const updateExpense = await ExpenseModel.findByIdAndUpdate(id,data);
        return updateExpense
    }

    static async getExpense(id) {
        return await ExpenseModel.findById(id).populate([{path: 'payer', select: 'username'},'group', { path: 'fractions', populate: { path: 'user', select: 'username'  }}])
            .then(data => {
                if (!data)
                    throw new Error('Expense not found')
                return data
            })
            .catch(err => {
                throw err;
            })
    }

}



module.exports = ExpenseService