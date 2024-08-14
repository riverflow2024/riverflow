import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../assets/basic.css'
import '../assets/ProductDetail.css'
import 'lightbox2/dist/css/lightbox.min.css'
import lightbox from 'lightbox2'
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom'
import Header from '../components/header'

// 圖片展示區塊，包括大圖和小圖，並提供收藏功能
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

// 產品資訊區塊，包括產品名稱、標籤、價格、評分、詳細資訊、尺寸選擇和購物車功能
const ProductInfo = ({ product, onSizeSelect, onQuantityChange, quantity, selectedSize, onAddToCart, totalPrice }) => (
  <main className="product-info">
    <h1>{product.productName}</h1>
    <div className="labels">
      <span className="label normal">{product.categoryName}</span>
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

// 推薦產品區塊，可以動態生成推薦產品
const Recommendations = ({ productId }) => {
  const [recommendedProducts, setRecommendedProducts] = useState([])

  useEffect(() => {
    // 假設你有一個 API 可以根據當前的 productId 推薦產品
    axios
      .get(`http://localhost:3000/riverflow/recommendations?excludeProductId=${productId}`)
      .then((response) => {
        setRecommendedProducts(response.data)
      })
      .catch((error) => {
        console.error('Error fetching recommended products:', error)
      })
  }, [productId])

  return (
    <div className="recommendations container">
      <h2>你可能會喜歡</h2>
      <div className="product-item-container">
        {recommendedProducts.map((product) => (
          <div key={product.productId} className="recommended-product">
            <a href={`/Product/Detail/${product.productId}`}>
              <img src={product.imageUrl} alt={product.productName} />
            </a>
            <h3>{product.productName}</h3>
            <p>NT${product.productPrice}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// 產品詳細資訊頁面的主體，包含產品圖片、資訊、和推薦產品
const ProductDetail = () => {
  const { productId } = useParams() // 從 URL 中獲取 productId
  const [selectedSize, setSelectedSize] = useState('') // 選擇的產品尺寸
  const [quantity, setQuantity] = useState(1) // 購買數量
  const [product, setProduct] = useState(null) // 產品數據
  const [loading, setLoading] = useState(true) // 加載狀態
  const [isFavorited, setIsFavorited] = useState(false) // 收藏狀態

  // 當 productId 改變時，從後端 API 獲取產品詳情
  useEffect(() => {
    axios
      .get(`http://localhost:3000/riverflow/products/${productId}`)
      .then((response) => {
        const data = response.data
        const productData = data.productInfo[0]

        // 解析和設定產品數據
        productData.sizes = JSON.parse(productData.productOpt).map((opt) => opt.name)
        productData.images = data.productImg.map((img) => img.productImg)
        productData.rating =
          JSON.parse(productData.productRating).reduce((acc, curr) => acc + curr.rating, 0) /
          JSON.parse(productData.productRating).length

        // 設定標籤狀態，假設數據中有 isNew 和 isOnSale 欄位
        productData.isNew = productData.launchDate && new Date(productData.launchDate) > new Date('2024-01-01')
        productData.isOnSale = productData.discount > 0

        setProduct(productData)
        setLoading(false)

        // 設定 lightbox 配置
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

  // 切換收藏狀態
  const toggleFavorite = () => {
    setIsFavorited(!isFavorited)
    // 這裡可以調用 API 來保存最愛狀態到後端
  }

  // 處理尺寸選擇
  const handleSizeSelect = (size) => setSelectedSize(size)

  // 處理購買數量變更
  const handleQuantityChange = (delta) => setQuantity((prev) => Math.max(1, prev + delta))

  // 處理加入購物車操作
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

  // 當數據加載中時顯示 Loading
  if (loading) {
    return <div>加載中</div>
  }

  // 渲染產品詳情頁面
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
                totalPrice={`NT$${parseInt(product.productPrice, 10) * quantity}`}
              />
            </>
          )}
        </div>
        <Recommendations productId={productId} />
      </div>
    </div>
  )
}

export default ProductDetail
