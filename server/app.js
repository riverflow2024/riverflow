const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

// Routers
const userRoutes = require('./routes/users')
const productRoutes = require('./routes/products');
const eventRoutes = require('./routes/events')
// const orderRoutes = require('./routes/orders')

// Use routes
app.use('/riverflow/user', userRoutes)
app.use('/riverflow/products', productRoutes)
app.use('/riverflow/events', eventRoutes)
// app.use('/riverflow/orders', orderRoutes)

module.exports = app
