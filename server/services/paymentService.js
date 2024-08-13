const ECPayService = require('./ecpayService')
const PaymentService = {
  async createOrder(orderDetails) {
    // 這裡可以添加業務邏輯，例如保存訂單到數據庫
    return await ECPayService.createOrder(orderDetails)
  },

  verifyCallback(callbackData) {
    // console.log(callbackData)
    return ECPayService.verifyCallback(callbackData)
  }
}

module.exports = PaymentService
