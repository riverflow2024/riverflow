const express = require('express')
const router = express.Router()
const stripeController = require('../controllers/stripeController')

router.post("/create-checkout-session", stripeController.createCheckoutSession)
router.post("/create-event-checkout-session", stripeController.createEventCheckoutSession)
router.get("/payment-success", stripeController.handleSuccessfulPayment)

module.exports = router