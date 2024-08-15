const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')
const app = express()
require('dotenv').config({ path: '../config.env' })

const { authenticateToken } = require('./middlewares/auth')
const { adminAuthenticateToken } = require('./middlewares/adminAuth')
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  cors({
    origin: `http://localhost:${process.env.CLIENT_PORT}`,
    credentials: true // 带憑證的请求
  })
)

// Routers

const userRoutes = require('./routes/users')
const productRoutes = require('./routes/products')
const eventRoutes = require('./routes/events')
const eventTobuyRoutes = require('./routes/eventTobuy')
// const paymentRoutes = require('./routes/paymentRoutes')
const stripeRoutes = require('./routes/stripe')
const cartRoutes = require('./routes/cartRoutes')
// const cartRoutes = require('./routes/cart')
// const orderRoutes = require('./routes/orders')
const adminRoutes = require('./routes/admin')




// Use routes
app.use('/riverflow', require('./routes/public'))
app.use('/riverflow/user', authenticateToken, userRoutes)
app.use('/riverflow/products', productRoutes)
app.use('/riverflow/events', eventRoutes)
// app.use('/riverflow/payment',paymentRoutes)
app.use('/riverflow/pay',authenticateToken, stripeRoutes)
app.use('/riverflow/cart',authenticateToken, cartRoutes)

app.use('/riverflow/events/Tobuy', eventTobuyRoutes)
// app.use('/riverflow/orders', orderRoutes)

// backstage routes
app.use('/riverflow/admin', adminAuthenticateToken, adminRoutes)

module.exports = app
