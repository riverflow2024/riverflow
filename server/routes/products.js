const express = require('express')
const router = express.Router()

// 假設這些控制器函數已經定義

const {
  getProductById,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController')

// const {getProduct, getAllProduct , createProduct, updateProduct, deleteProduct} = require('../models/productModel');

// router.get('/', getAllProduct);
// router.get('/:id',getProduct)

router.post('/', createProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

router.get('/', getAllProducts)
router.get('/:id', getProductById)
module.exports = router
