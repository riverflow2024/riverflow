const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.post('/user/register', authController.register)
router.get('/verify/:token', authController.verifyEmail)
router.post('/user/login', authController.login)
router.get('/user/logout', authController.logout)
router.get('/reset-password', authController.resetPasswordPage) // 忘記密碼：輸入帳號（前端頁面）
router.post('/reset-password', authController.requestPasswordReset) // 輸入email，發送驗證信
router.get('/reset-password/:token', authController.setNewPasswordPage) // 輸入新密碼（前端頁面）
router.post('/reset-password/:token', authController.resetPassword) // 驗證後儲存新密碼

module.exports = router
