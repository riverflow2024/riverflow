const stripeModel = require('../models/stripeModel')

const createCheckoutSession = async (req, res) => {
    try {
        const session = await stripeModel.createCheckoutSession(req.body.items)
        res.json({ url: session.url })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

module.exports = {
    createCheckoutSession
}