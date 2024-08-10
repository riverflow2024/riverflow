const PaymentService = require('../services/paymentService');

const PaymentController = {
  async createPayment(req, res) {
    try {
      const { totalAmount, itemName } = req.body;
      const result = await PaymentService.createOrder({ totalAmount, itemName });

      res.setHeader('Content-Type', 'text/html');
      console.log(result);
      res.send(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  handleCallback(req, res) {
    const data = req.body;
    // console.log(data);
    if (PaymentService.verifyCallback(data)) {
      // Payment successful, update your database here
      console.log('Payment successful:', data);
      res.send('OK');
    } else {
      console.error('Invalid callback data');
      res.status(400).send('Fail Request');
    }
  }
};

module.exports = PaymentController;