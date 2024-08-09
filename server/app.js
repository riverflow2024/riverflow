const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path');
const cors = require('cors')
const app = express()


const { authenticateToken } = require('./middlewares/auth')
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Routers

const userRoutes = require('./routes/users')
const productRoutes = require('./routes/products')
const eventRoutes = require('./routes/events')
const eventTobuyRoutes = require('./routes/eventTobuy')
const paymentRoutes = require('./routes/paymentRoutes');
// const cartRoutes = require('./routes/cart')
// const orderRoutes = require('./routes/orders')




// Use routes
app.use('/riverflow', require('./routes/public'))
app.use('/riverflow/user', authenticateToken, userRoutes)
app.use('/riverflow/products', productRoutes)
app.use('/riverflow/events', eventRoutes)
app.use('/riverflow/ecpay',paymentRoutes)
// app.use('/riverflow/cart', cartRoutes)


app.use('/riverflow/events/Tobuy', eventTobuyRoutes)
// app.use('/riverflow/orders', orderRoutes)

module.exports = app
