import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../assets/cartCheckOut.css'
import Header from '../components/header'
import { useLocation } from 'react-router-dom'

const CartCheckout = () => {
  const location = useLocation()
  const [cartItems, setCartItems] = useState(location.state?.cartItems || [])
  const [orderRemark, setOrderRemark] = useState('')
  const [deliveryMethod, setDeliveryMethod] = useState('')
  const [storeAddress, setStoreAddress] = useState('')
  const [homeAddress, setHomeAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [invoiceType, setInvoiceType] = useState('')
  const [companyInfo, setCompanyInfo] = useState('')
  const [mobileInfo, setMobileInfo] = useState('')
  const [shippingFee, setShippingFee] = useState(60)
  const [dropdownVisible, setDropdownVisible] = useState(null)
  const navigate = useNavigate()

  const toggleDropdown = (dropdownName) => {
    setDropdownVisible((prev) => (prev === dropdownName ? null : dropdownName))
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown')) {
        setDropdownVisible(null)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const handleDeliveryMethodChange = (method) => {
    setDeliveryMethod(method)
    setDropdownVisible(null)

    if (method === '7-ELEVEN' || method === '全家') {
      setHomeAddress('')
      setStoreAddress('')
    } else if (method === '宅配') {
      setStoreAddress('')
    }
  }

  const handleStoreAddressChange = (address) => {
    setStoreAddress(address)
    setDropdownVisible(null)
  }

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method)
    setDropdownVisible(null)
  }

  const handleInvoiceTypeChange = (type) => {
    setInvoiceType(type)
    if (type === 'company') {
      setMobileInfo('')
    } else if (type === 'mobile') {
      setCompanyInfo('')
    }
    setDropdownVisible(null)
  }

  const updateFinalTotal = () => {
    const itemTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    return itemTotal + shippingFee
  }

  const handleSubmit = () => {
    // 將資料傳遞到下一個頁面
    navigate('/Order/CartConfirmation', {
      state: {
        orderRemark,
        cartItems,
        deliveryMethod,
        storeAddress,
        homeAddress,
        paymentMethod,
        invoiceType,
        companyInfo,
        mobileInfo,
        shippingFee,
        finalTotal: updateFinalTotal()
      }
    })
  }

  return (
    <div className="cartCheckOut">
      <Header />
      <div className="container">
        <div className="content-left">
          <div className="order-steps">
            <div className="order-detail">
              <a href="#">訂單資訊</a>
              <i className="fa-solid fa-arrow-right-long"></i>
            </div>
            <div className="order-detail">
              <a href="#" style={{ color: 'darkgray' }}>
                訂單確認
              </a>
              <i style={{ color: 'gray' }} className="fa-solid fa-arrow-right-long"></i>
            </div>
            <div className="order-detail">
              <a href="#" style={{ color: 'gray' }}>
                訂單完成
              </a>
              <i className="fa-solid fa-arrow-right-long" style={{ visibility: 'hidden' }}></i>
            </div>
          </div>

          <div className="order-info">
            <h3>訂單資訊</h3>
            <p>
              已選購<span id="item-count">{cartItems.length}樣商品</span>
            </p>
          </div>

          {cartItems.map((item) => (
            <div className="cart-items" key={item.ciId}>
              <img src={`http://localhost:3000/riverflow${item.productImg}`} alt={item.productName} />
              <div className="cart-item-content">
                <h4>{item.productName}</h4>
                <h5>{item.productOpt}</h5>
              </div>
              <div className="quantity-plus-minus">
                <button
                  className="minus-button"
                  onClick={() => handleQuantityChange(item.ciId, -1)}
                  disabled={item.quantity === 1}
                >
                  <i className="fa-solid fa-circle-minus" aria-hidden="true"></i>
                </button>
                <p className="quantity">{item.quantity}</p>
                <button className="plus-button" onClick={() => handleQuantityChange(item.ciId, 1)}>
                  <i className="fa-solid fa-circle-plus" aria-hidden="true"></i>
                </button>
              </div>
              <p className="total" data-price={item.price}>
                NT${item.price * item.quantity}
              </p>
            </div>
          ))}
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
                <label htmlFor="delivery-method">運送方式</label>
                <br />
                <input
                  className="text-border"
                  type="text"
                  id="delivery-method"
                  placeholder="請選擇運送方式"
                  value={deliveryMethod}
                  readOnly
                  onClick={() => toggleDropdown('delivery')}
                />
                {dropdownVisible === 'delivery' && (
                  <div className="dropdown-content">
                    <div data-type="store" onClick={() => handleDeliveryMethodChange('7-ELEVEN')}>
                      7-ELEVEN
                    </div>
                    <div data-type="store" onClick={() => handleDeliveryMethodChange('全家')}>
                      全家
                    </div>
                    <div data-type="home" onClick={() => handleDeliveryMethodChange('宅配')}>
                      宅配
                    </div>
                  </div>
                )}
                <span id="delivery-address" className="address-display">
                  {deliveryMethod === 'store' ? storeAddress : homeAddress}
                </span>
              </div>

              {deliveryMethod === '7-ELEVEN' || deliveryMethod === '全家' ? (
                <div className="form-group dropdown">
                  <label htmlFor="store-address">超商地址</label>
                  <br />
                  <input
                    className="text-border"
                    type="text"
                    id="store-address"
                    placeholder="請選擇地址"
                    value={storeAddress}
                    readOnly
                    onClick={() => toggleDropdown('storeAddress')}
                  />
                  {dropdownVisible === 'storeAddress' && (
                    <div className="dropdown-content">
                      <div onClick={() => handleStoreAddressChange('台北市信義路123號')}>台北市信義路123號</div>
                      <div onClick={() => handleStoreAddressChange('新北市中和路456號')}>新北市中和路456號</div>
                      <div onClick={() => handleStoreAddressChange('台中市大同路789號')}>台中市大同路789號</div>
                    </div>
                  )}
                </div>
              ) : null}

              {deliveryMethod === '宅配' ? (
                <div className="form-group" id="home-address-group">
                  <label htmlFor="home-address">宅配地址</label>
                  <br />
                  <input
                    className="text-border"
                    type="text"
                    id="home-address"
                    placeholder="請輸入宅配地址"
                    value={homeAddress}
                    onChange={(e) => setHomeAddress(e.target.value)}
                  />
                </div>
              ) : null}

              <div className="form-group dropdown">
                <label htmlFor="payment-method">付款方式</label>
                <br />
                <input
                  className="text-border"
                  type="text"
                  id="payment-method"
                  placeholder="請選擇付款方式"
                  value={paymentMethod}
                  readOnly
                  onClick={() => toggleDropdown('payment')}
                />
                {dropdownVisible === 'payment' && (
                  <div className="dropdown-content">
                    <div onClick={() => handlePaymentMethodChange('線上付款')}>線上付款</div>
                    <div onClick={() => handlePaymentMethodChange('貨到付款')}>貨到付款</div>
                  </div>
                )}
              </div>

              <div className="invoice-promo-code">
                <div className="form-group dropdown">
                  <label htmlFor="invoice">電子發票</label>
                  <br />
                  <input
                    className="text-border"
                    type="text"
                    id="invoice"
                    placeholder="請選擇發票類型"
                    value={invoiceType}
                    readOnly
                    onClick={() => toggleDropdown('invoice')}
                  />
                  {dropdownVisible === 'invoice' && (
                    <div className="dropdown-content">
                      <div onClick={() => handleInvoiceTypeChange('三聯式')}>三聯式</div>
                      <div onClick={() => handleInvoiceTypeChange('捐贈發票')}>捐贈發票</div>
                      <div onClick={() => handleInvoiceTypeChange('手機載具')}>手機載具</div>
                    </div>
                  )}
                </div>
              </div>

              {invoiceType === 'company' && (
                <div className="form-group" id="company-info-group">
                  <label htmlFor="company-info">公司行號</label>
                  <br />
                  <input
                    className="text-border"
                    type="text"
                    id="company-info"
                    placeholder="請輸入公司行號"
                    value={companyInfo}
                    onChange={(e) => setCompanyInfo(e.target.value)}
                  />
                </div>
              )}

              {invoiceType === 'mobile' && (
                <div className="form-group" id="mobile-info-group">
                  <label htmlFor="mobile-info">手機載具</label>
                  <br />
                  <input
                    className="text-border"
                    type="text"
                    id="mobile-info"
                    placeholder="請輸入手機載具"
                    value={mobileInfo}
                    onChange={(e) => setMobileInfo(e.target.value)}
                  />
                </div>
              )}

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
                <button type="button" id="submit" onClick={handleSubmit}>
                  訂單確認
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartCheckout
