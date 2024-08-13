const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
const dbconnect = require('./dbConnect')


const createCheckoutSession = async (items) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: items.map(item => ({
            price_data: {
                currency: 'twd',
                product_data: {
                    name: `${item.name}`,
                    description: `尺寸: ${item.size}`
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
    })

    // const orderId = session.id;
    // for (const item of items) {
    //     await db.query(
    //         'INSERT INTO orders (id, item_name, price, quantity, size) VALUES (?, ?, ?, ?, ?)',
    //         [orderId, item.name, item.price, item.quantity, item.size]
    //     );
    // }

    console.log('orderID :', session.id)
    console.log('orderData :', session.metadata)

    return session
}

const saveOrderDetails = async (sessionId) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        const orderDetails = JSON.parse(session.metadata.order_details);

        for (const item of orderDetails) {
            await dbconnect.query(
                'INSERT INTO orderitem (orderId, productId, productName, productOpt, quantity, price) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [1, 1,  item.name, item.size, item.quantity, item.price]
            );
        }

        return { success: true, message: '訂單已成功處理並保存' };
    } catch (error) {
        console.error('保存訂單詳情時發生錯誤:', error);
        return { success: false, message: '保存訂單詳情時發生錯誤' };
    }
}

module.exports = {
    createCheckoutSession,
    saveOrderDetails
}



// const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

// const createCheckoutSession = async (items) => {
//     const session = await stripe.checkout.sessions.create({
//         payment_method_types: ['card'],
//         mode: 'payment',
//         line_items: items.map(item => ({
//             price_data: {
//                 currency: 'twd',
//                 product_data: {
//                     name: item.name,
//                 },
//                 unit_amount: item.price,
//             },
//             quantity: item.quantity,
//         })),
//         success_url: `${process.env.CLIENT_URL}/success.html`,
//         cancel_url: `${process.env.CLIENT_URL}/cancel.html`
//     })

//     const orderId = session.id;
//     for (const item of items) {
//         await db.query(
//             'INSERT INTO orders (id, item_name, price, quantity) VALUES (?, ?, ?, ?)',
//             [orderId, item.name, item.price, item.quantity]
//         );
//     }

//     console.log(session)
//     return session
// }

// module.exports = {
//     createCheckoutSession
// }









