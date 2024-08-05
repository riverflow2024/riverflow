const dbConnect = require('./dbConnect')

// 取得所有產品
exports.getAllProduct = () => {
  return new Promise((resolve, reject) => {
    dbConnect.query(
      `
            SELECT 
            products.productid, productName, 
            categories.categoryName , 
            productoptions.productPrice , productfavorite.userid, 
            users.firstName, users.lastName,
            productimages.productImg
            FROM 
            products, productcategories ,categories, productoptions ,productfavorite, productimages, users
            WHERE 
            products.productid = productcategories.productid  
            AND products.productid =  productoptions.productid
            AND products.productid = productfavorite.productid
            AND products.productid = productimages.productid
            AND productfavorite.userId = users.userId
            `,
      (err, products) => {
        if (err) return reject(err)
        resolve(products)
      }
    )
  })
}

// 取得單個產品
exports.getProduct = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query(
      `
            SELECT 
            *
            FROM 
            products, productcategories ,categories,productoptions ,productratings, productfavorite, productimages
            WHERE 
            products.productid = ? 
            AND products.productid = productcategories.productid 
            AND productcategories.categoryid = categories.categoryid 
            AND products.productid =  productoptions.productid
            AND products.productid = productratings.productid
            AND products.productid = productfavorite.productid
            AND products.productid = productimages.productid
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
