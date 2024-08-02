const dbConnect = require('./dbConnect')


dbConnect.connect((err) => {
    if (err) throw err
    console.log('Connected to the database')
})


// 取得所有產品
exports.getAllProduct = () => {
    return new Promise((resolve, reject) => {
        dbConnect.query(`
            SELECT 
            products.productid, productName, productcategories.categoryid, categories.categoryName , productoptions.productPrice , productfavorite.userid
            FROM 
            products, productcategories ,categories, productoptions ,productfavorite, productimages
            WHERE 
            products.productid = productcategories.productid 
            AND productcategories.categoryid = categories.categoryid    
            AND products.productid =  productoptions.productid
            AND products.productid = productfavorite.productid
            AND products.productid = productimages.productid
            `, (err, products) => { 
            if (err) return reject(err);
            resolve(products);
        });
    });
};

// 取得單個產品
exports.getProduct = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query(`
            SELECT 
            *
            FROM 
            products, productcategories ,categories,productoptions ,productratings, productfavorite
            WHERE 
            products.productid = ? 
            AND products.productid = productcategories.productid 
            AND productcategories.categoryid = categories.categoryid 
            AND products.productid =  productoptions.productid
            AND products.productid = productratings.productid
            AND products.productid = productfavorite.productid
                        AND productfavorite.userid = 1
            `, [id], (err, product) => {
            if (err) return reject(err);
            resolve(product);
        });
    });
};


// 新增產品
exports.createProduct = (productData) => {
    return new Promise((resolve, reject) => {
        dbConnect.query('INSERT INTO products SET ?', productData, (err, result) => {
            if (err) return reject(err);
            resolve({ message: 'Product created', id: result.insertId });
        });
    });
};

// 更新產品
exports.updateProduct = (id, productData) => {
    return new Promise((resolve, reject) => {
        dbConnect.query('UPDATE products SET ? WHERE productid = ?', [productData, id], (err, result) => {
            if (err) return reject(err);
            resolve({ message: 'Product updated', changed: result.changedRows });
        });
    });
};

// 刪除產品
exports.deleteProduct = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query('DELETE FROM products WHERE productid = ?', [id], (err, result) => {
            if (err) return reject(err);
            resolve({ message: 'Product deleted', deleted: result.affectedRows });
        });
    });
};
