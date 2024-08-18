import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom' // 引入 useNavigate
import '../assets/cart.css'
import Header from '../components/header'

// 單個購物車項目元件
const CartItem = ({ item, onQuantityChange, onDelete }) => {
  const handleQuantityChange = (change) => {
    onQuantityChange(item.ciid, item.quantity + change)
  }

  return (
    <tr className="cart-item">
      <td>
        <div className="cart-item-left-content">
          <img
            src={`http://localhost:3000${item.productImg}`}
            alt={item.productName}
            onError={(e) => {
              e.target.src = '/images/products/default.jpg' // 預設圖片路徑
            }}
          />
          <div className="cart-item-content">
            <h4>{item.productName}</h4>
            <h5>{item.productOpt}</h5>
          </div>
        </div>
      </td>
      <td className="price">NT${item.price}</td>
      <td>
        <div className="quantity-plus-minus">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              handleQuantityChange(-1)
            }}
            className="quantity-minus"
            aria-disabled={item.quantity === 1 ? 'true' : 'false'}
          >
            <i className="fa-solid fa-circle-minus"></i>
          </a>
          <p className="quantity">{item.quantity}</p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              handleQuantityChange(1)
            }}
            className="quantity-plus"
          >
            <i className="fa-solid fa-circle-plus"></i>
          </a>
        </div>
      </td>
      <td className="total">NT${item.price * item.quantity}</td>
      <td>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onDelete(item.ciid)
          }}
          className="delete"
        >
          <i className="fa-regular fa-trash-can"></i>
        </a>
      </td>
    </tr>
  )
}

const Cart = () => {
  const [cartItems, setCartItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate() // 使用 useNavigate

  useEffect(() => {
    axios.defaults.withCredentials = true
    fetchCartItems()
  }, [])

  const fetchCartItems = () => {
    axios
      .get('http://localhost:3000/riverflow/cart/')
      .then((response) => {
        setCartItems(response.data)
      })
      .catch((error) => {
        console.error('獲取購物車項目失敗', error)
        if (error.response && error.response.status === 401) {
          console.error('Token 可能已過期或無效，需要重新登入')
        }
      })
  }

  const updateCart = (ciid, newQuantity) => {
    if (newQuantity <= 0) return
    axios
      .put('http://localhost:3000/riverflow/cart/update', { ciid, quantity: newQuantity })
      .then(() => {
        setCartItems(cartItems.map((item) => (item.ciid === ciid ? { ...item, quantity: newQuantity } : item)))
      })
      .catch((error) => {
        console.error('更新購物車項目失敗', error)
      })
  }

  const deleteItem = (ciid) => {
    axios
      .delete(`http://localhost:3000/riverflow/cart/remove/${ciid}`)
      .then(() => {
        setCartItems(cartItems.filter((item) => item.ciid !== ciid))
      })
      .catch((error) => {
        console.error('刪除購物車項目失敗', error)
      })
  }

  const handleCheckout = () => {
    navigate('/Order/cartCheckOut', { state: { cartItems } }) // 導航到指定的 Checkout 頁面並傳遞數據
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
                    <th className="shop-push">商品</th>
                    <th>單價</th>
                    <th>數量</th>
                    <th>總金額</th>
                    <th>刪除</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="cart-border-inner">
              <table className="cart-table">
                <tbody id="cart-items">
                  {cartItems.map((item) => (
                    <CartItem key={item.ciid} item={item} onQuantityChange={updateCart} onDelete={deleteItem} />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="checkButton">
              <p>
                已選購 <span id="item-count">{totalItems}</span> 項商品
              </p>
              <div className="rightCheckButton">
                總金額: NT$<span id="total-amount">{totalPrice}</span>
                <button onClick={handleCheckout} disabled={isLoading || cartItems.length === 0} className="GoBtn">
                  {isLoading ? '處理中...' : '前往訂單'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
