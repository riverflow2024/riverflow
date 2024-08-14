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
        success_url: `${process.env.CLIENT_URL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
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
        // console.log('訂單資料:', orderDetails);

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

        // 插入訂單主表
        const result = await query(
            'INSERT INTO `order` (userId, totalPrice, orderStatus, shipMethod, convAddr, rcptName, rcptPhone, rcptAddr, payMethod, payTime, receiptType, receiptInfo, orderRemark, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?, ?, NOW())',
            [11, totalPrice, 'processing', 'delivery', null, '測試', '0933444333', '某處', 'card', 'dupInvoice', 'Z1234567', '這是一個測試訂單']
        );
        console.log('result: ',result)
        const orderId = result.insertId;
        console.log('插入訂單主表成功，orderId:', orderId);

        // 插入訂單項目
        for (const item of orderDetails) {
            console.log('插入訂單項目:', item);
            try {
                const insertItem = await query(
                    'INSERT INTO orderitem (orderId, productId, productName, productOpt, quantity, price) VALUES (?, ?, ?, ?, ?, ?)',
                    [orderId, item.productId, item.name, item.size, item.quantity, item.price]
                );
                console.log('插入項目成功:', insertItem);
            } catch (error) {
                console.error('插入訂單項目時發生錯誤:', error);
            }
        }
        
        return { success: true, message: '訂單已成功處理並保存' };
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


// const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
// const dbconnect = require('./dbConnect')


// const createCheckoutSession = async (items) => {
//     const session = await stripe.checkout.sessions.create({
//         payment_method_types: ['card'],
//         mode: 'payment',
//         line_items: items.map(item => ({
//             price_data: {
//                 currency: 'twd',
//                 product_data: {
//                     name: `${item.name}`,
//                     description: `尺寸: ${item.size}`,
//                 },
//                 unit_amount: item.price * 100,
//             },
//             quantity: item.quantity,
//         })),
//         success_url: `${process.env.CLIENT_URL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
//         cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
//         metadata: {
//             order_details: JSON.stringify(items)
//         }
//     })
//     console.log('orderID :', session.id)
//     console.log('orderData :', session.metadata)

//     return session
// }

// const saveOrderDetails = async (sessionId) => {
//     try {
//         const session = await stripe.checkout.sessions.retrieve(sessionId);
//         const orderDetails = JSON.parse(session.metadata.order_details);

//         for (const item of orderDetails) {
            
//             await dbconnect.query(
//                 'INSERT INTO orderitem (orderId, productId, productName, productOpt, quantity, price) VALUES (?, ?, ?, ?, ?, ?)',
//                 [1, item.productId,  item.name, item.size, item.quantity, item.price]
//             );
//             console.log(item.productId)
//         }

//         return { success: true, message: '訂單已成功處理並保存' };
//     } catch (error) {
//         console.error('保存訂單詳情時發生錯誤:', error);
//         return { success: false, message: '保存訂單詳情時發生錯誤' };
//     }
// }

// module.exports = {
//     createCheckoutSession,
//     saveOrderDetails
// }










