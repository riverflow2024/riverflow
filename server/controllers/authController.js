const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config({ path: '../config.env' })

// email 傳輸器
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.GMAIL_APP_PASSWORD
//   }
// })
// const transporter = nodemailer.createTransport({
//   host: 'sandbox.smtp.mailtrap.io',
//   port: 2525,
//   auth: {
//     user: 'a69c37440a5f65',
//     pass: '09affb3496ad6d'
//   }
// })

// 發送驗證郵件
// const sendVerificationEmail = async (email, token) => {
//   const verificationUrl = `${process.env.BASE_URL}/verify/${token}`

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: 'riverFlow：驗證帳號',
//     text: `親愛的用戶，您好：

// 請複製並在瀏覽器中打開以下連結以驗證您的帳號:
// ${verificationUrl}

// 如果您沒有註冊 riverFlow 帳號，請忽略此郵件。

// 祝您使用愉快！
// riverFlow 團隊`,
//     html: `
//     <html>
//       <head>
//         <style>
//           body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//           .button { background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; }
//         </style>
//       </head>
//       <body>
//         <h3>親愛的用戶，您好：</h3>
//         <p>請點擊下方按鈕驗證您的帳號:</p>
//         <a href="${verificationUrl}" class="button" style="color: white;">驗證帳號</a>
//         <p>或複製並在瀏覽器中打開以下連結：</p>
//         <p>${verificationUrl}</p>
//         <p>如果您沒有註冊 riverFlow 帳號，請忽略此郵件。</p>
//         <p>祝您使用愉快！<br>riverFlow 團隊</p>
//       </body>
//     </html>
//     `
//   }

//   await transporter.sendMail(mailOptions)
// }

const sendVerificationEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  })

  const verificationUrl = `${process.env.BASE_URL}/verify/${token}`

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'riverFlow：驗證帳號',
    text: `親愛的用戶，您好：

請複製並在瀏覽器中打開以下連結以驗證您的帳號:
${verificationUrl}

如果您沒有註冊 riverFlow 帳號，請忽略此郵件。

祝您使用愉快！
riverFlow 團隊`,
    html: `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .button { background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; }
        </style>
      </head>
      <body>
        <h3>親愛的用戶，您好：</h3>
        <p>請點擊下方按鈕驗證您的帳號:</p>
        <a href="${verificationUrl}" class="button" style="color: white;">驗證帳號</a>
        <p>或複製並在瀏覽器中打開以下連結：</p>
        <p>${verificationUrl}</p>
        <p>如果您沒有註冊 riverFlow 帳號，請忽略此郵件。</p>
        <p>祝您使用愉快！<br>riverFlow 團隊</p>
      </body>
    </html>
    `
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('驗證郵件已發送到:', email)
  } catch (error) {
    console.error('發送驗證郵件時發生錯誤:', error)
    throw error // 重新拋出錯誤，以便在 register 函數中捕獲
  }
}

// 會員註冊
exports.register = async (req, res) => {
  const { email, secret, firstName, lastName } = req.body
  const valid = false
  let userId = null
  let userCreated = false

  try {
    // 檢查是否已存在相同郵箱的用戶
    const existingUser = await userModel.findByEmail(email)
    if (existingUser) {
      return res.status(400).json({ message: '此郵箱已被註冊' })
    }

    // 創建新用戶
    const hashedSecret = await bcrypt.hash(secret, 12)
    userId = await userModel.create(email, hashedSecret, firstName, lastName, valid)
    userCreated = true
    console.log('用戶創建成功，ID:', userId)

    // 生成驗證 token
    const verificationToken = jwt.sign({ userId: userId, email: email }, process.env.JWT_SECRET, { expiresIn: '1d' })

    // 發送驗證郵件
    await sendVerificationEmail(email, verificationToken)

    res.status(201).json({ message: `註冊成功：${firstName + lastName}，請檢查您的郵箱進行驗證` })
  } catch (error) {
    if (userCreated && userId) {
      try {
        const deleted = await userModel.deleteUser(userId)
        if (deleted) {
          console.log('成功刪除未完成註冊的用戶:', userId)
        } else {
          console.error('未能刪除用戶，可能用戶不存在:', userId)
        }
      } catch (deleteError) {
        console.error('刪除用戶時發生錯誤:', deleteError)
      }
    }

    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: '此郵箱已被註冊' })
    } else if (error.code === 'EAUTH') {
      return res.status(500).json({ message: '郵件發送失敗，請稍後再試。已刪除未驗證的帳號。' })
    }

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
