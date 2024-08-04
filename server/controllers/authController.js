const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config({ path: '../config.env' })

// 會員註冊
exports.register = async (req, res) => {
  const { email, secret, firstName, lastName, sex, phone, birth, userImg } = req.body
  const valid = false
  try {
    const existingUser = await userModel.findByEmail(email)
    if (existingUser) {
      return res.status(400).json({ message: '此郵箱已被註冊' })
    }
    const hashedSecret = await bcrypt.hash(secret, 12)
    const userId = await userModel.create(email, hashedSecret, firstName, lastName, sex, phone, birth, userImg, valid)
    res.status(201).json({ message: '註冊成功', userId })
  } catch (error) {
    console.error('註冊錯誤:', error)
    res.status(500).json({ message: '註冊失敗，請稍後再試' })
  }
}

// 會員登入
exports.login = async (req, res) => {
  const { email, secret } = req.body
  try {
    const user = await userModel.findByEmail(email)

    if (!user) {
      return res.status(401).json({ message: '郵箱或密碼不正確' })
    }

    const isMatch = await bcrypt.compare(secret, user.secret)
    if (!isMatch) {
      return res.status(401).json({ message: '郵箱或密碼不正確' })
    }

    // 確保 user.id 存在
    if (!user.userid) {
      return res.status(500).json({ message: '內部服務器錯誤' })
    }

    // 生成包含 userId 的 token
    const newToken = jwt.sign({ userId: user.userid }, process.env.JWT_SECRET, { expiresIn: '7d' })

    // 記錄生成的 token
    console.log('Generated token payload:', { userId: user.userid })

    res.cookie('token', newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7天
    })

    res.json({ message: '登入成功', userId: user.userid })
  } catch (error) {
    console.error('登入錯誤:', error)
    res.status(500).json({ message: '登入失敗，請稍後再試' })
  }
}

exports.protected = (req, res) => {
  res.json({ message: '這是受保護的路由', userId: req.userId })
}

exports.logout = (req, res) => {
  res.clearCookie('token')
  res.json({ message: '登出成功' })
}
