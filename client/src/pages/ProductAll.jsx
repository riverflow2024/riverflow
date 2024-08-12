import React, { useState, useEffect } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'
import resetStyles from '../assets/reset.module.css'
import '../assets/basic.css'
import '../assets/ProductAll.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import axios from 'axios'

const Banner = () => {
  useEffect(() => {
    new Swiper('.swiper', {
      autoplay: { delay: 4000, loop: true },
      pagination: { el: '.swiper-pagination' },
      scrollbar: { el: '.swiper-scrollbar' }
    })
  }, [])

  return (
    <div className="swiper">
      <div className="swiper-wrapper">
        <section className="swiper-slide">
          <img
            src="https://vibrancefestival-live-83932ec24f1845258-f0d579e.divio-media.com/images/PXL_20210325_221726325.fddd6140.fill-900x420.jpg"
            alt="塗鴉"
          />
          <div className="swiper-text">
            <h1>絕對塗鴉行</h1>
            <p>
              絕對塗鴉行
              是專為塗鴉藝術家、街頭藝術愛好者和創意達人打造的專業噴漆用品商店。無論你是初學者還是資深塗鴉藝術家，這裡都有你需要的一切。從高品質的噴漆罐到各式塗鴉工具，我們提供最全面的產品選擇，助你創造出色的藝術作品。
            </p>
          </div>
        </section>
        <section className="swiper-slide">
          <img
            src="https://cdn.shopify.com/s/files/1/0530/0695/8744/t/22/assets/skate-shops-1683383358868.jpg?v=1683383359"
            alt="skate"
          />
          <div className="swiper-text">
            <h1>自由滑行</h1>
            <p>
              自由滑行
              是滑板愛好者的天堂，無論你是初學者還是資深滑板玩家，這裡都能滿足你的需求。我們致力於提供最優質的滑板、配件及裝備，助你在滑行中展現最佳狀態。來到自由滑行，享受滑板帶來的無限快樂與自由！
            </p>
          </div>
        </section>
        {/* 其他 Banner 內容 */}
      </div>
      <div className="swiper-scrollbar"></div>
    </div>
  )
}

const Filter = ({ onFilterChange, selectedCategory }) => (
  <aside className="shop-filter">
    <div className="filter-text">
      <h3>商品搜尋欄</h3>
      <input
        type="text"
        id="searchInput"
        placeholder="請輸入商品名稱"
        onChange={(e) => onFilterChange(e.target.value)}
      />
    </div>
    <ul id="categoryFilter">
      <li className="shop-filter-item">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onFilterChange('all')
          }}
          className={selectedCategory === 'all' ? 'selected' : ''}
        >
          全部類別
        </a>
      </li>
      <li className="shop-filter-item">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onFilterChange('dj')
          }}
          className={selectedCategory === 'dj' ? 'selected' : ''}
        >
          DJ | Disc Jockey
        </a>
      </li>
      <li className="shop-filter-item">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onFilterChange('streetDance')
          }}
          className={selectedCategory === 'streetDance' ? 'selected' : ''}
        >
          街舞 | Street Dance
        </a>
      </li>
      <li className="shop-filter-item">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onFilterChange('rap')
          }}
          className={selectedCategory === 'rap' ? 'selected' : ''}
        >
          饒舌 | Rap
        </a>
      </li>
      <li className="shop-filter-item">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onFilterChange('graffiti')
          }}
          className={selectedCategory === 'graffiti' ? 'selected' : ''}
        >
          塗鴉 | Graffiti
        </a>
      </li>
      <li className="shop-filter-item">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onFilterChange('skate')
          }}
          className={selectedCategory === 'skate' ? 'selected' : ''}
        >
          滑板 | Skate
        </a>
      </li>
      <br />
      <li className="shop-filter-item">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onFilterChange('new')
          }}
          className={selectedCategory === 'new' ? 'selected' : ''}
        >
          新品 | New
        </a>
      </li>
      <li className="shop-filter-item">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onFilterChange('sale')
          }}
          className={selectedCategory === 'sale' ? 'selected' : ''}
        >
          優惠 | On Sale
        </a>
      </li>
    </ul>
  </aside>
)

const RwdFilter = ({ onFilterChange, selectedCategory }) => (
  <aside className="RWD-shop-filter">
    <ul id="categoryFilter">
      <li className="shop-filter-item">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onFilterChange('all')
          }}
          className={selectedCategory === 'all' ? 'selected' : ''}
        >
          全部
        </a>
      </li>
      <li className="shop-filter-item">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onFilterChange('dj')
          }}
          className={selectedCategory === 'dj' ? 'selected' : ''}
        >
          刷碟 Disc Jockey (DJ)
        </a>
      </li>
      <li className="shop-filter-item">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onFilterChange('streetDance')
          }}
          className={selectedCategory === 'streetDance' ? 'selected' : ''}
        >
          街舞 Street Dance
        </a>
      </li>
      <li className="shop-filter-item">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onFilterChange('rap')
          }}
          className={selectedCategory === 'rap' ? 'selected' : ''}
        >
          饒舌 Rap
        </a>
      </li>
      <li className="shop-filter-item">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onFilterChange('graffiti')
          }}
          className={selectedCategory === 'graffiti' ? 'selected' : ''}
        >
          塗鴉 Graffiti
        </a>
      </li>
      <li className="shop-filter-item">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onFilterChange('skate')
          }}
          className={selectedCategory === 'skate' ? 'selected' : ''}
        >
          滑板 Skate
        </a>
      </li>
    </ul>
  </aside>
)

const ProductItem = ({ product, toggleFavorite }) => (
  <div className={`product-item ${product.isSoldOut ? 'sold-out-card' : ''}`} data-category={`${product.category}`}>
    <div className="product-img">
      <img src={product.image} alt={product.alt} />
      <a
        href="#"
        className={`favorite ${product.isFavorited ? 'selected' : ''}`}
        onClick={(e) => {
          e.preventDefault()
          toggleFavorite(product)
        }}
      >
        <i className="fa-regular fa-heart"></i>
      </a>
      {product.isSoldOut && <div className="sold-out">SOLD OUT</div>}
    </div>
    <div className="labels">
      <span className="label">{product.category}</span>
      {product.label !== 'normal' && (
        <span className={`label ${product.label === '新品' ? 'new' : ''} ${product.label === '優惠' ? 'sale' : ''}`}>
          {product.label}
        </span>
      )}
    </div>
    <div className="product-info">
      <h4>{product.title}</h4>
      <div className="product-text">
        {product.oldPrice && <p style={{ textDecoration: 'line-through' }}>{product.oldPrice}</p>}
        <p className={product.oldPrice ? 'discount-price' : ''}>{product.price}</p>
        <a href="./ProductDetail.html" className="look-btn">
          查看商品
        </a>
      </div>
    </div>
  </div>
)

const ProductList = ({ filterCategory }) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3000/riverflow/products')
      .then((response) => {
        const allProducts = response.data.getAllProductInfo.map((product) => {
          const productImages = response.data.getAllProductImg.filter((img) => img.productId === product.productId)
          const isFavorited = response.data.getAllProductFavorite.some((fav) => fav.productId === product.productId)
          return {
            image: productImages.length > 0 ? productImages[0].productImg : '',
            alt: product.productName,
            category: product.categoryName,
            label: product.discount > 0 ? '優惠' : product.productStatus === 'Available' ? '新品' : 'normal',
            title: product.productName,
            price: `NT$${product.productPrice}`,
            oldPrice: product.discount > 0 ? `NT$${product.productPrice * (1 + product.discountRate)}` : '',
            isSoldOut: product.productStatus === 'Out of Stock',
            isFavorited
          }
        })
        setProducts(allProducts)
      })
      .catch((error) => {
        console.error('Error fetching product data:', error)
      })
  }, [])

  const toggleFavorite = (product) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.title === product.title ? { ...p, isFavorited: !p.isFavorited } : p))
    )
  }

  const filteredProducts = products.filter((product) => {
    if (filterCategory === 'all') return true
    return product.category === filterCategory
  })

  return (
    <main className="product-list">
      {filteredProducts.map((product, index) => (
        <ProductItem key={index} product={product} toggleFavorite={toggleFavorite} />
      ))}
    </main>
  )
}

const ProductAll = () => {
  const [filterCategory, setFilterCategory] = useState('all')

  return (
    <>
      <section className={`wrap-f ${resetStyles.reset}`}>
        <div className="container-f">
          <Banner />
        </div>
      </section>
      <section className={`wrap ${resetStyles.reset}`}>
        <div className="container">
          <Filter onFilterChange={setFilterCategory} selectedCategory={filterCategory} />
          <RwdFilter onFilterChange={setFilterCategory} selectedCategory={filterCategory} />
          <ProductList filterCategory={filterCategory} />
        </div>
      </section>
    </>
  )
}

export default ProductAll
