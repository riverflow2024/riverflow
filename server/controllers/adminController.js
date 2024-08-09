const adminModel = require('../models/adminModel')

// 商品

// 商品管理列表
exports.getAllProducts = async (req, res) => {
  try {
    const allProducts = await adminModel.getAllProducts()
    const productCategories = await adminModel.getProductCategories()

    const productsWithCategories = allProducts.map((product) => {
      const categories = productCategories
        .filter((category) => category.productId === product.productId)
        .map((category) => category.categoryName)

      return { ...product, categories }
    })

    res.json(productsWithCategories)
  } catch (err) {
    console.error('取得所所有商品資訊：', err)
    res.status(500).json({ message: err.message })
  }
}
// 商品訂單管理列表
exports.getAllProductOrders = async (req, res) => {
  try {
    const productOrders = await adminModel.getAllProductOrders()
    res.json(productOrders)
  } catch (err) {
    console.error('取得所有商品訂單錯誤：', err)
    res.status(500).json({ message: err.message })
  }
}
// 商品訂單詳細資訊
exports.getProductOrderDetail = async (req, res) => {
  try {
    const productOrderDetail = await adminModel.getProductOrderDetail(req.params.orderId)
    const productOrderOptions = await adminModel.getProductOrderOptions(req.params.orderId)
    const optionString = productOrderOptions.map(
      (option) => `${option.productName} - ${option.productOpt} x ${option.quantity}`
    )
    productOrderDetail[0].options = optionString

    res.json(productOrderDetail)
  } catch (err) {
    console.error('取得商品訂單資訊失敗：', err)
    res.status(500).json({ message: err.message })
  }
}
// 更新商品訂單狀態
exports.updateProductOrderStatus = async (req, res) => {
  try {
    const updated = await adminModel.updateProductOrderStatus(
      req.params.orderId,
      req.body.orderStatus,
      req.body.backRemark
    )

    if (!updated) {
      return res.status(404).json({ message: '找不到此筆訂單' })
    }

    res.json({ message: '更新成功' })
  } catch (err) {
    console.error('更新訂單狀態失敗：', err)
    res.status(500).json({ message: err.message })
  }
}

// 嘻哈專欄

// 嘻哈專欄列表
exports.getAllNews = async (req, res) => {
  try {
    const allNews = await adminModel.getAllNews()
    res.json(allNews)
  } catch (err) {
    console.error('文章取得失敗：', err)
    res.status(500).json({ message: err.message })
  }
}
// 嘻哈專欄詳細內容
exports.getNewsDetail = async (req, res) => {
  try {
    const newsDetail = await adminModel.getNewsDetail(req.params.newsId)
    res.json(newsDetail)
  } catch (err) {
    console.error('文章取得失敗：', err)
    res.status(500).json({ message: err.message })
  }
}

// 活動售票

// 活動列表
exports.getAllEvents = async (req, res) => {
  try {
    const allEvents = await adminModel.getAllEvents()
    res.json(allEvents)
  } catch (err) {
    console.error('活動列表取得失敗：', err)
    res.status(500).json({ message: err.message })
  }
}
