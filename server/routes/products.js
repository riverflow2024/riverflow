const express = require('express')
const router = express.Router()
const {
  getProductById,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  removeFavoriteProduct
} = require('../controllers/productController')

// 新增
router.post('/', createProduct)
// 更新
router.put('/:id', updateProduct)
// 刪除
router.delete('/:id', deleteProduct)
// 新增刪除我的最愛的路由
router.delete('/favorite', removeFavoriteProduct)

// 獲取所有產品
router.get('/', getAllProducts)
// 根據ID獲取產品
router.get('/:id', getProductById)

module.exports = router
