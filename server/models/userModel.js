const db = require('./dbConnect')

// 建立帳號
exports.create = async (email, password, firstName, lastName, sex, phone, birth, userImg, valid) => {
  try {
    const results = await db.query(
      'INSERT INTO Users ( email, secret, firstName, lastName, sex, phone, birth, userImg, valid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [email, password, firstName, lastName, sex, phone, birth, userImg, valid]
    )
    return results[0]
  } catch (error) {
    console.error('創建用戶錯誤:', error)
    throw error
  }
}

// Email確認
exports.findByEmail = async (email) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM Users WHERE email = ?', [email], (error, results) => {
      if (error) {
        console.error('查詢用戶錯誤:', error)
        return reject(error)
      }
      resolve(results.length > 0 ? results[0] : null)
    })
  })
}

// 如果需要添加更多的用戶相關方法，可以繼續使用這種模式
exports.findById = (userId) => {
  return new Promise((resolve, reject) => {
    if (!userId) {
      reject(new Error('User ID is required'))
      return
    }

    db.query('SELECT * FROM Users WHERE userid = ?', [userId], (error, results) => {
      if (error) {
        reject(error)
        return
      }
      if (results.length === 0) {
        resolve(null)
      } else {
        resolve(results[0])
      }
    })
  })
}

// 示例：更新用戶信息的方法
exports.updateUser = async (id, updateData) => {
  try {
    const [result] = await db.query('UPDATE users SET ? WHERE id = ?', [updateData, id])
    return result.affectedRows > 0
  } catch (error) {
    console.error('更新用戶錯誤:', error)
    throw error
  }
}
