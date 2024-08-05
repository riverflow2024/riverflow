const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')
// const { authenticateToken } = require('../middlewares/auth')

// router.get('/', userController.getUserInfo)
router.get(
  '/',
  (req, res, next) => {
    console.log(req.header)

    console.log('Entering /riverflow/user route, userId:', req.userId)
    next()
  },
  userController.getUserInfo
)
router.post('/register', authController.register)
// router.post('/login', authController.login)
router.get('/protected', authController.protected)

module.exports = router
