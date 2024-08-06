const userModel = require('../models/userModel')

// 會員中心首頁：顯示會員資料
exports.getUserInfo = async (req, res) => {
  console.log('req.userId in getUserInfo:', req.userId)
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
