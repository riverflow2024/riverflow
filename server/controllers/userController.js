// const { getUser, createUser, updateUser, deleteUser } = require('../models/userModel')
// // const dbConnect = require('../models/dbConnect')

// // exports.registerUser = async (req, res) => {
// //   try {
// //     const newUser = new User(req.body)
// //     const savedUser = await newUser.save()
// //     res.status(201).json(savedUser)
// //   } catch (error) {
// //     res.status(400).json({ error: error.message })
// //   }
// // }

// // exports.loginUser = async (req, res) => {
// //   try {
// //     const { email, password } = req.body
// //     const user = await User.findOne({ email })

// //     if (!user || !(await user.comparePassword(password))) {
// //       return res.status(401).json({ message: 'Invalid email or password' })
// //     }

// //     res.json({ message: 'Login successful', user })
// //   } catch (error) {
// //     res.status(500).json({ error: error.message })
// //   }
// // }

// // exports.getUser = async (req, res) => {
// //   try {
// //     const user = await User.findById(req.params.userId)
// //     if (!user) {
// //       return res.status(404).json({ message: 'User not found' })
// //     }
// //     res.json(user)
// //   } catch (error) {
// //     res.status(500).json({ error: error.message })
// //   }
// // }

// // exports.updateUser = async (req, res) => {
// //   try {
// //     const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
// //     if (!user) {
// //       return res.status(404).json({ message: 'User not found' })
// //     }
// //     res.json(user)
// //   } catch (error) {
// //     res.status(500).json({ error: error.message })
// //   }
// // }

// // exports.deleteUser = async (req, res) => {
// //   try {
// //     const user = await User.findByIdAndDelete(req.params.userId)
// //     if (!user) {
// //       return res.status(404).json({ message: 'User not found' })
// //     }
// //     res.json({ message: 'User deleted' })
// //   } catch (error) {
// //     res.status(500).json({ error: error.message })
// //   }
// // }

// // exports.getUser = (req, res) => {
// //   dbConnect.query('SELECT * FROM Users WHERE userid = ?', [req.params.id], (err, result) => {
// //     if (err) throw ('getUser Failed', err)
// //     res.send(result)
// //   })
// // }

// // exports.registerUser = (req, res) => {
// //   dbConnect.query(
// //     'INSERT INTO Users (email, secret, firstName, lastName, sex, phone, valid) VALUES (?, ?, ?, ?, ?, ?, ?)',
// //     [
// //       req.body.email,
// //       req.body.secret,
// //       req.body.firstName,
// //       req.body.lastName,
// //       req.body.sex,
// //       req.body.phone,
// //       req.body.valid
// //     ]
// //   )
// //   res.send('User registered Successfully')
// // }

// // exports.loginUser = (req, res) => {
// //   dbConnect.query(
// //     'SELECT * FROM Users WHERE email = ? AND secret = ?',
// //     [req.body.email, req.body.secret],
// //     (err, result) => {
// //       console.log(result)
// //       if (err) throw ('loginUser Failed', err)
// //       if (result.length === 0) {
// //         res.send('Invalid email or password')
// //       } else {
// //         res.send('Login successful')
// //       }
// //     }
// //   )
// // }

// // exports.updateUser = (req, res) => {
// //   const { firstName, lastName, sex, phone, email } = req.body

// //   dbConnect.beginTransaction((err) => {
// //     if (err) {
// //       return res.status(500).send('Transaction error: ' + err)
// //     }

// //     dbConnect.query('SELECT * FROM Users WHERE email=?', [email], (selectErr, results) => {
// //       if (selectErr) {
// //         return dbConnect.rollback(() => {
// //           res.status(500).send('Select error: ' + selectErr)
// //         })
// //       }

// //       if (results.length === 0) {
// //         return dbConnect.rollback(() => {
// //           res.status(404).send('User not found')
// //         })
// //       }

// //       dbConnect.query(
// //         'UPDATE Users SET firstName=?, lastName=?, sex=?, phone=? WHERE email=?',
// //         [firstName, lastName, sex, phone, email],
// //         (updateErr, updateResults) => {
// //           if (updateErr) {
// //             return dbConnect.rollback(() => {
// //               res.status(500).send('Update error: ' + updateErr)
// //             })
// //           }

// //           dbConnect.commit((commitErr) => {
// //             if (commitErr) {
// //               return dbConnect.rollback(() => {
// //                 res.status(500).send('Commit error: ' + commitErr)
// //               })
// //             }
// //             res.send(`User ${firstName} ${lastName} updated successfully`)
// //           })
// //         }
// //       )
// //     })
// //   })
// // }

// // exports.deleteUser = (req, res) => {
// //   dbConnect.beginTransaction((err) => {
// //     if (err) {
// //       return res.status(500).send('Transaction error: ' + err)
// //     }

// //     dbConnect.query('SELECT * FROM Users WHERE email=?', [req.body.email], (selectErr, results) => {
// //       if (selectErr) {
// //         return dbConnect.rollback(() => {
// //           res.status(500).send('Select error: ' + selectErr)
// //         })
// //       }

// //       if (results.length === 0) {
// //         return dbConnect.rollback(() => {
// //           res.status(404).send('User not found')
// //         })
// //       }

// //       // 刪除用戶
// //       dbConnect.query('DELETE FROM Users WHERE email=?', [req.body.email], (deleteErr, deleteResults) => {
// //         if (deleteErr) {
// //           return dbConnect.rollback(() => {
// //             res.status(500).send('Delete error: ' + deleteErr)
// //           })
// //         }

// //         dbConnect.commit((commitErr) => {
// //           if (commitErr) {
// //             return dbConnect.rollback(() => {
// //               res.status(500).send('Commit error: ' + commitErr)
// //             })
// //           }
// //           res.send(`User with email ${req.body.email} deleted successfully`)
// //         })
// //       })
// //     })
// //   })
// // }

// // 獲取單個用戶
// exports.getUser = async(req, res, next) => {
//   try {
//     const user = await getUser(req.params.id)
//     if (!user) {
//       return res.status(404).json({
//         status: 'fail',
//         message: 'No user found with that ID'
//       })
//     }
//     res.status(200).json({
//       status: 'success',
//       data: {
//         user
//       }
//     })
//   } catch (err) {
//     next(err)
//   }
// }

// // 新增用戶
// exports.createUser = async(req, res, next) => {
//   try {
//     const newUser = await createUser(req.body)
//     res.status(201).json({
//       status: 'success',
//       data: {
//         user: newUser
//       }
//     })
//   } catch (err) {
//     next(err)
//   }
// }

// // 更新當前用戶
// exports.updateMe = async(req, res, next) => {
//   try {
//     if (req.body.password || req.body.passwordConfirm) {
//       return res.status(400).json({
//         status: 'fail',
//         message: 'This route is not for password updates. Please use /updateMyPassword.'
//       })
//     }

//     const filteredBody = filterObj(req.body, 'name', 'email')
//     if (req.file) filteredBody.photo = req.file.filename

//     const updatedUser = await updateUser(req.user.id, filteredBody)

//     res.status(200).json({
//       status: 'success',
//       data: {
//         user: updatedUser
//       }
//     })
//   } catch (err) {
//     next(err)
//   }
// }

// // 刪除當前用戶（軟刪除）
// exports.deleteMe = async(req, res, next) => {
//   try {
//     await deleteUser(req.user.id)
//     res.status(204).json({
//       status: 'success',
//       data: null
//     })
//   } catch (err) {
//     next(err)
//   }
// }

const userModel = require('../models/userModel')

// 查詢單一用戶資料
exports.getUserInfo = async (req, res) => {
  console.log('req.userId in getUserInfo:', req.userId)
  try {
    // req.userId 已經由認證中間件設置
    const user = await userModel.findById(req.userId)
    if (!user) {
      return res.status(404).json({ message: '用戶不存在' })
    }

    // 返回用戶信息，但排除敏感數據
    const { secret, ...userInfo } = user
    res.json(userInfo)
  } catch (error) {
    console.error('獲取會員信息錯誤:', error)
    res.status(500).json({ message: '獲取會員信息失敗' })
  }

  //   res.json({
  //     id: user.id,
  //     email: user.email,
  //     firstName: user.firstName,
  //     lastName: user.lastName,
  //     phone: user.phone,
  //     birth: user.birth,
  //     sex: user.sex,
  //     photo: user.photo
  //   })
  // } catch (error) {
  //   console.error('獲取會員信息錯誤:', error)
  //   res.status(500).json({ message: '獲取會員信息失敗，請稍後再試' })
  // }
}
