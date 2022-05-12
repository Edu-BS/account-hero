const paymentModel = require('../models/Payment')


class PaymentService {

    static async createPayment(userId,amount,fractionId) {
        
        const data = {user : userId, amount, fraction: fractionId}
        
        // creo el nuevo gasto
        const newFraccion = await paymentModel.create(data)
        .then(data => {
            return data
        })
        .catch(err => {
            throw err;
        })

        return newFraccion
    }

}


module.exports = PaymentService