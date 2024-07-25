const express = require('express')
const router = express.Router()

// 假設這些控制器函數已經定義
const { registerUser, loginUser, getUser, updateUser, deleteUser } = require('../controllers/userController')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router
