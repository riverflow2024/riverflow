import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../assets/ProductDetail.css'
import 'lightbox2/dist/css/lightbox.min.css'
import lightbox from 'lightbox2'
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom'
import Header from '../components/header'

// 商品圖片展示組件
const ProductImages = ({ images = [], isFavorited, onToggleFavorite }) => (
  <aside className='product-images'>
    <div className='product-images-big'>
      <a href={images[0]} data-lightbox='example-set' data-title='產品圖片'>
        <img className='example-image' src={`/images/products/${images[0]}`} alt='product' />
      </a>
      <a href='#' className={`favorite ${isFavorited ? 'selected' : ''}`} onClick={onToggleFavorite}>
        <i className={`fa-regular fa-heart ${isFavorited ? 'selected' : ''}`}></i>
      </a>
    </div>
    <div className='product-image-small'>
      {images.slice(1).map((image, index) => (
        <a href={`/images/products/${image}`} data-lightbox='example-set' data-title='產品圖片' key={index}>
          <img className='example-image' src={`/images/products/${image}`} alt={`product${index + 2}`} />
        </a>
      ))}
    </div>
  </aside>
)

// 商品資訊展示組件
const ProductInfo = ({
  product,
  onSizeSelect,
  onQuantityChange,
  quantity,
  selectedSize,
  onAddToCart,
  totalPrice,
  isNew,
  isOnSale
}) => (
  <main className='product-info'>
    <h1>{product.productName}</h1>
    <div className='labels'>
      <span className='label normal'>{product.categoryName}</span>
      {isNew && <span className='label new'>新品</span>}
      {isOnSale && <span className='label sale'>優惠</span>}
    </div>

    <div className='price-rating'>
      <div className='price'>
        <span>NT${product.productPrice}</span>
      </div>
      <div className='rating'>
        <i className='fa-solid fa-star'></i>
        <span>{product.rating || 'N/A'}</span>
      </div>
    </div>
    <div className='details'>
      <div className='details-item'>
        <i className='fa-regular fa-comment'></i>
        <div className='details-text'>
          <span>說明</span>
          <p>{product.productDesc}</p>
        </div>
      </div>
      <div className='details-item'>
        <i className='fa-solid fa-street-view'></i>
        <div className='details-text'>
          <span>適用</span>
          <p>{product.productSpec1}</p>
        </div>
      </div>
      <div className='details-item'>
        <i className='fa-brands fa-think-peaks'></i>
        <div className='details-text'>
          <span>材質</span>
          <p>{product.productSpec2}</p>
        </div>
      </div>
    </div>
    <div className='size'>
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
    <div className='quantity'>
      <div className='add-minus'>
        <button onClick={() => onQuantityChange(-1)}>
          <i className='fa-solid fa-minus'></i>
        </button>
        <input type='number' id='quantity-input' value={quantity} readOnly />
        <button onClick={() => onQuantityChange(1)}>
          <i className='fa-solid fa-plus'></i>
        </button>
      </div>
      <button className='add-to-cart' onClick={onAddToCart}>
        <span id='price'>{totalPrice} | </span>
        加入購物車
      </button>
    </div>
    <div className='order-info'>
      <ul>
        <li>
          <i className='fa-regular fa-circle-check'></i> NT$999 以上訂單免運費
        </li>
        <li>
          <i className='fa-regular fa-circle-check'></i> 12:00 pm 前訂購可當天發貨
        </li>
        <li>
          <i className='fa-regular fa-circle-check'></i> 7 天無理由退換貨
        </li>
      </ul>
    </div>
  </main>
)

// 你可能會喜歡組件，展示假資料
const Recommendations = () => {
  const fakeProducts = [
    // 假資料
    {
      id: 1,
      title: 'TsL滑板',
      image:
        'https://images.goodsmile.info/cgm/images/product/20220502/12665/98719/large/d870c31d5f264155ac6e3e359b7d34bc.jpg',
      price: 'NT$3683',
      category: '滑板',
      label: '新品'
    },
    {
      id: 2,
      title: '6ix9ine原裝CD專輯',
      image: 'https://shoplineimg.com/59b2d9e49a76f018310010d2/5d299190d0467a0038ae06eb/800x.webp?source_format=jpg',
      price: 'NT$550',
      category: '饒舌',
      label: ''
    },
    {
      id: 3,
      title: '復古手提箱造型藍芽',
      image: 'https://shoplineimg.com/59b2d9e49a76f018310010d2/5e908f90c0e941001e48bc23/800x.webp?source_format=jpg',
      price: 'NT$4980',
      category: 'DJ',
      label: ''
    },
    {
      id: 4,
      title: 'Raw經典煙紙品牌滑板',
      image: 'https://shoplineimg.com/59b2d9e49a76f018310010d2/5ecf805b323c4a00273a9717/800x.webp?source_format=png',
      price: 'NT$2880',
      category: '滑板',
      label: ''
    }
  ]

  return (
    <div className='recommendations container'>
      <h2>你可能會喜歡</h2>
      <div className='product-item-container'>
        {fakeProducts.map((product) => (
          <div className='product-item' key={product.id}>
            <div className='product-img'>
              <img src={product.image} alt={product.title} />
              <a href='#' className='favorite'>
                <i className='fa-regular fa-heart'></i>
              </a>
            </div>
            <div className='labels'>
              <span className='label'>{product.category}</span>
              {product.label && <span className='label new'>{product.label}</span>}
            </div>
            <div className='product-info'>
              <h4>{product.title}</h4>
              <div className='product-text'>
                <p>{product.price}</p>
                <button className='add-to-cart'>查看更多</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// 商品詳細資訊頁面組件
const ProductDetail = () => {
  const { productId } = useParams()
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isFavorited, setIsFavorited] = useState(false)
  const [isNew, setIsNew] = useState(false)
  const [isOnSale, setIsOnSale] = useState(false)

  useEffect(() => {
    axios
      .get(`http://localhost:3000/riverflow/products/${productId}`)
      .then((response) => {
        const data = response.data

        if (!data.productInfo || data.productInfo.length === 0) {
          console.error('No product info available')
          return
        }

        const productData = data.productInfo[0]

        // 設置產品詳細信息
        setIsNew(productData.productStatus === 'New')
        setIsOnSale(productData.discount > 0)

        // 檢查是否已加入我的最愛
        const isFavorite = data.productFavorite.some(
          (fav) => fav.productId === productId && fav.userId === currentUserId
        )
        setIsFavorited(isFavorite)

        // 處理產品選項
        try {
          productData.sizes = productData.productOpt ? JSON.parse(productData.productOpt).map((opt) => opt.name) : []
        } catch (error) {
          console.error('Error parsing product options:', error)
          productData.sizes = []
        }

        // 處理產品圖片
        productData.images = data.productImg ? data.productImg.map((img) => img.productImg) : []

        // 處理產品評分
        try {
          const ratingData = productData.productRating ? JSON.parse(productData.productRating) : []
          productData.rating =
            ratingData.length > 0 ? ratingData.reduce((acc, curr) => acc + curr.rating, 0) / ratingData.length : 'N/A'
        } catch (error) {
          console.error('Error parsing product ratings:', error)
          productData.rating = 'N/A'
        }

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

  const toggleFavorite = async () => {
    try {
      if (isFavorited) {
        await axios.delete('http://localhost:3000/riverflow/favorite', { data: { productId, userId: currentUserId } })
      } else {
        await axios.post('http://localhost:3000/riverflow/favorite', { productId, userId: currentUserId })
      }
      setIsFavorited(!isFavorited)
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

  const unitPrice = product ? parseInt(product.productPrice, 10) : 0
  const totalPrice = `NT$${unitPrice * quantity}`

  const handleSizeSelect = (size) => setSelectedSize(size)
  const handleQuantityChange = (delta) => setQuantity((prev) => Math.max(1, prev + delta))

  const handleAddToCart = async () => {
    if (!selectedSize) {
      Swal.fire({
        icon: 'error',
        title: '請選擇尺寸規格',
        confirmButtonColor: 'red'
      })
      return
    }

    console.log('Adding to cart: ', { productId, quantity, selectedSize })

    const cartData = {
      productId: productId,
      quantity: quantity,
      productName: product.productName,
      productOpt: selectedSize,
      price: product.productPrice
    }

    try {
      const response = await axios.post('http://localhost:3000/riverflow/cart/add', cartData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })

      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: '已成功加入購物車',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        })
      } else {
        throw new Error('加入購物車失敗')
      }
    } catch (error) {
      console.error('加入購物車時出錯：', error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className='w-bg scrollCust'>
      <Header />
      <div className='container-f'>
        <div className='wrap'>
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
                isNew={isNew} // 傳遞 isNew
                isOnSale={isOnSale} // 傳遞 isOnSale
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
