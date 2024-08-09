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
      console.log(data)

      try {
        const response = await axios.post(this.ecpayApiUrl, this.objectToFormData(data), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

      const contentType = response.headers['content-type'];
      if (contentType && contentType.includes('text/html')) {
        // 如果是 HTML 響應，直接返回
        return response.data;
      } else {
        // 如果不是 HTML，可能需要進行解析或其他處理
        console.log('Unexpected response type:', contentType);
        return this.parseResponse(response.data);
      }
        
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


    verifyCallback: function(receivedData) {
      // console.log(receivedData)
      // 保存 ECPay 發送的 CheckMacValue
      const receivedCheckMacValue = receivedData.CheckMacValue;
  
      // 創建一個不包含 CheckMacValue 的數據副本
      const dataForVerification = { ...receivedData };
      delete dataForVerification.CheckMacValue;
  
      // 使用我們的方法重新計算 CheckMacValue
      const calculatedCheckMacValue = this.generateCheckMacValue(dataForVerification);
  
      // console.log('Received CheckMacValue from ECPay:', receivedCheckMacValue);
      // console.log('Calculated CheckMacValue:', calculatedCheckMacValue);
      
      // 比較接收到的和計算的 CheckMacValue
      const isValid = receivedCheckMacValue === calculatedCheckMacValue;
      console.log('Verification result:', isValid ? 'Valid' : 'Invalid');
  
      return isValid;
    }
  };

  module.exports = ECPayService;





















    // verifyCallback: function(data) {
    //   console.log(data.CheckMacValue)
    //   const checkMacValue = data.CheckMacValue;
    //   delete data.CheckMacValue;
    //   const calculatedCheckMacValue = this.generateCheckMacValue(data);
      
    //   // console.log(checkMacValue);
    //   return checkMacValue === calculatedCheckMacValue;
    // }













  //綠界全方位金流技術文件： https://developers.ecpay.com.tw/?p=2509

////////////////////////改以下參數即可////////////////////////
//一、選擇帳號，是否為測試環境
// const MerchantID = "3002607"; //必填
// const HashKey = "pwFHCqoQZGmho4w6"; //3002607
// const HashIV = "EkRm7iFT261dpevs"; //3002607
// let isStage = true; // 測試環境： true；正式環境：false

// //二、輸入參數
// const TotalAmount = "10000";
// const TradeDesc = "測試敘述";
// const ItemName = "測試名稱";
// const ReturnURL = "https://www.ecpay.com.tw";
// const ChoosePayment = "ALL";

// ////////////////////////以下參數不用改////////////////////////
// const stage = isStage ? "-stage" : "";
// const algorithm = "sha256";
// const digest = "hex";
// const APIURL = `https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5`;
// const MerchantTradeNo = `od${new Date().getFullYear()}${(
//   new Date().getMonth() + 1
// )
//   .toString()
//   .padStart(2, "0")}${new Date()
//   .getDate()
//   .toString()
//   .padStart(2, "0")}${new Date()
//   .getHours()
//   .toString()
//   .padStart(2, "0")}${new Date()
//   .getMinutes()
//   .toString()
//   .padStart(2, "0")}${new Date()
//   .getSeconds()
//   .toString()
//   .padStart(2, "0")}${new Date().getMilliseconds().toString().padStart(2)}`;

// const MerchantTradeDate = new Date().toLocaleDateString("zh-TW", {
//   year: "numeric",
//   month: "2-digit",
//   day: "2-digit",
//   hour: "2-digit",
//   minute: "2-digit",
//   second: "2-digit",
//   hour12: false
// });

// //三、計算 CheckMacValue 之前
// let ParamsBeforeCMV = {
//   "MerchantID": MerchantID,
//   "MerchantTradeNo": MerchantTradeNo,
//   "MerchantTradeDate": MerchantTradeDate.toString(),
//   "PaymentType": "aio",
//   "EncryptType": 1,
//   "TotalAmount": TotalAmount,
//   "TradeDesc": TradeDesc,
//   "ItemName": ItemName,
//   "ReturnURL": ReturnURL,
//   "ChoosePayment": ChoosePayment
// };

// //四、計算 CheckMacValue
// function CheckMacValueGen(parameters, algorithm, digest) {
//   const crypto = require("crypto");
//   let Step0;

//   Step0 = Object.entries(parameters)
//     .map(([key, value]) => `${key}=${value}`)
//     .join("&");

//   function DotNETURLEncode(string) {
//     const list = {
//       "%2D": "-",
//       "%5F": "_",
//       "%2E": ".",
//       "%21": "!",
//       "%2A": "*",
//       "%28": "(",
//       "%29": ")",
//       "%20": "+"
//     };

//     Object.entries(list).forEach(([encoded, decoded]) => {
//       const regex = new RegExp(encoded, "g");
//       string = string.replace(regex, decoded);
//     });

//     return string;
//   }

//   const Step1 = Step0.split("&")
//     .sort((a, b) => {
//       const keyA = a.split("=")[0];
//       const keyB = b.split("=")[0];
//       return keyA.localeCompare(keyB);
//     })
//     .join("&");
//   const Step2 = `HashKey=${HashKey}&${Step1}&HashIV=${HashIV}`;
//   const Step3 = DotNETURLEncode(encodeURIComponent(Step2));
//   const Step4 = Step3.toLowerCase();
//   const Step5 = crypto.createHash(algorithm).update(Step4).digest(digest);
//   const Step6 = Step5.toUpperCase();
//   return Step6;
// }
// const CheckMacValue = CheckMacValueGen(ParamsBeforeCMV, algorithm, digest);

// //五、將所有的參數製作成 payload
// const AllParams = {...ParamsBeforeCMV, CheckMacValue};
// const inputs = Object.entries(AllParams)
//   .map(function (param) {
//     return `<input name=${param[0]} value="${param[1].toString()}"><br/>`;
//   })
//   .join("");

// //六、製作送出畫面
// const htmlContent = `
// <!DOCTYPE html>
// <html>
// <head>
//     <title>全方位金流測試</title>
// </head>
// <body>
//     <form method="post" action="${APIURL}">
// ${inputs}
// <input type ="submit" value = "送出參數">
//     </form>
// </body>
// </html>
// `;

// //七、製作出 index.html
// const fs = require("fs");

// fs.writeFile("index.html", htmlContent, err => {
//   if (err) {
//     console.error("寫入檔案時發生錯誤:", err);
//   } else {
//     console.log("已建立 index.html");
//     import("open")
//       .then(open => {
//         open.default("index.html");
//       })
//       .catch(error => {
//         console.error("錯誤！", error);
//       });
//   }
// });

