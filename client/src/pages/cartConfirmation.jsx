import React, { useState } from 'react'
import '../assets/cartConfirmation.css'
import '../assets/reset.css'
import '../assets/basic.css'
import Header from '../components/header'
import Swal from 'sweetalert2'

const CartConfirmation = () => {
  const [customerName, setCustomerName] = useState('林小美')
  const [customerEmail] = useState('abc12345@gmail.com')
  const [customerPhone, setCustomerPhone] = useState('0912333555')
  const [orderRemark, setOrderRemark] = useState('')
  const [deliveryMethod, setDeliveryMethod] = useState('7-ELEVEN')
  const [storeAddress, setStoreAddress] = useState('台北市信義路123號')
  const [homeAddress, setHomeAddress] = useState('台中公益路123號')
  const [paymentMethod, setPaymentMethod] = useState('貨到付款')
  const [invoiceType, setInvoiceType] = useState('捐贈發票')
  const [companyInfo, setCompanyInfo] = useState('')
  const [mobileInfo, setMobileInfo] = useState('')
  const [shippingFee] = useState(60)

  // 這邊只是假設商品
  const itemTotal = 4060

  const finalTotal = itemTotal + shippingFee

  const handleSubmitOrder = () => {
    Swal.fire({
      title: '訂單完成',
      text: '謝謝您的購買!',
      icon: 'success',
      confirmButtonColor: '#98d900',
      timer: 6000,
      timerProgressBar: true,
      willClose: () => {
        window.location.href = './memberOrderList.html'
      }
    })
  }

  return (
    <div className="cartConfirmation-container ">
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
                <input
                  className="text-border"
                  value={deliveryMethod}
                  type="text"
                  id="deliveryMethod"
                  placeholder="請選擇運送方式"
                  readOnly
                />
                <div className="dropdown-content">
                  <div onClick={() => setDeliveryMethod('7-ELEVEN')}>7-ELEVEN</div>
                  <div onClick={() => setDeliveryMethod('全家')}>全家</div>
                  <div onClick={() => setDeliveryMethod('宅配')}>宅配</div>
                </div>
              </div>

              {deliveryMethod === 'store' && (
                <div className="form-group dropdown" id="store-address-group">
                  <label htmlFor="storeAddress">超商地址</label>
                  <br />
                  <input
                    className="text-border"
                    type="text"
                    id="storeAddress"
                    placeholder="請選擇地址"
                    value={storeAddress}
                    readOnly
                  />
                  <div className="dropdown-content">
                    <div onClick={() => setStoreAddress('台北市信義路123號')}>台北市信義路123號</div>
                    <div onClick={() => setStoreAddress('新北市中和路456號')}>新北市中和路456號</div>
                    <div onClick={() => setStoreAddress('台中市大同路789號')}>台中市大同路789號</div>
                  </div>
                </div>
              )}

              {deliveryMethod === 'home' && (
                <div className="form-group" id="home-address-group">
                  <label htmlFor="homeAddress">宅配地址</label>
                  <br />
                  <input
                    className="text-border"
                    type="text"
                    id="homeAddress"
                    placeholder="請輸入宅配地址"
                    value={homeAddress}
                    onChange={(e) => setHomeAddress(e.target.value)}
                  />
                </div>
              )}

              <div className="form-group dropdown">
                <label htmlFor="paymentMethod">付款方式</label>
                <br />
                <input
                  className="text-border"
                  type="text"
                  id="paymentMethod"
                  placeholder="請選擇付款方式"
                  value={paymentMethod}
                  readOnly
                />
                <div className="dropdown-content">
                  <div onClick={() => setPaymentMethod('線上付款')}>線上付款</div>
                  <div onClick={() => setPaymentMethod('貨到付款')}>貨到付款</div>
                </div>
              </div>

              <div className="invoice-promo-code">
                <div className="form-group dropdown">
                  <label htmlFor="invoiceType">電子發票</label>
                  <br />
                  <input
                    className="text-border"
                    type="text"
                    id="invoiceType"
                    placeholder="請選擇發票類型"
                    value={invoiceType}
                    readOnly
                  />
                  <div className="dropdown-content">
                    <div onClick={() => setInvoiceType('三聯式')}>三聯式</div>
                    <div onClick={() => setInvoiceType('捐贈發票')}>捐贈發票</div>
                    <div onClick={() => setInvoiceType('手機載具')}>手機載具</div>
                  </div>
                </div>
              </div>

              {invoiceType === 'company' && (
                <div className="form-group" id="company-info-group">
                  <label htmlFor="companyInfo">公司行號</label>
                  <br />
                  <input
                    className="text-border"
                    type="text"
                    id="companyInfo"
                    placeholder="請輸入公司行號"
                    value={companyInfo}
                    onChange={(e) => setCompanyInfo(e.target.value)}
                  />
                </div>
              )}

              {invoiceType === 'mobile' && (
                <div className="form-group" id="mobile-info-group">
                  <label htmlFor="mobileInfo">手機載具</label>
                  <br />
                  <input
                    className="text-border"
                    type="text"
                    id="mobileInfo"
                    placeholder="請輸入手機載具"
                    value={mobileInfo}
                    onChange={(e) => setMobileInfo(e.target.value)}
                  />
                </div>
              )}

              <div className="total-amount">
                <p>
                  商品金額: <span id="item-total">${itemTotal}</span>
                </p>
                <p>
                  運費金額: <span id="shipping-fee">${shippingFee}</span>
                </p>
                <p>
                  付款總金額: <span id="final-total">${finalTotal}</span>
                </p>
              </div>

              <div className="submit">
                <a href="#" id="submit-order" onClick={handleSubmitOrder}>
                  訂單提交
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartConfirmation
