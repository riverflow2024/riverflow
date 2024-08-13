const cartModel = require('../models/cartModel');

exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity, productName, productOpt, price } = req.body;
    const result = await cartModel.addToCart(userId, productId, quantity, productName, productOpt, price);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await cartModel.getCart(userId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { ciid, quantity } = req.body;
    const result = await cartModel.updateCartItem(ciid, quantity);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { ciid } = req.params;
    const result = await cartModel.removeFromCart(ciid);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};