const PaymentService = require('../services/paymentService')

const PaymentController = {
  async createPayment(req, res) {
    try {
      const { totalAmount, itemName } = req.body
      const result = await PaymentService.createOrder({ totalAmount, itemName })

      res.setHeader('Content-Type', 'text/html')
      console.log(result)
      res.send(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  handleCallback(req, res) {
    const data = req.body
    if (PaymentService.verifyCallback(data)) {
      PaymentService.updateOrderStatus(data.MerchantTradeNo, 'paid')
        .then(() => {
          res.send('OK')
        })
        .catch((error) => {
          console.error('Failed to update order status:', error)
          res.status(500).send('Internal Server Error')
        })
    } else {
      console.error('Invalid callback data')
      res.status(400).send('Bad Request')
    }
  }
}

module.exports = PaymentController
