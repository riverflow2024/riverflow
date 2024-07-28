const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

// Routers
const userRoutes = require('./routes/users')
const productRoutes = require('./routes/products');
// const productRoutes = require('./routes/products')
// const orderRoutes = require('./routes/orders')

// Use routes
app.use('/riverflow/user', userRoutes)
app.use('/riverflow/products', productRoutes)
// app.use('/riverflow/products', productRoutes)
// app.use('/riverflow/orders', orderRoutes)

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })


module.exports = app
