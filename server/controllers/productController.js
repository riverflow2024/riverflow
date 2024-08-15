const productModel = require('../models/productModel')

// 取得所有產品
const getAllProducts = async (req, res) => {
  try {
    // const userId = req.userId;
    // console.log(userId)
    // const { productid , userid } = req.body;
    // const createCart = await getProduct(pro)

    const getAllProductImg = await productModel.getAllProductImg()
    const getAllProductFavorite = await productModel.getAllProductFavorite()
    const getAllProductInfo = await productModel.getAllProductInfo()

    const products = {
      getAllProductInfo,
      getAllProductImg,
      getAllProductFavorite
    }
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message + 'aaa' })
  }
}

// 取得單個產品
const getProductById = async (req, res) => {
  try {
    const productImg = await productModel.getProductImg(req.params.id)
    const productFavorite = await productModel.getProductFavorite(req.params.id)
    const productInfo = await productModel.getProductInfo(req.params.id)

    const product = {
      productImg,
      productFavorite,
      productInfo
    }

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// 新增產品
const createProduct = async (req, res) => {
  try {
    const newProduct = await productModel.createProduct(req.body)
    res.status(201).json(newProduct)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// 更新產品
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await productModel.updateProduct(req.params.id, req.body)
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json(updatedProduct)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// 刪除產品
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await productModel.deleteProduct(req.params.id)
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json({ message: 'Product deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
}
