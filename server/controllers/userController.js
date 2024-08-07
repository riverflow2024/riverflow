const userModel = require('../models/userModel')

// 會員中心首頁：顯示會員資料
exports.getUserInfo = async (req, res) => {
  try {
    // req.userId 已經由認證中間件設置
    const user = await userModel.findById(req.userId)
    if (!user) {
      return res.status(404).json({ message: '用戶不存在' })
    }

    // 返回用戶信息，但排除敏感數據
    const { secret, ...userInfo } = user
    res.json(userInfo)
  } catch (error) {
    console.error('獲取會員信息錯誤:', error)
    res.status(500).json({ message: '獲取會員信息失敗' })
  }
}

// 更新會員資料
exports.updateUserInfo = async (req, res) => {
  const { firstName, lastName, sex, phone, birth, userImg } = req.body
  try {
    const updated = await userModel.updateUser(req.userId, { firstName, lastName, sex, phone, birth, userImg })
    if (!updated) {
      return res.status(404).json({ message: '用戶不存在或未更新任何資料' })
    }
    res.json({ message: '更新成功' })
  } catch (error) {
    console.error('更新失敗:', error)
    res.status(500).json({ message: '更新失敗', error: error.message })
  }
}

// 會員商品訂單
exports.getAllOrders = async (req, res) => {
  try {
    const allOrder = await userModel.findAllOrders(req.userId)
    res.json(allOrder)
  } catch (err) {
    console.error('獲取商品訂單失敗：', err)
    res.status(500).json({ message: err.message })
  }
}

// 會員商品訂單明細
exports.getOneOrder = async (req, res) => {
  try {
    console.log('req.userId:', req.userId, 'req.params:', req.params)

    const oneOrder = await userModel.findOneOrder(req.userId, req.params.orderId)
    res.json(oneOrder)
  } catch (err) {
    console.error('獲取商品訂單失敗：', err)
    res.status(500).json({ message: err.message })
  }
}

// 會員購票訂單
exports.getUserEvent = async (req, res) => {
  try {
    const allEvents = await userModel.findUserEvents(req.userId)
    res.json(allEvents)
  } catch (err) {
    console.error('獲取購票訂單失敗：', err)
    res.status(500).json({ message: err.message })
  }
}

// 會員最愛商品
exports.getFavorites = async (req, res) => {
  try {
    const favorites = await userModel.findFavorites(req.userId)
    console.log(favorites)

    const processData = (data) => {
      return data.map((data) => {
        const productOpt = JSON.parse(data.productOpt)

        const firstOption = productOpt[0]

        return {
          productName: data.productName,
          productOpt: firstOption.name,
          price: firstOption.price
        }
      })
    }
    const favoriteData = processData(favorites)
    console.log(favoriteData)

    res.json(favoriteData)
  } catch (err) {
    console.error('獲取最愛商品失敗：', err)
    res.status(500).json({ message: err.message })
  }
}
