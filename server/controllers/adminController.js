// Author: zhier1114
const adminModel = require('../models/adminModel')
const dbConnect = require('../models/dbConnect')
const util = require('util')
const multer = require('multer')
const { JSDOM } = require('jsdom')
const fs = require('fs').promises
const path = require('path')

// 商品

// 列表
exports.getAllProducts = async (req, res) => {
  try {
    const allProducts = await adminModel.getAllProducts()
    const productCategories = await adminModel.getProductCategories()

    const results = allProducts.map((product) => {
      const options = JSON.parse(product.productOpt)
      const totalStock = options.reduce((sum, option) => sum + option.stock, 0)

      const categories = productCategories
        .filter((category) => category.productId === product.productId)
        .map((category) => category.categoryName)

      return { ...product, categories, totalStock }
    })

    res.json(results)
  } catch (err) {
    console.error('取得所所有商品資訊：', err)
    res.status(500).json({ message: err.message })
  }
}
// 詳細內容
exports.getProductDetail = async (req, res) => {
  try {
    const productId = req.params.productId
    const product = await adminModel.getProductDetail(productId)
    if (!product) {
      return res.status(404).json({ message: '找不到該商品' })
    }
    const productImages = await adminModel.getProductImages(productId)
    product.images = productImages.map((image) => image.productImg)
    const productCategories = await adminModel.getOneProductCategory(productId)
    product.categories = productCategories.map((category) => category.categoryName)

    res.json({ product })
  } catch (err) {
    console.error('取得商品詳細內容失敗：', err)
    res.status(500).json({ message: err.message })
  }
}
// 下架
exports.removeProduct = async (req, res) => {
  try {
    const removed = await adminModel.removeProduct(req.params.productId)
    if (removed) {
      res.json({ message: '商品已下架' })
    } else {
      res.status(404).json({ message: '找不到商品' })
    }
  } catch (err) {
    console.error('下架商品失敗：', err)
    res.status(500).json({ message: err.message })
  }
}
// 上架
exports.launchProduct = async (req, res) => {
  try {
    const launched = await adminModel.launchProduct(req.params.productId)
    if (launched) {
      res.json({ message: '商品已上架' })
    } else {
      res.status(404).json({ message: '找不到商品' })
    }
  } catch (err) {
    console.error('上架商品失敗：', err)
    res.status(500).json({ message: err.message })
  }
}
// 搜尋
exports.searchProducts = async (req, res) => {
  try {
    const searchKeyword = req.query.keyword
    const searchProduct = await adminModel.searchProducts(searchKeyword)
    const productIds = searchProduct.map((product) => product.productId)
    const categories = await adminModel.getProductCategories(productIds)

    const searchResult = searchProduct.map((product) => {
      const productCategories = categories
        .filter((cat) => cat.productId === product.productId)
        .map((cat) => cat.categoryName)
      return { ...product, categories: productCategories }
    })

    res.json(searchResult)
  } catch (err) {
    console.error('搜尋商品失敗：', err)
    res.status(500).json({ message: err.message })
  }
}
// 新增
exports.createProduct = async (req, res) => {
  const query = util.promisify(dbConnect.query).bind(dbConnect)
  try {
    const repeatedProduct = await adminModel.searchProductName(req.body.productName)
    if (repeatedProduct) {
      return res.status(400).json({ message: '商品已存在' })
    }

    // 開始事務
    await query('START TRANSACTION')

    try {
      const productId = await adminModel.createProduct(req.body)
      console.log(productId)

      if (!productId) {
        throw new Error('建立商品失敗')
      }

      for (const categoryId of req.body.productCategories) {
        await adminModel.createProductCategories(productId, categoryId)
      }

      for (const productImg of req.body.productImgs) {
        await adminModel.createProductImages(productId, productImg)
      }

      // 提交事務
      await query('COMMIT')
      res.status(201).json({ message: '商品已建立', productId })
    } catch (err) {
      // 如果出現錯誤，回滾事務
      await query('ROLLBACK')
      throw err
    }
  } catch (err) {
    console.error('建立商品失敗：', err)
    res.status(500).json({ message: '建立失敗', error: err.message })
  }
}
// 刪除
exports.deleteProduct = async (req, res) => {
  try {
    const result = await adminModel.deleteProduct(req.params.productId)

    if (result.success) {
      res.json({ message: '商品已刪除' })
    } else {
      res.status(500).json({ message: '刪除失敗，資料已還原', error: result.error })
    }
  } catch (err) {
    console.error('刪除商品失敗：', err)
    res.status(500).json({ message: '刪除失敗，還原資料也失敗', error: err.message })
  }
}

// 商品訂單

// 列表
exports.getAllProductOrders = async (req, res) => {
  try {
    const productOrders = await adminModel.getAllProductOrders()
    res.json(productOrders)
  } catch (err) {
    console.error('取得所有商品訂單錯誤：', err)
    res.status(500).json({ message: err.message })
  }
}
// 詳細資訊
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
// 更新狀態
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
// 搜尋
exports.searchProductOrders = async (req, res) => {
  try {
    const searchKeyword = req.query.keyword

    const searchProductOrder = await adminModel.searchProductOrders(searchKeyword)
    res.json(searchProductOrder)
  } catch (err) {
    console.error('商品訂單搜尋失敗：', err)
    res.status(500).json({ message: err.message })
  }
}

// 嘻哈專欄

// 列表
exports.getAllNews = async (req, res) => {
  try {
    const allNews = await adminModel.getAllNews()
    res.json(allNews)
  } catch (err) {
    console.error('文章取得失敗：', err)
    res.status(500).json({ message: err.message })
  }
}
// 詳細內容
exports.getNewsDetail = async (req, res) => {
  try {
    const newsDetail = await adminModel.getNewsDetail(req.params.newsId)
    res.json(newsDetail)
  } catch (err) {
    console.error('文章取得失敗：', err)
    res.status(500).json({ message: err.message })
  }
}
// 下架
exports.removeNews = async (req, res) => {
  try {
    const removed = await adminModel.removeNews(req.params.newsId)
    if (!removed) {
      return res.status(404).json({ message: '找不到此文章' })
    }
    res.json({ message: '文章已下架' })
  } catch (err) {
    console.error('文章下架失敗：', err)
    res.status(500).json({ message: err.message })
  }
}
// 上架
exports.launchNews = async (req, res) => {
  try {
    const launched = await adminModel.launchNews(req.params.newsId)
    if (!launched) {
      return res.status(404).json({ message: '找不到此文章' })
    }
    res.json({ message: '文章已上架' })
  } catch (err) {
    console.error('文章上架失敗：', err)
    res.status(500).json({ message: err.message })
  }
}
// 搜尋
exports.searchNews = async (req, res) => {
  try {
    const keyword = req.query.keyword || req.query.search // 添加備選參數名稱
    if (!keyword) {
      return res.redirect('riverflow/admin/news')
    }
    const searchNews = await adminModel.searchNews(keyword)

    res.json(searchNews)
  } catch (err) {
    console.error('搜尋商品失敗：', err)
    res.status(500).json({ message: err.message })
  }
}
// 新增
exports.createNews = async (req, res) => {
  const projectRoot = path.join(__dirname, '..', '..')
  const uploadDirectory = path.join(projectRoot, 'client', 'src', 'assets', 'images', 'news')

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDirectory)
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  })

  const fileFilter = (req, file, cb) => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png']
    const ext = path.extname(file.originalname).toLowerCase()
    if (allowedExtensions.includes(ext)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type. Only JPG, JPEG AND PNG are allowed.'))
    }
  }

  const upload = multer({ storage, fileFilter }).single('coverImg')

  // 處理CKEditor內容中的圖片
  async function processBase64Images(content) {
    const dom = new JSDOM(content)
    const images = dom.window.document.querySelectorAll('img')

    for (let img of images) {
      if (img.src.startsWith('data:image')) {
        const base64Data = img.src.split(',')[1]
        const buffer = Buffer.from(base64Data, 'base64')
        const filename = 'image-' + Date.now() + '.png'
        const filepath = path.join(uploadDirectory, filename)

        await fs.writeFile(filepath, buffer)

        img.src = `/assets/images/news/${filename}`
      }
    }
    return dom.window.document.body.innerHTML
  }

  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: 'File upload error: ' + err.message })
    } else if (err) {
      return res.status(400).json({ message: err.message })
    }

    try {
      const { newsTitle, newsType, newsAuthor, newsContent, pubTime } = req.body

      // 解析 JSON 格式的 newsContent
      // const parsedContent = JSON.parse(newsContent)

      // 處理封面圖片
      const coverImgFilename = req.file ? req.file.filename : null

      // 處理編輯器內容
      const processedContent = await processBase64Images(newsContent)

      // 判斷 pubTime 和設置 newsStatus
      const currentTime = new Date()
      let newsStatus = 1
      let finalPubTime = null

      if (pubTime && new Date(pubTime) > currentTime) {
        newsStatus = 0
        finalPubTime = new Date(pubTime)
      }

      // 準備要插入資料庫的數據
      const newsData = {
        newsTitle,
        newsType,
        newsAuthor,
        newsContent: processedContent,
        coverImg: coverImgFilename,
        pubTime: finalPubTime,
        newsStatus
      }

      const created = await adminModel.createNews(newsData)

      if (!created) {
        return res.status(500).json({ message: '建立文章失敗' })
      }

      res.status(201).json({ message: '文章已建立', newsId: created.insertId })
    } catch (err) {
      console.error('建立文章失敗：', err)
      res.status(500).json({ message: err.message })
    }
  })
}
// 新增：圖片處理
exports.createNewsImages = async (req, res) => {
  const projectRoot = path.join(__dirname, '..', '..')
  const uploadDirectory = path.join(projectRoot, 'client', 'src', 'assets', 'images', 'news')
  if (!req.file) {
    return res.status(400).send({ error: 'No file uploaded' })
  }
  const imageUrl = `${uploadDirectory}/${req.file.filename}`

  res.status(200).json({ url: imageUrl })
}
// 刪除
exports.deleteNews = async (req, res) => {
  try {
    const deleted = await adminModel.deleteNews(req.params.newsId)
    if (!deleted) {
      return res.status(404).json({ message: '找不到此文章' })
    }
    res.json({ message: '文章已刪除' })
  } catch (err) {
    console.error('文章刪除失敗：', err)
    res.status(500).json({ message: err.message })
  }
}

// 活動售票

// 列表
exports.getAllEvents = async (req, res) => {
  try {
    const allEvents = await adminModel.getAllEvents()
    res.json(allEvents)
  } catch (err) {
    console.error('活動列表取得失敗：', err)
    res.status(500).json({ message: err.message })
  }
}
// 詳細內容
exports.getEventDetail = async (req, res) => {
  try {
    const eventDetail = await adminModel.getEventDetail(req.params.eventId)
    res.json(eventDetail)
  } catch (err) {
    console.error('活動取得失敗：', err)
    res.status(500).json({ message: err.message })
  }
}
// 下架
exports.removeEvent = async (req, res) => {
  try {
    const removed = await adminModel.removeEvent(req.params.eventId)
    if (!removed) {
      return res.status(404).json({ message: '找不到此活動' })
    }
    res.json({ message: '活動已下架' })
  } catch (err) {
    console.error('活動下架失敗：', err)
    res.status(500).json({ message: err.message })
  }
}
// 上架
exports.launchEvent = async (req, res) => {
  try {
    const launched = await adminModel.launchEvent(req.params.eventId)
    if (!launched) {
      return res.status(404).json({ message: '找不到此活動' })
    }
    res.json({ message: '活動已上架' })
  } catch (err) {
    console.error('活動上架失敗：', err)
    res.status(500).json({ message: err.message })
  }
}
// 搜尋
exports.searchEvents = async (req, res) => {
  try {
    const searchEvents = await adminModel.searchEvents(req.query.keyword)

    res.json(searchEvents)
  } catch (err) {
    console.error('搜尋活動失敗：', err)
    res.status(500).json({ message: err.message })
  }
}
// 新增
exports.createEvent = async (req, res) => {
  const query = util.promisify(dbConnect.query).bind(dbConnect)

  // 開始事務
  await query('START TRANSACTION')
  try {
    const result = await adminModel.createEvent(req.body)
    if (!result || !result.insertId) {
      await query('ROLLBACK')
      return res.status(500).json({ message: '建立活動失敗' })
    }
    const eventId = result.insertId

    for (const { eventImg, imgType } of req.body.eventImgs) {
      await adminModel.createEventImages(eventId, eventImg, imgType)
    }

    // 提交事務
    await query('COMMIT')
    res.status(201).json({ message: '活動已建立', eventId: eventId.insertId })
  } catch (err) {
    // 如果出現錯誤，回滾事務
    await query('ROLLBACK')
    console.error('建立活動時發生錯誤:', err)
    res.status(500).json({ message: '建立活動失敗', error: err.message })
  }
}
// 刪除
exports.deleteEvent = async (req, res) => {
  const query = util.promisify(dbConnect.query).bind(dbConnect)
  // 開始事務
  await query('START TRANSACTION')
  try {
    const eventId = req.params.eventId
    const deleteEventImages = await adminModel.deleteEventImages(eventId)
    if (!deleteEventImages) {
      console.error('該活動無照片')
    }
    const deletedEvents = await adminModel.deleteEvent(eventId)
    if (!deletedEvents) {
      await query('ROLLBACK')
      res.status(500).json({ message: '活動刪除失敗' })
    }
    // 提交事務
    await query('COMMIT')
    res.status(200).json({ message: '活動已刪除' })
  } catch (err) {
    console.error('活動刪除失敗：', err)
    res.status(500).json({ message: err.message })
  }
}

// 活動訂單

// 列表
exports.getAllEventOrders = async (req, res) => {
  try {
    const allOrders = await adminModel.getAllEventOrders()
    res.json(allOrders)
  } catch (err) {
    console.error('活動訂單列表取得失敗：', err)
    res.status(500).json({ message: err.message })
  }
}
// 搜尋
exports.searchEventOrders = async (req, res) => {
  try {
    const searchOrders = await adminModel.searchEventOrders(req.query.keyword)

    res.json(searchOrders)
  } catch (err) {
    console.error('搜尋活動訂單失敗：', err)
    res.status(500).json({ message: err.message })
  }
}
// 詳細內容
exports.getEventOrderDetail = async (req, res) => {
  try {
    const orderDetail = await adminModel.getEventOrderDetail(req.params.orderId)
    res.json(orderDetail)
  } catch (err) {
    console.error('活動訂單取得失敗：', err)
    res.status(500).json({ message: err.message })
  }
}
// 更新狀態
exports.updateEventOrderStatus = async (req, res) => {
  try {
    const updated = await adminModel.updateEventOrderStatus(req.params.orderId, req.body.tdStatus)
    if (!updated) {
      return res.status(404).json({ message: '找不到此活動訂單' })
    }
    res.json({ message: '活動訂單狀態已更新' })
  } catch (err) {
    console.error('活動訂單狀態更新失敗：', err)
    res.status(500).json({ message: err.message })
  }
}
