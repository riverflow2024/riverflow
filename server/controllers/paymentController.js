const stripeModel = require('../models/stripeModel');
const orderModel = require('../models/orderModel');

exports.createCheckoutSession = async (req, res) => {
  try {
    const session = await stripeModel.createCheckoutSession(req.body);
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.handleSuccessfulPayment = async (req, res) => {
  const sessionId = req.query.session_id;
  try {
    const sessionDetails = await stripeModel.saveOrderDetails(sessionId);
    const orderDetails = JSON.parse(sessionDetails.metadata.order_details);
    
    // 儲存訂單資訊
    const orderId = await orderModel.createOrder(sessionId, orderDetails);
    
    // 清空購物車
    await orderModel.clearCart(orderDetails[0].userId);
    
    res.send('訂單已成功處理並保存');
  } catch (error) {
    console.error('處理成功支付時發生錯誤:', error);
    res.status(500).send('處理您的訂單時發生錯誤。');
  }
};