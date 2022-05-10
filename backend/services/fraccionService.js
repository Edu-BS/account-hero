const fraccionModel = require('../models/Fraction')


class FraccionService {



    static async createFraccion({user, amount, state = "unpaid", group}) {
        const data = {user, amount, state, group}
        // creo el nuevo gasto
        const newFraccion = await fraccionModel.create(data)
        .then(data => {
           return data
        })
        .catch(err => {
           throw err;
        })

        return newFraccion
    }

    static async createFraccions(fraccions) {
        
        const newFraccions = []
        for (let i = 0; i < fraccions.length; i++) {
            const user = fraccions[i].userId;
            const amount = fraccions[i].amount
            const newFraccion = await this.createFraccion({user: user,amount: amount})
            newFraccions.push(newFraccion) 
    
        }



        return newFraccions
    }


    static async updateFraccionById(id,{user,amount,state,group,expense}) {
        const data = {user,amount,state,group,expense}
        const updateFraccion = await fraccionModel.findByIdAndUpdate(id,data);
        return updateFraccion
    }
}


module.exports = FraccionService