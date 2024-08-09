const db = require('./dbConnect')

// 管理者登入
// exports.adminLogin = ()

// 商品
// 商品列表
exports.getAllProducts = async () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT p.productId, p.productName, p.productPrice, p.productStatus, pi.productImg FROM products AS p 
        LEFT JOIN (SELECT productId, MIN(productImg) as productImg FROM ProductImages GROUP BY productId) 
        pi ON p.productId = pi.productId`,
      (error, results) => {
        if (error) {
          console.error('取得所有商品資訊失敗:', error)
          reject(error)
        } else {
          resolve(results)
        }
      }
    )
  })
}
// 商品類別
exports.getProductCategories = async () => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT ProductCategories.productId, Categories.categoryName FROM ProductCategories, Categories WHERE ProductCategories.categoryId = Categories.categoryId ORDER BY ProductCategories.productId',
      (error, results) => {
        if (error) {
          console.error('取得所有分類失��:', error)
          reject(error)
        } else {
          resolve(results)
        }
      }
    )
  })
}

// 商品訂單
// 列表
exports.getAllProductOrders = async () => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT o.orderId, CONCAT(u.firstName, "", u.lastName) AS name , o.rcptPhone, o.totalPrice, o.payMethod, o.orderStatus FROM `Order` AS o, Users AS u WHERE o.userId = u.userId',
      (error, results) => {
        if (error) {
          console.error('取得所有商品資訊失敗:', error)
          reject(error)
        } else {
          resolve(results)
        }
      }
    )
  })
}
// 資訊
exports.getProductOrderDetail = async (orderId) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT o.createdAt, CONCAT(u.firstName, "", u.lastName), u.sex, u.email, u.phone, o.totalPrice, o.payMethod, o.orderStatus, o.receiptType, o.receiptInfo, o.rcptName, o.rcptPhone, o.rcptAddr, o.shipMethod, o.convAddr, o.orderRemark, o.backRemark, o.orderStatus FROM `Order` AS o, Users AS u WHERE o.orderId = 1 AND o.userId = u.userId',
      [orderId],
      (error, results) => {
        if (error) {
          console.error('取得商品訂單詳細資訊錯誤:', error)
          reject(error)
        } else {
          resolve(results)
        }
      }
    )
  })
}
// 選項
exports.getProductOrderOptions = async (orderId) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT oi.productName, oi.productOpt, oi.quantity FROM `Order` AS o, OrderItem AS oi WHERE o.orderId = oi.orderId AND o.orderId = ?',
      [orderId],
      (error, results) => {
        if (error) {
          console.error('取得商品訂單選項錯誤:', error)
          reject(error)
        } else {
          resolve(results)
        }
      }
    )
  })
}
// 更新
exports.updateProductOrderStatus = async (orderId, orderStatus, backRemark) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE `Order` SET orderStatus = ?, backRemark = ? WHERE orderId = ?',
      [orderStatus, backRemark, orderId],
      (error, results) => {
        if (error) {
          console.error('更新訂單狀態錯誤:', error)
          reject(error)
        } else {
          resolve(results)
        }
      }
    )
  })
}

// 嘻哈專欄
// 列表
exports.getAllNews = async () => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT n.newsId, n.newsType, n.newsTitle, n.newsAuthor, n.createdAt, n.newsStatus FROM News AS n ORDER BY n.createdAt DESC',
      (error, results) => {
        if (error) {
          console.error('取得嘻哈專欄錯誤:', error)
          reject(error)
        } else {
          resolve(results)
        }
      }
    )
  })
}
// 內容
exports.getNewsDetail = async (newsId) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM News AS n WHERE n.newsId = ?', [newsId], (error, results) => {
      if (error) {
        console.error('取得文章內容錯誤:', error)
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

// 活動售票
// 列表
exports.getAllEvents = async () => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT e.eventId, e.eventType, e.eventName, e.eventDate, e.saleDate, e.seat, e.launchStatus FROM Events AS e',
      (error, results) => {
        if (error) {
          console.error('取得活動售票錯誤:', error)
          reject(error)
        } else {
          resolve(results)
        }
      }
    )
  })
}
