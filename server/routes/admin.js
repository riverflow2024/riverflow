// Author: zhier1114
const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

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
const uploadDirectory = path.join(__dirname, '..', '..', 'client', 'public', 'images', 'news')
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true })
  console.log(`Created upload directory: ${uploadDirectory}`)
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(`目標目錄: ${uploadDirectory}`)
    cb(null, uploadDirectory)
  },
  filename: (req, file, cb) => {
    console.log(`正在上傳檔案: ${file.originalname}`)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } })
// 編輯
router.put('/news/:newsId', upload.single('coverImg'), adminController.editNews)
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
// 編輯器圖片處理
router.post('/news/imgUpload', upload.single('upload'), adminController.createNewsImages)
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
