const db = require('./dbConnect')

// 建立帳號
exports.create = async (email, hashedSecret, firstName, lastName, valid) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO Users (email, secret, firstName, lastName, valid) VALUES (?, ?, ?, ?, ?)',
      [email, hashedSecret, firstName, lastName, valid],
      (error, results) => {
        if (error) {
          console.error('創建用戶時發生數據庫錯誤:', error)
          reject(error)
        } else {
          resolve(results.insertId)
        }
      }
    )
  })
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

// 透過id得到用戶資料
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

// 更新密碼
exports.updatePassword = async (userId, hashedPassword) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE Users SET secret =? WHERE userId =?', [hashedPassword, userId], (error, result) => {
      if (error) {
        console.error('密碼更新失敗:', error)
        reject(error)
      } else {
        resolve(result.affectedRows > 0)
      }
    })
  })
}

// 刪除帳號（創建帳號失敗）
exports.deleteUser = async (userId) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM Users WHERE userId = ?', [userId], (error, result) => {
      if (error) {
        console.error('帳號刪除失敗:', error)
        reject(error)
      } else {
        console.log('刪除結果:', result)
        resolve(result.affectedRows > 0)
      }
    })
  })
}

// 會員商品訂單
exports.findAllOrders = async (userId) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT o.orderId, o.totalPrice, o.orderStatus, o.payMethod, o.createdAt FROM Users AS u, `Order` AS o WHERE u.userId = o.userId AND u.userId = ?',
      [userId],
      (error, results) => {
        if (error) {
          console.error('查詢商品失敗:', error)
          reject(error)
        } else {
          resolve(results)
        }
      }
    )
  })
}

// 會員商品訂單明細
exports.findOneOrder = async (userId, orderId) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT o.orderId, o.totalPrice, o.orderStatus, o.payMethod, o.createdAt, o.rcptName, o.rcptPhone, o.rcptAddr, o.shipMethod, o.convAddr, oi.productName, oi.productOpt, oi.quantity, oi.quantity FROM Users AS u, `Order` AS o, OrderItem AS oi WHERE u.userId = o.userId AND u.userId = ? AND o.orderId = oi.orderId AND o.orderId = ?',
      [userId, orderId],
      (error, results) => {
        if (error) {
          console.error('查詢商品失敗:', error)
          reject(error)
        } else {
          resolve(results)
        }
      }
    )
  })
}

// 會員購票訂單
exports.findUserEvents = async (userId) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT td.tdId, td.ticketType, td.quantity, td.tdStatus, td.tdPrice, td.randNum, e.eventName, e.eventDate FROM Users AS u, TicketDetails AS td, Events AS e WHERE u.userId = td.userId AND u.userId = ? Order BY e.eventId',
      [userId],
      (error, results) => {
        if (error) {
          console.error('查詢購票訂單失敗:', error)
          reject(error)
        } else {
          resolve(results)
        }
      }
    )
  })
}
// 'SELECT e.eventId, e.eventName, e.eventDate, e.eventTime, e.eventPrice, e.eventDesc, COUNT(t.ticketId) AS soldQuantity, e.maxTickets - COUNT(t.ticketId) AS remainingQuantity FROM Events AS e LEFT JOIN Tickets AS t ON e.eventId = t.eventId WHERE e.eventDate >= CURDATE() GROUP BY e.eventId'

// 會員最愛商品
exports.findFavorites = async (userId) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT p.productName, p.productDesc, p.productPrice, pi.productImg FROM Users AS u 
      JOIN ProductFavorite AS pf ON u.userId = pf.userId 
      JOIN Products AS p ON pf.productId = p.productId
      LEFT JOIN (
        SELECT productId, MIN(productImg) as productImg FROM ProductImages GROUP BY productId
      ) pi ON p.productId = pi.productId
      WHERE u.userId = ?`,
      [userId],
      (error, results) => {
        if (error) {
          console.error('查詢最愛商品失敗:', error)
          reject(error)
        } else {
          resolve(results)
        }
      }
    )
  })
}

exports.findFavoritesImg = async (userId) => {}
