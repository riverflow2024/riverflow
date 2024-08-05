const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const dotenv = require('dotenv')
dotenv.config({ path: '../config.env' })

// email 傳輸器
// const transporter = nodemailer.transporter({
//   service: 'gmail',
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_PASSWORD
//   }
// })
const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'a69c37440a5f65',
    pass: '09affb3496ad6d'
  }
})

// 驗證網址
const generateVerificationToken = () => {
  return crypto.randomBytes(20).toString('hex')
}

// 發送驗證郵件
const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.BASE_URL}/verify/${token}`

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: '請驗證您的帳號',
    html: `請點擊以下連結驗證您的帳號: <a href="${verificationUrl}">${verificationUrl}</a>`
  }

  await transporter.sendMail(mailOptions)
}

// 會員註冊
exports.register = async (req, res) => {
  const { email, secret, firstName, lastName } = req.body
  const valid = false
  try {
    const existingUser = await userModel.findByEmail(email)
    if (existingUser) {
      return res.status(400).json({ message: '此郵箱已被註冊' })
    }
    const hashedSecret = await bcrypt.hash(secret, 12)
    const userId = await userModel.create(email, hashedSecret, firstName, lastName, valid)

    // 信箱驗證 token
    const verificationToken = jwt.sign({ userId: userId, email: email }, process.env.JWT_SECRET, { expiresIn: '1d' })
    await sendVerificationEmail(email, verificationToken)

    res.status(201).json({ message: `註冊成功：${firstName + lastName}，請檢查您的郵箱進行驗證` })
  } catch (error) {
    console.error('註冊錯誤:', error)
    res.status(500).json({ message: '註冊失敗，請稍後再試' })
  }
}

// 驗證信箱
exports.verifyEmail = async (req, res) => {
  const { token } = req.params
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await userModel.findByEmail(decoded.email)
    if (!user) {
      return res.status(400).json({ message: '無效的驗證令牌' })
    }
    await userModel.updateValidStatus(user.userId, true)
    res.json({ message: '郵箱驗證成功' })
  } catch (error) {
    console.error('驗證錯誤:', error)
    if (error.name === 'TokenExpiredError') {
      res.status(400).json({ message: '驗證連結已過期，請重新註冊' })
    } else {
      res.status(500).json({ message: '驗證失敗，請稍後再試' })
    }
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

    if (!user.valid) {
      return res.status(401).json({ message: '請先至信箱內進行驗證' })
    }

    const isMatch = await bcrypt.compare(secret, user.secret)
    if (!isMatch) {
      return res.status(401).json({ message: '郵箱或密碼不正確' })
    }

    if (!user.userId) {
      return res.status(500).json({ message: '內部服務器錯誤' })
    }

    const newToken = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '7d' })

    res.cookie('token', newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7天
    })

    res.json({ message: '登入成功', userId: user.userId })
  } catch (error) {
    console.error('登入錯誤:', error)
    res.status(500).json({ message: '登入失敗，請稍後再試' })
  }
}

// 會員登出
exports.logout = (req, res) => {
  res.clearCookie('token')
  res.json({ message: '登出成功' })
}
