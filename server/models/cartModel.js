const dbconnect = require('./dbConnect');

exports.addToCart = async (userId, productId, quantity, productName, productOpt, price) => {
  // 首先檢查是否已存在購物車
  let [cartResult] = await dbconnect.query('SELECT cartId FROM cart WHERE userId = ?', [userId]);
  let cartId;

  if (cartResult.length === 0) {
    // 如果不存在，創建新的購物車
    const [newCart] = await dbconnect.query('INSERT INTO cart (userId) VALUES (?)', [userId]);
    cartId = newCart.insertId;
  } else {
    cartId = cartResult[0].cartId;
  }

  // 檢查該商品是否已在購物車中
  const [existingItem] = await dbconnect.query(
    'SELECT ciid FROM cartitem WHERE cartId = ? AND productId = ?',
    [cartId, productId]
  );

  if (existingItem.length > 0) {
    // 如果已存在，更新數量
    await dbconnect.query(
      'UPDATE cartitem SET quantity = quantity + ? WHERE ciid = ?',
      [quantity, existingItem[0].ciid]
    );
    return { success: true, cartItemId: existingItem[0].ciid };
  } else {
    // 如果不存在，新增項目
    const [result] = await dbconnect.query(
      'INSERT INTO cartitem (cartId, productId, productName, productOpt, quantity, price) VALUES (?, ?, ?, ?, ?, ?)',
      [cartId, productId, productName, productOpt, quantity, price]
    );
    return { success: true, cartItemId: result.insertId };
  }
};

exports.getCart = async (userId) => {
  const [cartResult] = await dbconnect.query('SELECT cartId FROM cart WHERE userId = ?', [userId]);
  
  if (cartResult.length === 0) {
    return [];
  }

  const cartId = cartResult[0].cartId;
  const [cartItems] = await dbconnect.query(
    `SELECT ciid, productId, productName, productOpt, quantity, price
     FROM cartitem
     WHERE cartId = ?`,
    [cartId]
  );
  return cartItems;
};

exports.updateCartItem = async (ciid, quantity) => {
  await dbconnect.query(
    'UPDATE cartitem SET quantity = ? WHERE ciid = ?',
    [quantity, ciid]
  );
  return { success: true };
};

exports.removeFromCart = async (ciid) => {
  await dbconnect.query('DELETE FROM cartitem WHERE ciid = ?', [ciid]);
  return { success: true };
};