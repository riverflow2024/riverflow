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
const eventDetailRoutes = require('./routes/eventdetails')
const eventTobuyRoutes = require('./routes/eventTobuy')

// const orderRoutes = require('./routes/orders')

// Use routes
app.use('/riverflow', require('./routes/public'))
app.use('/riverflow/user', authenticateToken, userRoutes)
app.use('/riverflow/products', productRoutes)
app.use('/riverflow/events', eventRoutes)
app.use('/riverflow/events/details', eventDetailRoutes)

app.use('/riverflow/events/Tobuy',authenticateToken, eventTobuyRoutes)
// app.use('/riverflow/orders', orderRoutes)

module.exports = app
