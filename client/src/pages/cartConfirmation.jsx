import React, { useState } from 'react'
import '../assets/cartConfirmation.css'
import '../assets/reset.css'
import Header from '../components/header'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

const CartConfirmation = () => {
  const location = useLocation()
  const {
    cartItems,
    deliveryMethod,
    storeAddress,
    homeAddress,
    paymentMethod,
    invoiceType,
    companyInfo,
    mobileInfo,
    shippingFee,
    finalTotal,
    initialOrderRemark,
    initialCustomerName = '林小美',
    initialCustomerEmail = 'abc12345@gmail.com',
    initialCustomerPhone = '0912333555'
  } = location.state || {}

  const [customerName, setCustomerName] = useState(initialCustomerName)
  const [customerEmail] = useState(initialCustomerEmail) // 信箱保持不可編輯
  const [customerPhone, setCustomerPhone] = useState(initialCustomerPhone)
  const [orderRemark, setOrderRemark] = useState(initialOrderRemark || '')
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    setIsLoading(true)
    try {
      const response = await axios.post('http://localhost:3000/riverflow/pay/create-checkout-session', {
        items: cartItems.map((item) => ({
          name: item.productName,
          size: item.productOpt,
          price: item.price,
          quantity: item.quantity,
          productId: item.productId
        }))
      })

      Swal.fire({
        title: '前往線上付款',
        text: '請完成線上付款程序!',
        icon: 'info',
        confirmButtonColor: '#98d900',
        timer: 3000,
        timerProgressBar: true
      }).then(() => {
        setTimeout(() => {
          window.location = response.data.url
        }, 0)
      })
    } catch (error) {
      console.error('創建結帳會話失敗', error)
      alert('結帳過程中發生錯誤，請稍後再試。')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitOrder = async () => {
    try {
      const orderData = {
        cartItems,
        deliveryMethod,
        storeAddress,
        homeAddress,
        paymentMethod,
        invoiceType,
        companyInfo,
        mobileInfo,
        shippingFee,
        finalTotal,
        orderRemark,
        customerName,
        customerEmail,
        customerPhone
      }

      if (paymentMethod === '線上付款') {
        // 進行線上付款
        await handleCheckout()
      } else {
        // 保存訂單資訊到會員訂單中
        const response = await axios.post('http://localhost:3000/riverflow/order/save', orderData)

        if (response.status === 200) {
          Swal.fire({
            title: '訂單已保存',
            text: '您的訂單已成功保存。',
            icon: 'success',
            confirmButtonColor: '#98d900',
            timer: 6000,
            timerProgressBar: true,
            willClose: () => {
              window.location.href = '/Member/OrderList'
            }
          })
        } else {
          throw new Error('訂單保存過程中發生錯誤。')
        }
      }
    } catch (error) {
      console.error('錯誤：', error.message)
      Swal.fire({
        title: '錯誤',
        text: '處理您的訂單過程中發生錯誤。請稍後再試。',
        icon: 'error',
        confirmButtonColor: '#d33'
      })
    }
  }

  const updateFinalTotal = () => finalTotal

  return (
    <div className="cartConfirmation-container">
      <Header />
      <div className="container">
        <div className="content-left">
          <div className="order-steps">
            <div className="order-detail">
              <a href="#" style={{ color: 'gray' }}>
                訂單資訊
              </a>
              <i style={{ color: 'gray' }} className="fa-solid fa-arrow-right-long"></i>
            </div>
            <div className="order-detail">
              <a href="#">訂單確認</a>
              <i className="fa-solid fa-arrow-right-long"></i>
            </div>
            <div className="order-detail">
              <a href="#" style={{ color: 'gray' }}>
                訂單完成
              </a>
              <i className="fa-solid fa-arrow-right-long" style={{ visibility: 'hidden' }}></i>
            </div>
          </div>

          <div className="order-info">
            <h3>訂單確認</h3>
            <p>顧客基本資料</p>
          </div>

          <div className="customer-info">
            <label htmlFor="customerName">顧客姓名</label>
            <br />
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="請輸入姓名"
            />
            <br />
            <label htmlFor="customerEmail">電子信箱</label>
            <br />
            <input
              type="text"
              id="customerEmail"
              name="customerEmail"
              value={customerEmail}
              placeholder="請輸入電子信箱"
              readOnly
              style={{ cursor: 'not-allowed' }}
            />
            <br />
            <label htmlFor="customerPhone">電話號碼</label>
            <br />
            <input
              type="text"
              id="customerPhone"
              name="customerPhone"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="請輸入電話號碼"
            />
            <br />
            <label htmlFor="orderRemark">訂單備註</label>
            <br />
            <input
              type="text"
              id="orderRemark"
              name="orderRemark"
              value={orderRemark}
              onChange={(e) => setOrderRemark(e.target.value)}
              placeholder="有什麼需要告訴賣家嗎?"
            />
          </div>
        </div>

        <div className="content-right">
          <div className="payment-method">
            <h2>選擇付款方式</h2>

            <form id="order-form">
              <div className="form-group dropdown">
                <label className="country" htmlFor="country">
                  國家
                </label>
                <br />
                <input
                  className="text-border"
                  type="text"
                  id="country"
                  value="台灣"
                  readOnly
                  style={{ cursor: 'not-allowed' }}
                />
              </div>

              <div className="form-group dropdown">
                <label htmlFor="deliveryMethod">運送方式</label>
                <br />
                <input className="text-border" value={deliveryMethod} type="text" id="deliveryMethod" readOnly />
                {deliveryMethod === '7-ELEVEN' || deliveryMethod === '全家' ? (
                  <div className="form-group dropdown" id="store-address-group">
                    <label htmlFor="storeAddress">超商地址</label>
                    <br />
                    <input className="text-border" type="text" id="storeAddress" value={storeAddress} readOnly />
                  </div>
                ) : deliveryMethod === '宅配' ? (
                  <div className="form-group" id="home-address-group">
                    <label htmlFor="homeAddress">宅配地址</label>
                    <br />
                    <input className="text-border" type="text" id="homeAddress" value={homeAddress} readOnly />
                  </div>
                ) : null}
              </div>

              <div className="form-group dropdown">
                <label htmlFor="paymentMethod">付款方式</label>
                <br />
                <input className="text-border" type="text" id="paymentMethod" value={paymentMethod} readOnly />
              </div>

              <div className="invoice-promo-code">
                <div className="form-group dropdown">
                  <label htmlFor="invoiceType">電子發票</label>
                  <br />
                  <input className="text-border" type="text" id="invoiceType" value={invoiceType} readOnly />
                </div>

                {invoiceType === '三聯式' ? (
                  <div className="form-group dropdown">
                    <label htmlFor="companyInfo">公司抬頭</label>
                    <br />
                    <input className="text-border" type="text" id="companyInfo" value={companyInfo} readOnly />
                  </div>
                ) : null}

                {invoiceType === '手機條碼' ? (
                  <div className="form-group dropdown">
                    <label htmlFor="mobileInfo">手機條碼</label>
                    <br />
                    <input className="text-border" type="text" id="mobileInfo" value={mobileInfo} readOnly />
                  </div>
                ) : null}
              </div>

              <div className="total-amount">
                <p>
                  商品金額:
                  <span id="item-total">${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}</span>
                </p>
                <p>
                  運費金額: <span id="shipping-fee">${shippingFee}</span>
                </p>
                <p>
                  付款總金額: <span id="final-total">${updateFinalTotal()}</span>
                </p>
              </div>

              <div className="submit">
                <button type="button" className="confirm-order" onClick={handleSubmitOrder} disabled={isLoading}>
                  {isLoading ? '處理中...' : '確認訂單'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartConfirmation
