  const crypto = require('crypto');
  const axios = require('axios');

  const ECPayService = {
    merchantID: '3002599',
    hashKey: 'spPjZn66i0OhqJsQ',
    hashIV: 'hT5OJckN45isQTTs',
    ecpayApiUrl: 'https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5',

    createOrder: async function({ totalAmount, itemName }) {
      const formatDate = (date) => {
        const pad = (num) => (num < 10 ? '0' + num : num);
        return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
      };
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
      };
      data.CheckMacValue = this.generateCheckMacValue(data);
      // console.log(data.CheckMacValue)

      try {
        const response = await axios.post(this.ecpayApiUrl, this.objectToFormData(data), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        console.log(response.data.checkMacValue)
        return response.data;
        
      } catch (error) {
        console.error('ECPay API Error:', error);
        throw error;
      }
    },

    generateCheckMacValue: function(data) {
      const sortedKeys = Object.keys(data).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
      let checkString = `HashKey=${this.hashKey}`;
      sortedKeys.forEach(key => {
        checkString += `&${key}=${data[key]}`;
      });
      checkString += `&HashIV=${this.hashIV}`;
      
      checkString = encodeURIComponent(checkString).toLowerCase();
      checkString = checkString.replace(/%20/g, '+')
                              .replace(/%2d/g, '-')
                              .replace(/%5f/g, '_')
                              .replace(/%2e/g, '.')
                              .replace(/%21/g, '!')
                              .replace(/%2a/g, '*')
                              .replace(/%28/g, '(')
                              .replace(/%29/g, ')');
      let cryptoHash = crypto.createHash('sha256').update(checkString).digest('hex').toUpperCase();
      // console.log(cryptoHash)
      return cryptoHash
    },

    objectToFormData: function(obj) {
      return Object.keys(obj).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`).join('&');
    },

    verifyCallback: function(data) {
      // console.log(data.CheckMacValue)
      const checkMacValue = data.CheckMacValue;
      delete data.CheckMacValue;
      const calculatedCheckMacValue = this.generateCheckMacValue(data);
      
      // console.log(checkMacValue);
      return checkMacValue === calculatedCheckMacValue;
    }
  };

  module.exports = ECPayService;