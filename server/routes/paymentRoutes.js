const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/paymentController');

router.post('/create-payment', PaymentController.createPayment);
router.post('/payment-callback', PaymentController.handleCallback);

module.exports = router;