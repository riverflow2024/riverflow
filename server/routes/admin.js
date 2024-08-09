const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')

// 首頁：導引至商品管理列表
router.get('/', (req, res, next) => {
  res.redirect('/riverflow/admin/products')
})

// 商品管理列表
router.get('/products', adminController.getAllProducts)

// 商品訂單管理列表
router.get('/product-orders', adminController.getAllProductOrders)
// 商品訂單詳細資訊
router.get('/product-orders/:orderId', adminController.getProductOrderDetail)
// 更新商品訂單狀態
router.put('/product-orders/:orderId', adminController.updateProductOrderStatus)

// 嘻哈專欄列表
router.get('/news', adminController.getAllNews)
// 嘻哈專欄詳細資訊
router.get('/news/:newsId', adminController.getNewsDetail)

// 活動管理列表
router.get('/events', adminController.getAllEvents)

module.exports = router
