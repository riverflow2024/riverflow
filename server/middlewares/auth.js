const jwt = require('jsonwebtoken')
require('dotenv').config({ path: '../config.env' })

exports.authenticateToken = (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ message: '需要認證' })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: '無效的token' })
    }

    if (!decoded.userId) {
      return res.status(401).json({ message: 'Token 無效：缺少用戶ID' })
    }
    req.userId = decoded.userId
    next()
  })
}
