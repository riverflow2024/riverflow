const stripeModel = require('../models/stripeModel')

const createCheckoutSession = async (req, res) => {
    try {
        const productId = req.body.items.productId
        console.log(items)
        console.log('productid: ',productId)
        const session = await stripeModel.createCheckoutSession(req.body.items)
        res.json({ url: session.url })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

const handleSuccessfulPayment = async (req, res) => {
    const sessionId = req.query.session_id;

    try {
        const result = await stripeModel.saveOrderDetails(sessionId);
        if (result.success) {
            console.log(result.message)
            res.send(result.message);
        } else {
            res.status(500).send(result.message);
        }
    } catch (error) {
        console.error('處理成功支付時發生錯誤:', error);
        res.status(500).send('處理您的訂單時發生錯誤。');
    }
}

module.exports = {
    createCheckoutSession,
    handleSuccessfulPayment
}