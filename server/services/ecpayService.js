const crypto = require('crypto')
const axios = require('axios')
const querystring = require('querystring')

const ECPayService = {
  merchantID: '3002599',
  hashKey: 'spPjZn66i0OhqJsQ',
  hashIV: 'hT5OJckN45isQTTs',
  ecpayApiUrl: 'https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5',

  createOrder: async function ({ totalAmount, itemName }) {
    const formatDate = (date) => {
      const pad = (num) => (num < 10 ? '0' + num : num)
      return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())} ${pad(date.getHours())}:${pad(
        date.getMinutes()
      )}:${pad(date.getSeconds())}`
    }

    const data = {
      MerchantID: this.merchantID,
      MerchantTradeNo: `TEST${new Date().getTime()}`,
      MerchantTradeDate: formatDate(new Date()),
      PaymentType: 'aio',
      TotalAmount: totalAmount,
      TradeDesc: 'Test Trade',
      ItemName: itemName,
      ReturnURL: 'http://localhost:3000/riverflow/ecpay/payment-callback',
      ChoosePayment: 'ALL',
      EncryptType: 1,
      ClientBackURL: 'http://localhost:3000/riverflow/test'
    }
    data.CheckMacValue = this.generateCheckMacValue(data)
    console.log('Order Data:', data)

    try {
      const response = await axios.post(this.ecpayApiUrl, this.objectToFormData(data), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      return response.data
    } catch (error) {
      console.error('ECPay API Error:', error)
      throw error
    }
  },

  generateCheckMacValue: function (data) {
    // 移除 HashKey 和 HashIV
    const filteredData = Object.keys(data).reduce((acc, key) => {
      if (key !== 'HashKey' && key !== 'HashIV') {
        acc[key] = data[key]
      }
      return acc
    }, {})

    // 按照規則排序並組合字符串
    const sortedKeys = Object.keys(filteredData).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    let checkString = sortedKeys.map((key) => `${key}=${filteredData[key]}`).join('&')
    checkString = `HashKey=${this.hashKey}&${checkString}&HashIV=${this.hashIV}`

    // URL 編碼
    checkString = encodeURIComponent(checkString).toLowerCase()

    // 替換特定字符
    checkString = checkString
      .replace(/%20/g, '+')
      .replace(/%21/g, '!')
      .replace(/%2a/g, '*')
      .replace(/%28/g, '(')
      .replace(/%29/g, ')')
      .replace(/%2d/g, '-')
      .replace(/%5f/g, '_')
      .replace(/%2e/g, '.')

    // SHA256 加密
    const sha256 = crypto.createHash('sha256').update(checkString).digest('hex')
    return sha256.toUpperCase()
  },

  objectToFormData: function (obj) {
    return querystring.stringify(obj)
  },

  verifyCallback: function (data) {
    const receivedCheckMacValue = data.CheckMacValue
    const dataForVerification = { ...data }
    delete dataForVerification.CheckMacValue

    const calculatedCheckMacValue = this.generateCheckMacValue(dataForVerification)
    console.log('Received CheckMacValue:', receivedCheckMacValue)
    console.log('Calculated CheckMacValue:', calculatedCheckMacValue)

    return receivedCheckMacValue === calculatedCheckMacValue
  }
}

module.exports = ECPayService
