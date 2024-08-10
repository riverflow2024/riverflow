const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const createCheckoutSession = async (items) => {
    return await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: items.map(item => ({
            price_data: {
                currency: 'twd',
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price,
            },
            quantity: item.quantity,
        })),
        success_url: `${process.env.CLIENT_URL}/success.html`,
        cancel_url: `${process.env.CLIENT_URL}/cancel.html`
    })
}

module.exports = {
    createCheckoutSession
}