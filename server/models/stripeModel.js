const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const dbconnect = require('./dbConnect');

const createCheckoutSession = async (items) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: items.map(item => ({
            price_data: {
                currency: 'twd',
                product_data: {
                    name: `${item.name}`,
                    description: `尺寸: ${item.size}`,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        })),
        success_url: `${process.env.CLIENT_URL}/Order/PaymentSuccess?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
        metadata: {
            order_details: JSON.stringify(items)
        }
    });
    console.log('orderID :', session.id);
    console.log('orderData :', session.metadata);
    return session;
};

const retrieveSession = async (sessionId) => {
    return await stripe.checkout.sessions.retrieve(sessionId);
};

const saveOrderDetails = async (sessionId, userId) => {
    try {
        const session = await retrieveSession(sessionId);

        const orderDetails = JSON.parse(session.metadata.order_details);

        // 計算總價
        const totalPrice = orderDetails.reduce((sum, item) => sum + item.price * item.quantity, 0);

        // 使用 Promise 包裝回调函数
        const query = (sql, params) => {
            return new Promise((resolve, reject) => {
                dbconnect.query(sql, params, (error, results) => {
                    if (error) {
                        console.error('資料庫查詢錯誤:', error);
                        return reject(error);
                    }
                    resolve(results);
                });
            });
        };

        // 開始資料庫事務
        await query('START TRANSACTION');

        try {


            // 檢查是否已存在相同的訂單
            const existingOrder = await query(
                'SELECT orderid FROM `order` WHERE userId = ? AND totalPrice = ? AND createdAt > DATE_SUB(NOW(), INTERVAL 5 MINUTE)',
                [userId, totalPrice]
            );

            if (existingOrder.length > 0) {
                await query('COMMIT');
                return { success: true, message: '訂單已存在，無需重複處理' };
            }

            // 插入訂單主表
            const result = await query(
                'INSERT INTO `order` (userId, totalPrice, orderStatus, shipMethod, convAddr, rcptName, rcptPhone, rcptAddr, payMethod, payTime, receiptType, receiptInfo, orderRemark, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?, ?, NOW())',
                [userId, totalPrice, 'processing', 'delivery', null, '測試', '0933444333', '某處', 'card', 'dupInvoice', 'Z1234567', '這是一個測試訂單']
            );
            const orderId = result.insertId;
            console.log('插入訂單主表成功，orderId:', orderId);

            // 插入訂單項目
            for (const item of orderDetails) {
                await query(
                    'INSERT INTO orderitem (orderId, productId, productName, productOpt, quantity, price) VALUES (?, ?, ?, ?, ?, ?)',
                    [orderId, item.productId, item.name, item.size, item.quantity, item.price]
                );
            }

            // 删除 cartitem 记录
            await query('DELETE FROM cartitem WHERE cartId IN (SELECT cartId FROM cart WHERE userId = ?)', [userId]);

            // 删除 cart 记录
            await query('DELETE FROM cart WHERE userId = ?', [userId]);

            // 提交事務
            await query('COMMIT');

            return { success: true, message: '訂單已成功處理並保存，購物車已清空' };
        } catch (error) {
            // 如果出現錯誤，回滾事務
            await query('ROLLBACK');
            throw error;
        }
    } catch (error) {
        console.error('保存訂單詳情時發生錯誤:', error);
        return { success: false, message: '保存訂單詳情時發生錯誤' };
    }
};

module.exports = {
    createCheckoutSession,
    retrieveSession,
    saveOrderDetails
};