const dbconnect = require('./dbConnect');

exports.createOrder = async (sessionId, orderDetails) => {
  const connection = await dbconnect.getConnection();
  try {
    await connection.beginTransaction();

    // 獲取用戶的 cartId
    const [cartResult] = await connection.query('SELECT cartId FROM cart WHERE userId = ?', [orderDetails[0].userId]);
    const cartId = cartResult[0].cartId;

    const [orderResult] = await connection.query(
      'INSERT INTO orders (userId, sessionId, totalAmount) VALUES (?, ?, ?)',
      [orderDetails[0].userId, sessionId, orderDetails.reduce((total, item) => total + item.price * item.quantity, 0)]
    );

    const orderId = orderResult.insertId;

    for (const item of orderDetails) {
      await connection.query(
        'INSERT INTO orderitem (orderId, productId, sessionId, productName, productOpt, quantity, price) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [orderId, item.productId, sessionId, item.name, item.size, item.quantity, item.price]
      );
    }

    await connection.commit();
    return orderId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

exports.clearCart = async (userId) => {
  const connection = await dbconnect.getConnection();
  try {
    await connection.beginTransaction();

    // 獲取用戶的 cartId
    const [cartResult] = await connection.query('SELECT cartId FROM cart WHERE userId = ?', [userId]);
    
    if (cartResult.length > 0) {
      const cartId = cartResult[0].cartId;
      
      // 刪除購物車項目
      await connection.query('DELETE FROM cartitem WHERE cartId = ?', [cartId]);
      
      // 刪除購物車本身
      await connection.query('DELETE FROM cart WHERE cartId = ?', [cartId]);
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};