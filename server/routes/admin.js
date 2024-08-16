// Author: zhier1114
const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')

// 首頁：導引至商品管理列表
router.get('/', (req, res, next) => {
  res.redirect('/riverflow/admin/products')
})

// 商品

// 列表
router.get('/products', adminController.getAllProducts)
// 搜尋
router.get('/products/search', adminController.searchProducts)
// 詳細內容
router.get('/products/:productId', adminController.getProductDetail)
// 下架
router.put('/products/:productId/remove', adminController.removeProduct)
// 上架
router.put('/products/:productId/launch', adminController.launchProduct)
// 檢視
router.get('/products/:productId/review', (req, res) => {
  const productId = req.params.productId
  res.redirect(`/riverflow/products/${productId}`)
})
// 新增
router.post('/products/create', adminController.createProduct)
// 刪除
router.delete('/products/:productId/delete', adminController.deleteProduct)

// 商品訂單

// 列表
router.get('/product-orders', adminController.getAllProductOrders)
// 搜尋
router.get('/product-orders/search', adminController.searchProductOrders)
// 詳細內容
router.get('/product-orders/:orderId', adminController.getProductOrderDetail)
// 更新狀態
router.put('/product-orders/:orderId', adminController.updateProductOrderStatus)

// 嘻哈專欄

// 列表
router.get('/news', adminController.getAllNews)
// 搜尋
router.get(`/news/search`, adminController.searchNews)
// 詳細內容
router.get('/news/:newsId', adminController.getNewsDetail)
// 下架
router.put('/news/:newsId/remove', adminController.removeNews)
// 上架
router.put('/news/:newsId/launch', adminController.launchNews)
// 檢視
router.get('/news/:newsId/review', (req, res) => {
  const newsId = req.params.newsId
  res.redirect(`/riverflow/news/${newsId}`)
})
// 新增
router.post('/news/create', adminController.createNews)
// 刪除
router.delete('/news/:newsId', adminController.deleteNews)

// 活動售票

// 列表
router.get('/events', adminController.getAllEvents)
// 搜尋
router.get('/events/search', adminController.searchEvents)
// 詳細內容
router.get('/events/:eventId', adminController.getEventDetail)
// 下架
router.put('/events/:eventId/remove', adminController.removeEvent)
// 上架
router.put('/events/:eventId/launch', adminController.launchEvent)
// 檢視
router.get('/events/:eventId/review', (req, res) => {
  const eventId = req.params.eventId
  res.redirect(`/riverflow/events/${eventId}`)
})
// 新增
router.post('/events/create', adminController.createEvent)
// 刪除
router.delete('/events/:eventId', adminController.deleteEvent)

// 活動訂單

// 列表
router.get('/event-orders', adminController.getAllEventOrders)
// 搜尋
router.get('/event-orders/search', adminController.searchEventOrders)
// 詳細內容
router.get('/event-orders/:orderId', adminController.getEventOrderDetail)
// 更新狀態
router.put('/event-orders/:orderId', adminController.updateEventOrderStatus)

module.exports = router
