const PaymentService = require('../services/paymentService');

const PaymentController = {
  async createPayment(req, res) {
    try {
      const { totalAmount, itemName } = req.body;
      const result = await PaymentService.createOrder({ totalAmount, itemName });

      res.send(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  handleCallback(req, res) {
    const data = req.body;
    console.log(data);
    if (PaymentService.verifyCallback(data)) {
      // Payment successful, update your database here
      console.log('Payment successful:', data);
      res.send('1|OK');
    } else {
      console.error('Invalid callback data');
      res.status(400).send('0|Bad Request');
    }
  }
};

module.exports = PaymentController;