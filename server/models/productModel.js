const dbConnect = require('./dbConnect')

// 取得所有產品

exports.getAllProductImg = () => {
  return new Promise((resolve, reject) => {
    dbConnect.query(
      `
        SELECT
        products.productId,products.productName,productimages.productImg
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

exports.getAllProductFavorite = () => {
  return new Promise((resolve, reject) => {
    dbConnect.query(
      `
            SELECT 
            products.productId,products.productName,
            productfavorite.userId,users.firstName,users.lastName
            FROM 
            products , productfavorite ,users
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

exports.getAllProductInfo = () => {
  return new Promise((resolve, reject) => {
    dbConnect.query(
      `
SELECT * 
FROM 
products , productcategories,categories
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

//產品圖
exports.getProductImg = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query(
      `
            SELECT 
            products.productId, products.productName,productimages.productImg
            FROM 
            products, productimages
            WHERE 
            products.productid = ? 
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

// 產品收藏
exports.getProductFavorite = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query(
      `
            SELECT 
            products.productId,products.productName,productfavorite.userId,users.firstName,users.lastName
            FROM 
            products, productfavorite,users
            WHERE 
            products.productid = ? 
            AND products.productid = productfavorite.productid
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

//產品資訊
exports.getProductInfo = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query(
      `
        SELECT
        *
        FROM
        products
        JOIN productcategories ON products.productid = productcategories.productid
        JOIN categories ON productcategories.categoryid = categories.categoryid
        WHERE
        products.productid = ?
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

// exports.getProductInfo = (id) => {
//   return new Promise((resolve, reject) => {
//     dbConnect.query(
//       `
//             SELECT
//             *
//             FROM
//             products, productcategories ,categories
//             WHERE
//             products.productid = 1
//             AND products.productid = productcategories.productid
//             AND productcategories.categoryid = categories.categoryid
//             `,
//       [id],
//       (err, product) => {
//         if (err) return reject(err)
//         resolve(product)
//       }
//     )
//   })
// }

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
    dbConnect.query('UPDATE products SET ? WHERE productid = ?', [productData, id], (err, result) => {
      if (err) return reject(err)
      resolve({ message: 'Product updated', changed: result.changedRows })
    })
  })
}

// 刪除產品
exports.deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query('DELETE FROM products WHERE productid = ?', [id], (err, result) => {
      if (err) return reject(err)
      resolve({ message: 'Product deleted', deleted: result.affectedRows })
    })
  })
}

// 取得單個產品
// exports.getProduct = (id) => {
//   return new Promise((resolve, reject) => {
//     dbConnect.query(
//       `
//             SELECT
//             *
//             FROM
//             products, productcategories ,categories,productoptions ,productratings, productfavorite, productimages
//             WHERE
//             products.productid = ?
//             AND products.productid = productcategories.productid
//             AND productcategories.categoryid = categories.categoryid
//             AND products.productid =  productoptions.productid
//             AND products.productid = productratings.productid
//             AND products.productid = productfavorite.productid
//             AND products.productid = productimages.productid
//             `,
//       [id],
//       (err, product) => {
//         if (err) return reject(err)
//         resolve(product)
//       }
//     )
//   })
// }

// exports.getAllProduct = () => {
//   return new Promise((resolve, reject) => {
//     dbConnect.query(
//       `
//             SELECT
//             products.productid, productName,
//             categories.categoryName ,
//             productoptions.productPrice , productfavorite.userid,
//             users.firstName, users.lastName,
//             productimages.productImg,productoptions.optName
//             FROM
//             products, productcategories ,categories, productoptions ,productfavorite, productimages, users
//             WHERE
//             products.productid = productcategories.productid
//             AND products.productid =  productoptions.productid
//             AND products.productid = productfavorite.productid
//             AND products.productid = productimages.productid
//             AND productfavorite.userId = users.userId
//             `,
//       (err, products) => {
//         if (err) return reject(err)
//         resolve(products)
//       }
//     )
//   })
// }

const dbConnect = require('./dbConnect')

// 取得所有產品

exports.getAllProductImg = () => {
  return new Promise((resolve, reject) => {
    dbConnect.query(
      `
        SELECT
        products.productId,products.productName,productimages.productImg
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

exports.getAllProductFavorite = () => {
  return new Promise((resolve, reject) => {
    dbConnect.query(
      `
            SELECT 
            products.productId,products.productName,
            productfavorite.userId,users.firstName,users.lastName
            FROM 
            products , productfavorite ,users
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

exports.getAllProductInfo = () => {
  return new Promise((resolve, reject) => {
    dbConnect.query(
      `
SELECT * 
FROM 
products , productcategories,categories
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

//產品圖
exports.getProductImg = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query(
      `
            SELECT 
            products.productId, products.productName,productimages.productImg
            FROM 
            products, productimages
            WHERE 
            products.productid = ? 
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

// 產品收藏
exports.getProductFavorite = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query(
      `
            SELECT 
            products.productId,products.productName,productfavorite.userId,users.firstName,users.lastName
            FROM 
            products, productfavorite,users
            WHERE 
            products.productid = ? 
            AND products.productid = productfavorite.productid
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

//產品資訊
exports.getProductInfo = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query(
      `
            SELECT 
            *
            FROM 
            products, productcategories ,categories 
            WHERE 
            products.productid = ? 
            AND products.productid = productcategories.productid 
            AND productcategories.categoryid = categories.categoryid 
            `,
      [id],
      (err, product) => {
        if (err) return reject(err)
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
    dbConnect.query('UPDATE products SET ? WHERE productid = ?', [productData, id], (err, result) => {
      if (err) return reject(err)
      resolve({ message: 'Product updated', changed: result.changedRows })
    })
  })
}

// 刪除產品
exports.deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query('DELETE FROM products WHERE productid = ?', [id], (err, result) => {
      if (err) return reject(err)
      resolve({ message: 'Product deleted', deleted: result.affectedRows })
    })
  })
}

// 取得單個產品
// exports.getProduct = (id) => {
//   return new Promise((resolve, reject) => {
//     dbConnect.query(
//       `
//             SELECT
//             *
//             FROM
//             products, productcategories ,categories,productoptions ,productratings, productfavorite, productimages
//             WHERE
//             products.productid = ?
//             AND products.productid = productcategories.productid
//             AND productcategories.categoryid = categories.categoryid
//             AND products.productid =  productoptions.productid
//             AND products.productid = productratings.productid
//             AND products.productid = productfavorite.productid
//             AND products.productid = productimages.productid
//             `,
//       [id],
//       (err, product) => {
//         if (err) return reject(err)
//         resolve(product)
//       }
//     )
//   })
// }

// exports.getAllProduct = () => {
//   return new Promise((resolve, reject) => {
//     dbConnect.query(
//       `
//             SELECT
//             products.productid, productName,
//             categories.categoryName ,
//             productoptions.productPrice , productfavorite.userid,
//             users.firstName, users.lastName,
//             productimages.productImg,productoptions.optName
//             FROM
//             products, productcategories ,categories, productoptions ,productfavorite, productimages, users
//             WHERE
//             products.productid = productcategories.productid
//             AND products.productid =  productoptions.productid
//             AND products.productid = productfavorite.productid
//             AND products.productid = productimages.productid
//             AND productfavorite.userId = users.userId
//             `,
//       (err, products) => {
//         if (err) return reject(err)
//         resolve(products)
//       }
//     )
//   })
// }
