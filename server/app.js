const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const { authenticateToken } = require('./middlewares/auth')

app.use(cookieParser())
app.use(bodyParser.json())

// Routers
const userRoutes = require('./routes/users')
const productRoutes = require('./routes/products')
const eventRoutes = require('./routes/events')
// const orderRoutes = require('./routes/orders')

// Use routes
app.use('/riverflow', require('./routes/public'))
app.use('/riverflow/user', authenticateToken, userRoutes)
app.use('/riverflow/products', productRoutes)
app.use('/riverflow/events', eventRoutes)
// app.use('/riverflow/orders', orderRoutes)

module.exports = app
