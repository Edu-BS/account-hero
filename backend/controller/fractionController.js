const ExpenseService = require('../services/expenseService')
const FraccionService = require('../services/fraccionService')
const GroupService = require('../services/groupService')
const PaymentService = require('../services/paymentService')

class FractionController {
    static async getFraction(req, res, next) {
        try {
            await FraccionService.getFraccion(req.params.fractionId)
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

    static async payFraction(req, res, next) {
        try {
            const fraction = await FraccionService.getFraccion(req.params.fractionId)

            if (!(fraction.user._id.toString() === req.userId))
                return res.status(403).json({ 'error': 'Forbidden' })

            // actualizo la fraccion 
            const fraccionUpdate = await FraccionService.updateFraccionById(req.params.fractionId, { state: 'pending' })
            
            // creo el nuevo pago 
            const newPay = await PaymentService.createPayment(fraccionUpdate.user,fraccionUpdate.amount,fraccionUpdate._id)
            
            // agrego del nuevo pago al gasto 
            const group = await ExpenseService.addNewPayment(fraccionUpdate.group,newPay._id)
            
            return res.status(200).json(newPay)
        
        } catch (err) {
            console.log(err);
            return res.status(500).json({ 'error': 'Server error' })
        }
    }

    static async confirmFraction(req, res, next) {
        try {
            const fraction = await FraccionService.getFraccion(req.params.fractionId)

            if (!(fraction.expense.payer.toString() === req.userId)) {
                return res.status(403).json({ 'error': 'Forbidden' })
            }

            await FraccionService.updateFraccionById(req.params.fractionId, { state: 'paid' })
                .then(data => {
                    return res.status(200).json(data)
                })
                .catch(err => {
                    throw err
                })
        } catch (err) {
            return res.status(500).json({ 'error': 'Server error' })
        }
    }


}

module.exports = FractionController;