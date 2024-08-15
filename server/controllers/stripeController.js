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
    // console.log(sessionId, userId)

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









const createEventCheckoutSession = async (req, res) => {
    try {
        const event = req.body.event;
        console.log('活動訂單項目:', event);

        // 檢查票券庫存
        const availabilityCheck = await stripeModel.checkTicketAvailability(event);
        if (!availabilityCheck.success) {
            return res.status(400).json({ error: availabilityCheck.message });
        }


        const session = await stripeModel.createEventCheckoutSession(event);
        res.json({ url: session.url });
    } catch (e) {
        console.error('創建活動結帳會話時發生錯誤:', e);
        res.status(500).json({ error: '創建活動結帳會話時發生錯誤' });
    }
};

const handleEventSuccessfulPayment = async (req, res) => {
    const sessionId = req.query.session_id;
    const userId = req.userId; // 假設從 token 中獲取
    console.log('Event_sessionId:',sessionId + 'Event_userId :', userId)

    if (!sessionId || !userId) {
        return res.status(400).json({ error: '活動缺少必要參數' });
    }

    try {
        const result = await stripeModel.saveEventOrderDetails(sessionId, userId);
        if (result.success) {
            console.log(result.message);
            res.json({ message: result.message });
        } else {
            res.status(500).json({ error: result.message });
        }
    } catch (error) {
        console.error('處理活動成功支付時發生錯誤:', error);
        res.status(500).json({ error: '處理您的活動訂單時發生錯誤' });
    }
};



module.exports = {
    createCheckoutSession,
    handleSuccessfulPayment,
    createEventCheckoutSession,
    handleEventSuccessfulPayment
};



