import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../assets/basic.css'
import '../assets/ProductDetail.css'
import 'lightbox2/dist/css/lightbox.min.css'
import lightbox from 'lightbox2'
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom'
import Header from '../components/header'

const ProductImages = ({ images = [], isFavorited, onToggleFavorite }) => (
  <aside className="product-images">
    <div className="product-images-big">
      <a href={images[0]} data-lightbox="example-set" data-title="產品圖片">
        <img className="example-image" src={images[0] || '/path/to/default-image.jpg'} alt="product" />
      </a>
      <a href="#" className={`favorite ${isFavorited ? 'selected' : ''}`} onClick={onToggleFavorite}>
        <i className={`fa-regular fa-heart ${isFavorited ? 'selected' : ''}`}></i>
      </a>
    </div>
    <div className="product-image-small">
      {images.slice(1).map((image, index) => (
        <a href={image} data-lightbox="example-set" data-title="產品圖片" key={index}>
          <img className="example-image" src={image || '/path/to/default-image.jpg'} alt={`product${index + 2}`} />
        </a>
      ))}
    </div>
  </aside>
)

const ProductInfo = ({ product, onSizeSelect, onQuantityChange, quantity, selectedSize, onAddToCart, totalPrice }) => (
  <main className="product-info">
    <h1>{product.productName}</h1>
    <div className="labels">
      <span className="label normal">{product.category}</span>
      {product.isNew && <span className="label new">新品</span>}
      {product.isOnSale && <span className="label sale">優惠</span>}
    </div>
    <div className="price-rating">
      <div className="price">
        <span>NT${product.productPrice}</span>
      </div>
      <div className="rating">
        <i className="fa-solid fa-star"></i>
        <span>{product.rating || 'N/A'}</span>
      </div>
    </div>
    <div className="details">
      <div className="details-item">
        <i className="fa-regular fa-comment"></i>
        <div className="details-text">
          <span>說明</span>
          <p>{product.productDesc}</p>
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
      {product.sizes && product.sizes.length > 0 ? (
        product.sizes.map((size, index) => (
          <button
            key={index}
            className={`size-option ${selectedSize === size ? 'selected' : ''}`}
            onClick={() => onSizeSelect(size)}
          >
            {size}
          </button>
        ))
      ) : (
        <p>無可選擇的尺寸</p>
      )}
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

const Recommendations = () => (
  <div className="recommendations container">
    <h2>你可能會喜歡</h2>
    <div className="product-item-container">{/* 这里可以动态生成推荐产品 */}</div>
  </div>
)

const ProductDetail = () => {
  const { productId } = useParams()
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isFavorited, setIsFavorited] = useState(false)

  useEffect(() => {
    axios
      .get(`http://localhost:3000/riverflow/products/${productId}`)
      .then((response) => {
        const data = response.data
        const productData = data.productInfo[0]

        productData.sizes = JSON.parse(productData.productOpt).map((opt) => opt.name)
        productData.images = data.productImg.map((img) => img.productImg)
        productData.rating =
          JSON.parse(productData.productRating).reduce((acc, curr) => acc + curr.rating, 0) /
          JSON.parse(productData.productRating).length

        // 设置标签状态，假设数据中有 isNew 和 isOnSale 字段
        productData.isNew = data.isNew || false
        productData.isOnSale = data.isOnSale || false

        setProduct(productData)
        setLoading(false)

        lightbox.option({
          resizeDuration: 200,
          wrapAround: true
        })
      })
      .catch((error) => {
        console.error('Error fetching product details:', error)
        setLoading(false)
      })
  }, [productId])

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited)
    // 这里可以调用 API 来保存最爱状态到后端
  }

  const unitPrice = product ? parseInt(product.productPrice, 10) : 0
  const totalPrice = `NT$${unitPrice * quantity}`

  const handleSizeSelect = (size) => setSelectedSize(size)
  const handleQuantityChange = (delta) => setQuantity((prev) => Math.max(1, prev + delta))

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
    // 调用 API 将产品添加到购物车
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="w-bg scrollCust">
      <Header />
      <div className="container-f">
        <div className="wrap">
          {product && (
            <>
              <ProductImages images={product.images} isFavorited={isFavorited} onToggleFavorite={toggleFavorite} />
              <ProductInfo
                product={product}
                selectedSize={selectedSize}
                quantity={quantity}
                onSizeSelect={handleSizeSelect}
                onQuantityChange={handleQuantityChange}
                onAddToCart={handleAddToCart}
                totalPrice={totalPrice}
              />
            </>
          )}
        </div>
        <Recommendations />
      </div>
    </div>
  )
}

export default ProductDetail
