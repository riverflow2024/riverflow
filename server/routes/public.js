const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.post('/user/register', authController.register)
router.get('/verify/:token', authController.verifyEmail)
router.post('/user/login', authController.login)
router.get('/user/logout', authController.logout)

module.exports = router
