import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../assets/cart.css'
import Header from '../components/header'

const CartItem = ({ item, onQuantityChange, onDelete }) => {
  const handleQuantityChange = (change) => {
    onQuantityChange(item.ciId, item.quantity + change)
  }

  return (
    <tr className="cart-item">
      <td>
        <div className="cart-item-left-content">
          <img src={`https://example.com/products/${item.productId}/image`} alt={item.productName} />
          <div className="cart-item-content">
            <h4>{item.productName}</h4>
            <h5>{item.productOpt}</h5>
          </div>
        </div>
      </td>
      <td className="price">NT${item.price}</td>
      <td>
        <div className="quantity-plus-minus">
          <button onClick={() => handleQuantityChange(-1)} disabled={item.quantity === 1}>
            <i className="fa-solid fa-circle-minus"></i>
          </button>
          <p className="quantity">{item.quantity}</p>
          <button onClick={() => handleQuantityChange(1)}>
            <i className="fa-solid fa-circle-plus"></i>
          </button>
        </div>
      </td>
      <td className="total">NT${item.price * item.quantity}</td>
      <td>
        <button onClick={() => onDelete(item.ciId)} className="delete">
          <i className="fa-regular fa-trash-can"></i>
        </button>
      </td>
    </tr>
  )
}

const Cart = () => {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    // 假設現在API 返回當前用戶的購物車 ID 和對應的購物車項目列表
    axios
      .get('/api/cart/1') // 假設使用者有 cartId = 1
      .then((response) => {
        setCartItems(response.data.cartItems)
      })
      .catch((error) => {
        console.error('Failed to fetch cart items', error)
      })
  }, [])

  const updateCart = (ciId, newQuantity) => {
    axios
      .put(`/api/cart/items/${ciId}`, { quantity: newQuantity })
      .then((response) => {
        setCartItems(cartItems.map((item) => (item.ciId === ciId ? { ...item, quantity: newQuantity } : item)))
      })
      .catch((error) => {
        console.error('Failed to update cart item', error)
      })
  }

  const deleteItem = (ciId) => {
    axios
      .delete(`/api/cart/items/${ciId}`)
      .then((response) => {
        setCartItems(cartItems.filter((item) => item.ciId !== ciId))
      })
      .catch((error) => {
        console.error('Failed to delete cart item', error)
      })
  }

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div className="cart-wrap-f">
      <Header />
      <div className="container-f">
        <div className="cart-wrap">
          <div className="container">
            <div className="top">
              <h3>River Flow | 購物車</h3>
            </div>
            <div className="cart-border">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>商品</th>
                    <th>單價</th>
                    <th>數量</th>
                    <th>總金額</th>
                    <th>刪除</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <CartItem key={item.ciId} item={item} onQuantityChange={updateCart} onDelete={deleteItem} />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="checkButton">
              <p>
                已選購 <span>{totalItems}</span> 項商品
              </p>
              <div className="rightCheckButton">
                總金額: NT$<span>{totalPrice}</span>
                <a href="./cart_checkout.html">前往買單</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
