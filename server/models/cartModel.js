const dbconnect = require('./dbConnect');

// 將 query 轉換為 Promise
const queryPromise = (sql, params) => {
  return new Promise((resolve, reject) => {
    dbconnect.query(sql, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

exports.addToCart = (userId, productId, quantity, productName, productOpt, price) => {
  let cartId;

  return queryPromise('SELECT cartId FROM cart WHERE userId = ?', [userId])
    .then((cartResult) => {
      if (cartResult.length === 0) {
        return queryPromise('INSERT INTO cart (userId) VALUES (?)', [userId])
          .then((newCart) => {
            cartId = newCart.insertId;
            return cartId;
          });
      } else {
        cartId = cartResult[0].cartId;
        return cartId;
      }
    })
    .then(() => {
      return queryPromise(
        'SELECT ciid FROM cartitem WHERE cartId = ? AND productId = ?',
        [cartId, productId]
      );
    })
    .then((existingItem) => {
      if (existingItem.length > 0) {
        return queryPromise(
          'UPDATE cartitem SET quantity = quantity + ? WHERE ciid = ?',
          [quantity, existingItem[0].ciid]
        ).then(() => ({ success: true, cartItemId: existingItem[0].ciid }));
      } else {
        return queryPromise(
          'INSERT INTO cartitem (cartId, productId, productName, productOpt, quantity, price) VALUES (?, ?, ?, ?, ?, ?)',
          [cartId, productId, productName, productOpt, quantity, price]
        ).then((result) => ({ success: true, cartItemId: result.insertId }));
      }
    })
    .catch(error => {
      console.error('Error in addToCart:', error);
      throw error;
    });
};

exports.getCart = (userId) => {
  return queryPromise('SELECT cartId FROM cart WHERE userId = ?', [userId])
    .then((cartResult) => {
      if (cartResult.length === 0) {
        return [];
      }
      const cartId = cartResult[0].cartId;
      return queryPromise(
        `SELECT ciid, productId, productName, productOpt, quantity, price
         FROM cartitem
         WHERE cartId = ?`,
        [cartId]
      );
    })
    .catch(error => {
      console.error('Error in getCart:', error);
      throw error;
    });
};

exports.updateCartItem = (ciid, quantity) => {
  return queryPromise(
    'UPDATE cartitem SET quantity = ? WHERE ciid = ?',
    [quantity, ciid]
  )
    .then(() => ({ success: true }))
    .catch(error => {
      console.error('Error in updateCartItem:', error);
      throw error;
    });
};

exports.removeFromCart = (ciid) => {
  return queryPromise('DELETE FROM cartitem WHERE ciid = ?', [ciid])
    .then(() => ({ success: true }))
    .catch(error => {
      console.error('Error in removeFromCart:', error);
      throw error;
    });
};