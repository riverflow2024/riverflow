const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/add', cartController.addToCart);
router.get('/', cartController.getCart);
router.put('/update', cartController.updateCartItem);
router.delete('/remove/:ciid', cartController.removeFromCart);

module.exports = router;