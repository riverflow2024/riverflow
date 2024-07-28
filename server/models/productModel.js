const dbConnect = require('./dbConnect')


dbConnect.connect((err) => {
    if (err) throw err
    console.log('Connected to the database')
})


// 取得所有產品
exports.getAllProduct = () => {
    return new Promise((resolve, reject) => {
        dbConnect.query('SELECT * FROM products', (err, products) => {
            if (err) return reject(err);
            resolve(products);
        });
    });
};

// 取得單個產品
exports.getProduct = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query('SELECT * FROM products WHERE productid = ?', [id], (err, product) => {
            if (err) return reject(err);
            resolve(product[0]);
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




//--------------------------------------------------------------------------------------------------------------------



//取得
// exports.getProduct = (req,res) =>{
//     dbConnect.query('SELECT * FROM products WHERE productid = ?',[req.params.id],(err, product) =>{
//         if(err) throw err
//         res.send(product)
//     })
// }

// exports.getAllProduct = (req,res) =>{
//     dbConnect.query('SELECT * FROM products',(err, products) =>{
//         if(err) throw err
//         res.send(products)
//     })
// }


// //新增
// exports.createProduct = (req,res) =>{
//     dbConnect.query('INSERT INTO products SET?',req.body,(err, result) =>{
//         if(err) throw err
//         res.send({message: 'Product created', id: result.insertId})
//     })
// }


// //更新
// exports.updateProduct = (req,res) =>{
//     dbConnect.query('UPDATE products SET? WHERE productid =?',[req.body, req.params.id],(err, result) =>{
//         if(err) throw err
//         res.send({message: 'Product updated', changed: result.changedRows})
//     })
// }
 
// //刪除
// exports.deleteProduct = (req,res) =>{
//     dbConnect.query('DELETE FROM products WHERE productid =?',[req.params.id],(err, result) =>{
//         if(err) throw err
//         res.send({message: 'Product deleted', deleted: result.affectedRows})
//     })
// }