const express = require('express')
const router = express.Router()
const stripeController = require('../controllers/stripeController')

router.post("/create-checkout-session", stripeController.createCheckoutSession)
router.get("/payment-success", stripeController.handleSuccessfulPayment)


router.post("/create-event-checkout-session", stripeController.createEventCheckoutSession)
router.get("/event-payment-success", stripeController.handleEventSuccessfulPayment)
module.exports = router