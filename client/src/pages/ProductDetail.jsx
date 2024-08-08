import React, { useState, useEffect } from 'react'

import '../assets/basic.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '../assets/ProductDetail.css'
import 'lightbox2/dist/css/lightbox.min.css'
import lightbox from 'lightbox2'
import Swal from 'sweetalert2'

// 圖片組件
const ProductImages = ({ images }) => (
  <aside className="product-images">
    <div className="product-images-big">
      <a href={images[0]} data-lightbox="example-set" data-title="美式拼貼滑板">
        <img className="example-image" src={images[0]} alt="skate1" />
      </a>
      <a href="#" className="favorite">
        <i className="fa-regular fa-heart"></i>
      </a>
    </div>
    <div className="product-image-small">
      {images.slice(1).map((image, index) => (
        <a href={image} data-lightbox="example-set" data-title="美式拼貼滑板" key={index}>
          <img className="example-image" src={image} alt={`skate${index + 2}`} />
        </a>
      ))}
    </div>
  </aside>
)

// 右邊訊息組件
const ProductInfo = ({ product, onSizeSelect, onQuantityChange, quantity, selectedSize, onAddToCart, totalPrice }) => (
  <main className="product-info">
    <h1>{product.title}</h1>
    <div className="labels">
      <span className="label normal">滑板</span>
      <span className="label new">新品</span>
    </div>
    <div className="price-rating">
      <div className="price">
        <span>{product.price}</span>
      </div>
      <div className="rating">
        <i className="fa-solid fa-star"></i>
        <span>{product.rating}</span>
      </div>
    </div>
    <div className="details">
      <div className="details-item">
        <i className="fa-regular fa-comment"></i>
        <div className="details-text">
          <span>說明</span>
          <p>{product.description}</p>
        </div>
      </div>
      <div className="details-item">
        <i className="fa-solid fa-street-view"></i>
        <div className="details-text">
          <span>適用</span>
          <p>{product.applicable}</p>
        </div>
      </div>
      <div className="details-item">
        <i className="fa-brands fa-think-peaks"></i>
        <div className="details-text">
          <span>材質</span>
          <p>{product.material}</p>
        </div>
      </div>
    </div>
    <div className="size">
      <h3>尺寸</h3>
      {product.sizes.map((size, index) => (
        <button
          key={index}
          className={`size-option ${selectedSize === size ? 'selected' : ''}`}
          onClick={() => onSizeSelect(size)}
        >
          {size}
        </button>
      ))}
    </div>
    <div className="quantity">
      <div className="add-minus">
        <button onClick={() => onQuantityChange(-1)}>
          <i className="fa-solid fa-minus"></i>
        </button>
        <input type="number" id="quantity-input" value={quantity} readOnly />
        <button onClick={() => onQuantityChange(1)}>
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
      <button className="add-to-cart" onClick={onAddToCart}>
        <span id="price">{totalPrice} | </span>
        加入購物車
      </button>
    </div>
    <div className="order-info">
      <ul>
        <li>
          <i className="fa-regular fa-circle-check"></i> NT$999 以上訂單免運費
        </li>
        <li>
          <i className="fa-regular fa-circle-check"></i> 12:00 pm 前訂購可當天發貨
        </li>
        <li>
          <i className="fa-regular fa-circle-check"></i> 7 天無理由退換貨
        </li>
      </ul>
    </div>
  </main>
)

// 產品組件
const Recommendations = () => (
  <div className="recommendations container">
    <h2>你可能會喜歡</h2>
    <div className="product-item-container">
      <div className="product-item">
        <div className="product-img">
          <img
            src="https://images.goodsmile.info/cgm/images/product/20220502/12665/98719/large/d870c31d5f264155ac6e3e359b7d34bc.jpg"
            alt="滑板編號1"
          />
          <a href="#" className="favorite">
            <i className="fa-regular fa-heart"></i>
          </a>
        </div>
        <div className="labels">
          <span className="label skate">滑板</span>
          <span className="label new">新品</span>
        </div>
        <div className="product-info">
          <h4>TsL滑板</h4>
          <div className="product-text">
            <p>NT$3683</p>
            <button className="add-to-cart">查看更多</button>
          </div>
        </div>
      </div>
      <div className="product-item">
        <div className="product-img">
          <img
            src="https://shoplineimg.com/59b2d9e49a76f018310010d2/5d299190d0467a0038ae06eb/800x.webp?source_format=jpg"
            alt="RAP編號5"
          />
          <a href="#" className="favorite">
            <i className="fa-regular fa-heart"></i>
          </a>
        </div>
        <div className="labels">
          <span className="label normal">饒舌</span>
        </div>
        <div className="product-info">
          <h4>6ix9ine原裝CD專輯</h4>
          <div className="product-text">
            <p>NT$550</p>
            <button className="add-to-cart">查看更多</button>
          </div>
        </div>
      </div>
      <div className="product-item">
        <div className="product-img">
          <img
            src="https://shoplineimg.com/59b2d9e49a76f018310010d2/5e908f90c0e941001e48bc23/800x.webp?source_format=jpg"
            alt="DJ"
          />
          <a href="#" className="favorite">
            <i className="fa-regular fa-heart"></i>
          </a>
        </div>
        <div className="labels">
          <span className="label normal">DJ</span>
        </div>
        <div className="product-info">
          <h4>復古手提箱造型藍芽</h4>
          <div className="product-text">
            <p>NT$4980</p>
            <button className="add-to-cart">查看更多</button>
          </div>
        </div>
      </div>
      <div className="product-item">
        <div className="product-img">
          <img
            src="https://shoplineimg.com/59b2d9e49a76f018310010d2/5ecf805b323c4a00273a9717/800x.webp?source_format=png"
            alt="滑板編號2"
          />
          <a href="#" className="favorite">
            <i className="fa-regular fa-heart"></i>
          </a>
        </div>
        <div className="labels">
          <span className="label skate">滑板</span>
        </div>
        <div className="product-info">
          <h4>Raw經典煙紙品牌滑板</h4>
          <div className="product-text">
            <p>NT$2880</p>
            <button className="add-to-cart">查看更多</button>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const ProductDetail = ({ location }) => {
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)

  const product = location.state?.product || {
    images: [
      'https://i.pinimg.com/564x/8d/a3/fd/8da3fde782226de77033dabdebcbc15e.jpg',
      'https://i.pinimg.com/564x/c6/a4/c5/c6a4c5053209d3b926c39f97e86c9956.jpg',
      'https://i.pinimg.com/564x/b7/39/76/b73976029de0acf20a86cd31b287fa78.jpg',
      'https://i.pinimg.com/564x/6d/52/15/6d5215b8b28bf77ab984b5e9b284e22a.jpg',
      'https://i.pinimg.com/564x/29/81/57/29815751e0217371de4edd74c8b0c014.jpg'
    ],
    title: '美式拼貼滑板',
    price: 'NT$3,835',
    rating: '4.3/5',
    description: '美式拼貼滑板結合了獨特的拼貼設計和高性能材質，是一款既時尚又實用的滑板，適合各類滑板愛好者。',
    applicable: '運動愛好者、初學者',
    material: '高強度七層楓木、耐磨防滑砂紙、聚氨酯輪子、ABEC-9軸承',
    sizes: ['黑色拼貼/7.75 寸', '白色拼貼/7.75 寸', '黑色拼貼/8.25 寸', '白色拼貼/8.25 寸']
  }

  const unitPrice = parseInt(product.price.replace('NT$', '').replace(',', ''), 10)
  const totalPrice = `NT$${unitPrice * quantity}`

  const handleSizeSelect = (size) => setSelectedSize(size)
  const handleQuantityChange = (delta) => setQuantity((prevQuantity) => Math.max(1, prevQuantity + delta))
  const handleAddToCart = () => {
    if (!selectedSize) {
      Swal.fire({
        icon: 'error',
        title: '請選擇尺寸規格',
        confirmButtonColor: 'red'
      })
      return
    }
    Swal.fire({
      icon: 'success',
      title: '已成功加入購物車',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    })
  }

  useEffect(() => {
    lightbox.option({
      resizeDuration: 200,
      wrapAround: true
    })
  }, [quantity])
  return (
    <div className="w-bg scrollCust">
      <div className="container-f">
        <div className="wrap">
          <ProductImages images={product.images} />
          <ProductInfo
            product={product}
            selectedSize={selectedSize}
            quantity={quantity}
            onSizeSelect={handleSizeSelect}
            onQuantityChange={handleQuantityChange}
            onAddToCart={handleAddToCart}
            totalPrice={totalPrice}
          />
        </div>
        <Recommendations />
      </div>
    </div>
  )
}

export default ProductDetail
