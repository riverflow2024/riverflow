const db = require('./dbConnect')

// 建立帳號
exports.create = async (email, password, firstName, lastName, valid) => {
  try {
    const results = await db.query(
      'INSERT INTO Users ( email, secret, firstName, lastName, valid) VALUES (?, ?, ?, ?, ?)',
      [email, password, firstName, lastName, valid]
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

// 信箱驗證完成
exports.updateValidStatus = (userId, status) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE Users SET valid = ? WHERE userId = ?', [status, userId], (error, result) => {
      if (error) {
        console.error('更新驗證狀態錯誤:', error)
        return reject(error)
      }
      resolve(result.affectedRows > 0)
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

    db.query('SELECT * FROM Users WHERE userId = ?', [userId], (error, results) => {
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

// 更新資料
exports.updateUser = async (userId, updateData) => {
  Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key])

  try {
    return new Promise((resolve, reject) => {
      db.query('UPDATE Users SET ? WHERE userId = ?', [updateData, userId], (error, result) => {
        if (error) {
          console.error('SQL 執行錯誤:', error)
          reject(error)
        } else {
          resolve(result.affectedRows > 0)
        }
      })
    })
  } catch (error) {
    console.error('更新用戶錯誤:', error)
    throw error
  }
}
