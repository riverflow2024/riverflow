const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')
// const { authenticateToken } = require('../middlewares/auth')

router.get(
  '/',
  (req, res, next) => {
    next()
  },
  userController.getUserInfo
)
router.put(
  '/update',
  (req, res, next) => {
    next()
  },
  userController.updateUserInfo
)
// router.post('/login', authController.login)

module.exports = router
