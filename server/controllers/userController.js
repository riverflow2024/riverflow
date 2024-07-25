// const User = require('../models/userModel') // 假設你有一個 User 模型
const dbConnect = require('../models/dbConnect')

// exports.registerUser = async (req, res) => {
//   try {
//     const newUser = new User(req.body)
//     const savedUser = await newUser.save()
//     res.status(201).json(savedUser)
//   } catch (error) {
//     res.status(400).json({ error: error.message })
//   }
// }

// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body
//     const user = await User.findOne({ email })

//     if (!user || !(await user.comparePassword(password))) {
//       return res.status(401).json({ message: 'Invalid email or password' })
//     }

//     res.json({ message: 'Login successful', user })
//   } catch (error) {
//     res.status(500).json({ error: error.message })
//   }
// }

// exports.getUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId)
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' })
//     }
//     res.json(user)
//   } catch (error) {
//     res.status(500).json({ error: error.message })
//   }
// }

// exports.updateUser = async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' })
//     }
//     res.json(user)
//   } catch (error) {
//     res.status(500).json({ error: error.message })
//   }
// }

// exports.deleteUser = async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.userId)
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' })
//     }
//     res.json({ message: 'User deleted' })
//   } catch (error) {
//     res.status(500).json({ error: error.message })
//   }
// }

exports.getUser = (req, res) => {
  dbConnect.query('SELECT * FROM Users WHERE userid = ?', [req.params.id], (err, result) => {
    if (err) throw err
    res.send(result)
  })
}

exports.registerUser = (req, res) => {
  dbConnect.query('INSERT INTO Users(')
  res.send('User registered')
}

exports.loginUser = (req, res) => {
  // 這裡應該有實際的登入邏輯
  res.send('User logged in')
}

exports.updateUser = (req, res) => {
  // 這裡應該有實際的更新邏輯
  res.send('User updated')
}

exports.deleteUser = (req, res) => {
  // 這裡應該有實際的刪除邏輯
  res.send('User deleted')
}
