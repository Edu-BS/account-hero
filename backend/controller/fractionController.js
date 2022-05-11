const FraccionService = require('../services/fraccionService')

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

            await FraccionService.updateFraccionById(req.params.fractionId, { state: 'pending' })
                .then(data => {
                    return res.status(200).json(data)
                })
                .catch(err => {
                    throw err
                })
            fraction
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