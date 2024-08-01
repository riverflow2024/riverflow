const express = require('express')
const router = express.Router()

// 假設這些控制器函數已經定義

//product
const {getProductById, getAllProducts , createProduct, updateProduct, deleteProduct} = require('../controllers/productController');

//新增
router.post('/', createProduct)
//更新
router.put('/:id', updateProduct)
//刪除
router.delete('/:id', deleteProduct)
//取得全部
router.get('/',getAllProducts);
//取得單個
router.get('/:id',getProductById);




module.exports = router
