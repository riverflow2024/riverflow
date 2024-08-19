const dbConnect = require('./dbConnect')

// 取得所有產品圖片
exports.getAllProductImg = () => {
  return new Promise((resolve, reject) => {
    dbConnect.query(
      `
        SELECT
        products.productId, products.productName, productimages.productImg
        FROM products, productimages
        WHERE products.productId = productimages.productId
      `,
      (err, products) => {
        if (err) return reject(err)
        resolve(products)
      }
    )
  })
}

// 取得所有產品收藏
exports.getAllProductFavorite = () => {
  return new Promise((resolve, reject) => {
    dbConnect.query(
      `
        SELECT 
        products.productId, products.productName,
        productfavorite.userId, users.firstName, users.lastName
        FROM 
        products, productfavorite, users
        WHERE products.productId = productfavorite.productId
        AND productfavorite.userId = users.userId
        ORDER BY products.productId, users.userId
      `,
      (err, products) => {
        if (err) return reject(err)
        resolve(products)
      }
    )
  })
}

// 取得所有產品資訊
exports.getAllProductInfo = () => {
  return new Promise((resolve, reject) => {
    dbConnect.query(
      `
        SELECT * 
        FROM 
        products, productcategories, categories
        WHERE products.productId = productcategories.productId
        AND productcategories.categoryId = categories.categoryId
      `,
      (err, products) => {
        if (err) return reject(err)
        resolve(products)
      }
    )
  })
}

// 選取單個產品
//------------------------------------------------------------------------------------------------

// 取得單個產品圖片
exports.getProductImg = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query(
      `
        SELECT 
        products.productId, products.productName, productimages.productImg
        FROM 
        products, productimages
        WHERE 
        products.productId = ? 
        AND products.productId = productimages.productId
      `,
      [id],
      (err, product) => {
        if (err) return reject(err)
        resolve(product)
      }
    )
  })
}

// 取得單個產品收藏
exports.getProductFavorite = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query(
      `
        SELECT 
        products.productId, products.productName, productfavorite.userId, users.firstName, users.lastName
        FROM 
        products, productfavorite, users
        WHERE 
        products.productId = ? 
        AND products.productId = productfavorite.productId
        AND users.userId = productfavorite.userId
      `,
      [id],
      (err, product) => {
        if (err) return reject(err)
        resolve(product)
      }
    )
  })
}

// 取得單個產品資訊
exports.getProductInfo = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query(
      `
        SELECT 
        *
        FROM 
        products, productcategories, categories 
        WHERE 
        products.productId = ? 
        AND products.productId = productcategories.productId 
        AND productcategories.categoryId = categories.categoryId 
      `,
      [id],
      (err, product) => {
        if (err) {
          console.error('Database query error:', err)
          return reject(err)
        }
        resolve(product)
      }
    )
  })
}

// 新增產品
exports.createProduct = (productData) => {
  return new Promise((resolve, reject) => {
    dbConnect.query('INSERT INTO products SET ?', productData, (err, result) => {
      if (err) return reject(err)
      resolve({ message: 'Product created', id: result.insertId })
    })
  })
}

// 更新產品
exports.updateProduct = (id, productData) => {
  return new Promise((resolve, reject) => {
    dbConnect.query('UPDATE products SET ? WHERE productId = ?', [productData, id], (err, result) => {
      if (err) return reject(err)
      resolve({ message: 'Product updated', changed: result.changedRows })
    })
  })
}

// 刪除產品
exports.deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query('DELETE FROM products WHERE productId = ?', [id], (err, result) => {
      if (err) return reject(err)
      resolve({ message: 'Product deleted', deleted: result.affectedRows })
    })
  })
}

// 刪除我的最愛中的產品 0819 lahok++
exports.removeFavoriteProduct = async (productId, userId) => {
  const query = 'DELETE FROM ProductFavorite WHERE productId = ? AND userId = ?'
  dbConnect.query(query, [productId, userId], (err, result) => {
    if (err) {
      console.error('Database query error:', err)
      return false
    }
    return result.affectedRows > 0
  })
}

// 取得單個產品（完整資訊）
// exports.getProduct = (id) => {
//   return new Promise((resolve, reject) => {
//     dbConnect.query(
//       `
//         SELECT
//         *
//         FROM
//         products, productcategories, categories, productoptions, productratings, productfavorite, productimages
//         WHERE
//         products.productId = ?
//         AND products.productId = productcategories.productId
//         AND productcategories.categoryId = categories.categoryId
//         AND products.productId = productoptions.productId
//         AND products.productId = productratings.productId
//         AND products.productId = productfavorite.productId
//         AND products.productId = productimages.productId
//       `,
//       [id],
//       (err, product) => {
//         if (err) return reject(err)
//         resolve(product)
//       }
//     )
//   })
// }

// 取得所有產品（完整資訊）
// exports.getAllProduct = () => {
//   return new Promise((resolve, reject) => {
//     dbConnect.query(
//       `
//         SELECT
//         products.productId, productName,
//         categories.categoryName ,
//         productoptions.productPrice, productfavorite.userId,
//         users.firstName, users.lastName,
//         productimages.productImg, productoptions.optName
//         FROM
//         products, productcategories, categories, productoptions, productfavorite, productimages, users
//         WHERE
//         products.productId = productcategories.productId
//         AND products.productId = productoptions.productId
//         AND products.productId = productfavorite.productId
//         AND products.productId = productimages.productId
//         AND productfavorite.userId = users.userId
//       `,
//       (err, products) => {
//         if (err) return reject(err)
//         resolve(products)
//       }
//     )
//   })
// }
