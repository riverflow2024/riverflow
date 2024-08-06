const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.post('/user/register', authController.register)
router.get('/verify/:token', authController.verifyEmail)
router.post('/user/login', authController.login)
router.get('/user/logout', authController.logout)
router.post('/user/reset', authController.requestPasswordReset)
router.get('/reset-password/:token', authController.resetPasswordPage)
router.post('/reset-password/:token/send', authController.resetPassword)

module.exports = router
