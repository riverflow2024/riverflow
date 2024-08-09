const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
const { authenticateToken } = require('./middlewares/auth')
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser())
app.use(bodyParser.json())
<<<<<<< HEAD
app.use(bodyParser.urlencoded({ extended: true }));
=======
app.use(express.urlencoded({ extended: true }))
app.use(cors())
>>>>>>> 72e4107251f012ca72d369be59cf93b95e97e405

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
app.use('/riverflow/test',function(req, res, next) {
    res.send('Test Page')
})

// app.use('/riverflow/cart', cartRoutes)

<<<<<<< HEAD
app.use('/riverflow/events/Tobuy', eventTobuyRoutes)
=======
app.use('/riverflow/events/Tobuy', authenticateToken, eventTobuyRoutes)
>>>>>>> 72e4107251f012ca72d369be59cf93b95e97e405
// app.use('/riverflow/orders', orderRoutes)

module.exports = app
