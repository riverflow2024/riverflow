const stripeModel = require('../models/stripeModel');

const createCheckoutSession = async (req, res) => {
    try {
        const items = req.body.items;
        console.log('訂單項目:', items);
        const session = await stripeModel.createCheckoutSession(items);
        res.json({ url: session.url });
    } catch (e) {
        console.error('創建結帳會話時發生錯誤:', e);
        res.status(500).json({ error: '創建結帳會話時發生錯誤' });
    }
};


const handleSuccessfulPayment = async (req, res) => {
    const sessionId = req.query.session_id;
    const userId = req.userId; // 假設從 token 中獲取
    console.log(sessionId, userId)

    if (!sessionId || !userId) {
        return res.status(400).json({ error: '缺少必要參數' });
    }

    try {
        const result = await stripeModel.saveOrderDetails(sessionId, userId);
        if (result.success) {
            console.log(result.message);
            res.json({ message: result.message });
        } else {
            res.status(500).json({ error: result.message });
        }
    } catch (error) {
        console.error('處理成功支付時發生錯誤:', error);
        res.status(500).json({ error: '處理您的訂單時發生錯誤' });
    }
};

// const handleSuccessfulPayment = async (req, res) => {
//     const sessionId = req.query.session_id;
//     // const userId = req.userId; // 假設從 token 中獲取
//     // console.log('ueserId: ',userId)

//     // if (!sessionId || !userId) {
//     //     return res.status(400).json({ error: '缺少必要參數' });
//     // }

//     try {
//         const result = await stripeModel.saveOrderDetails(sessionId);
//         if (result.success) {
//             console.log(result.message);
//             res.json({ message: result.message });
//         } else {
//             res.status(500).json({ error: result.message });
//         }
//     } catch (error) {
//         console.error('處理成功支付時發生錯誤:', error);
//         res.status(500).json({ error: '處理您的訂單時發生錯誤' });
//     }
// };

module.exports = {
    createCheckoutSession,
    handleSuccessfulPayment
};

