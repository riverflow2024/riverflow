const express = require('express')
const router = express.Router()

const { registerUser, loginUser, getUser, updateUser, deleteUser } = require('../controllers/userController')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/:id', getUser)
router.put('/edit', updateUser)
router.delete('/delete', deleteUser)

module.exports = router
