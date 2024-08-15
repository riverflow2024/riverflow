import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusCircle, MinusCircle, Trash2 } from 'lucide-react';

const CartItem = ({ item, onQuantityChange, onDelete }) => {
  const handleQuantityChange = (change) => {
    onQuantityChange(item.ciid, item.quantity + change);
  };

  return (
    <div className="flex items-center justify-between py-4 border-b">
      <div className="flex items-center space-x-4">
        <img
          src={`https://example.com/products/${item.productId}/image`}
          alt={item.productName}
          className="w-16 h-16 object-cover"
        />
        <div>
          <h4 className="font-semibold">{item.productName}</h4>
          <p className="text-sm text-gray-600">{item.productOpt}</p>
        </div>
      </div>
      <div className="text-center">
        <p className="font-semibold">NT${item.price}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleQuantityChange(-1)}
          disabled={item.quantity === 1}
          className="text-gray-500 disabled:opacity-50"
        >
          <MinusCircle size={20} />
        </button>
        <span className="w-8 text-center">{item.quantity}</span>
        <button
          onClick={() => handleQuantityChange(1)}
          className="text-gray-500"
        >
          <PlusCircle size={20} />
        </button>
      </div>
      <div className="text-center">
        <p className="font-semibold">NT${item.price * item.quantity}</p>
      </div>
      <button onClick={() => onDelete(item.ciid)} className="text-red-500">
        <Trash2 size={20} />
      </button>
    </div>
  );
};

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 假設現在API 返回當前用戶的購物車 ID 和對應的購物車項目列表
    axios
      .get('/api/cart/1') // 假設使用者有 cartId = 1
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.error('獲取購物車項目失敗', error);
        if (error.response && error.response.status === 401) {
          console.error('Token 可能已過期或無效，需要重新登入');
        }
      });
  };

  const updateCart = (ciId, newQuantity) => {
    axios
      .put(`/api/cart/items/${ciId}`, { quantity: newQuantity })
      .then((response) => {
        setCartItems(cartItems.map((item) => (item.ciId === ciId ? { ...item, quantity: newQuantity } : item)))
      })
      .catch((error) => {
        console.error('更新購物車項目失敗', error);
      });
  };

  const deleteItem = (ciid) => {
    axios.delete(`http://localhost:3000/riverflow/cart/remove/${ciid}`)
      .then(() => {
        setCartItems(cartItems.filter((item) => item.ciid !== ciid));
      })
      .catch((error) => {
        console.error('刪除購物車項目失敗', error);
      });
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/riverflow/pay/create-checkout-session', {
        items: cartItems.map(item => ({
          name: item.productName,
          size: item.productOpt,
          price: item.price,
          quantity: item.quantity,
          productId: item.productId
        }))
      });
      window.location = response.data.url;
    } catch (error) {
      console.error('創建結帳會話失敗', error);
      alert('結帳過程中發生錯誤，請稍後再試。');
    } finally {
      setIsLoading(false);
    }
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">River Flow | 購物車</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="grid grid-cols-5 gap-4 p-4 bg-gray-100 font-semibold">
          <div className="col-span-2">商品</div>
          <div className="text-center">單價</div>
          <div className="text-center">數量</div>
          <div className="text-center">總金額</div>
        </div>
        <div className="p-4">
          {cartItems.map((item) => (
            <CartItem
              key={item.ciid}
              item={item}
              onQuantityChange={updateCart}
              onDelete={deleteItem}
            />
          ))}
        </div>
      </div>
      <div className="mt-6 flex justify-between items-center">
        <p className="text-lg">
          已選購 <span className="font-bold">{totalItems}</span> 項商品
        </p>
        <div className="text-right">
          <p className="text-xl mb-2">
            總金額: <span className="font-bold">NT${totalPrice}</span>
          </p>
          <button
            onClick={handleCheckout}
            disabled={isLoading || cartItems.length === 0}
            className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? '處理中...' : '前往結帳'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;