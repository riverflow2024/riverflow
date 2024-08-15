import React, { useState, useEffect } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'
import resetStyles from '../assets/reset.module.css'
import '../assets/ProductAll.css'
// import '@fortawesome/fontawesome-free/css/all.min.css'
import Header from '../components/header'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Banner = () => {
  useEffect(() => {
    const swiper = new Swiper('.swiper', {
      autoplay: { delay: 4000, loop: true },
      pagination: { el: '.swiper-pagination' },
      scrollbar: { el: '.swiper-scrollbar' }
    })

    return () => swiper.destroy()
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
              絕對塗鴉行是專為塗鴉藝術家、街頭藝術愛好者和創意達人打造的專業噴漆用品商店。無論你是初學者還是資深塗鴉藝術家，這裡都有你需要的一切。
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
              自由滑行是滑板愛好者的天堂，無論你是初學者還是資深滑板玩家，這裡都能滿足你的需求。我們致力於提供最優質的滑板、配件及裝備，助你在滑行中展現最佳狀態。
            </p>
          </div>
        </section>
        <section className="swiper-slide">
          <img src="https://web.cheers.com.tw/event/2019fwf/assets/img/article/009.jpg" alt="DJ" />
          <div className="swiper-text">
            <h1>唱片騎師</h1>
            <p>
              DJ，即唱片騎師，是派對和音樂節的靈魂。他們掌握著音樂的節奏，創造獨特的聽覺體驗，點燃現場的每一個角落。
            </p>
          </div>
        </section>
        <section className="swiper-slide">
          <img
            src="https://media.gq.com.tw/photos/5dbcbd532551d400086a9647/master/w_1600%2Cc_limit/2015052266764869.jpg"
            alt="RAP"
          />
          <div className="swiper-text">
            <h1>Beans & Beats Records</h1>
            <p>
              身為嘻哈音樂廠牌的顏社，在實體唱片逐漸沒落情況下，還放膽在咖啡店樓下成立一間唱片行「Beans & Beats
              Records」，以嘻哈音樂為主。
            </p>
          </div>
        </section>
        <section className="swiper-slide">
          <img
            src="https://d1j71ui15yt4f9.cloudfront.net/wp-content/uploads/2023/07/18203055/71004a-20230718141533714-0.jpg"
            alt="Street Dance"
          />
          <div className="swiper-text">
            <h1>街舞</h1>
            <p>
              街舞是一種充滿能量和創意的舞蹈形式，起源於嘻哈文化。街舞不僅是一種表演藝術，更是一種文化象徵，代表了年輕人的自由和活力。
            </p>
          </div>
        </section>
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
            onFilterChange('刷碟')
          }}
          className={selectedCategory === '刷碟' ? 'selected' : ''}
        >
          DJ | Disc Jockey
        </a>
      </li>
      <li className="shop-filter-item">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onFilterChange('街舞')
          }}
          className={selectedCategory === '街舞' ? 'selected' : ''}
        >
          街舞 | Street Dance
        </a>
      </li>
      <li className="shop-filter-item">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onFilterChange('饒舌')
          }}
          className={selectedCategory === '饒舌' ? 'selected' : ''}
        >
          饒舌 | Rap
        </a>
      </li>
      <li className="shop-filter-item">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onFilterChange('塗鴉')
          }}
          className={selectedCategory === '塗鴉' ? 'selected' : ''}
        >
          塗鴉 | Graffiti
        </a>
      </li>
      <li className="shop-filter-item">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onFilterChange('滑板')
          }}
          className={selectedCategory === '滑板' ? 'selected' : ''}
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
            onFilterChange('刷碟')
          }}
          className={selectedCategory === '刷碟' ? 'selected' : ''}
        >
          刷碟 Disc Jockey (DJ)
        </a>
      </li>
      <li className="shop-filter-item">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onFilterChange('街舞')
          }}
          className={selectedCategory === '街舞' ? 'selected' : ''}
        >
          街舞 Street Dance
        </a>
      </li>
      <li className="shop-filter-item">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onFilterChange('饒舌')
          }}
          className={selectedCategory === '饒舌' ? 'selected' : ''}
        >
          饒舌 Rap
        </a>
      </li>
      <li className="shop-filter-item">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onFilterChange('塗鴉')
          }}
          className={selectedCategory === '塗鴉' ? 'selected' : ''}
        >
          塗鴉 Graffiti
        </a>
      </li>
      <li className="shop-filter-item">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onFilterChange('滑板')
          }}
          className={selectedCategory === '滑板' ? 'selected' : ''}
        >
          滑板 Skate
        </a>
      </li>
    </ul>
  </aside>
)

const ProductItem = ({ product, toggleFavorite }) => (
  <div className={`product-item ${product.isSoldOut ? 'sold-out-card' : ''}`} data-category={`${product.categoryName}`}>
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
        <i className={`fa-regular fa-heart ${product.isFavorited ? 'selected' : ''}`}></i>
      </a>
      {product.isSoldOut && <div className="sold-out">SOLD OUT</div>}
    </div>
    <div className="labels">
      <span className="label">{product.categoryName}</span>
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
        <Link to={`/Product/Detail/${product.productId}`} className="look-btn">
          查看商品
        </Link>
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
          const isFavorited = false

          const isNewProduct =
            new Date(product.launchDate) > new Date('2024-07-01') && product.productStatus === 'Available'

          return {
            productId: product.productId,
            image: productImages.length > 0 ? productImages[0].productImg : '',
            alt: product.productName,
            categoryName: product.categoryName,
            label: product.discount > 0 ? '優惠' : isNewProduct ? '新品' : 'normal',
            title: product.productName,
            price: `NT$${product.productPrice}`,
            oldPrice: product.discount > 0 ? `NT$${product.productPrice * (1 + product.discountRate)}` : '',
            isSoldOut: product.productStatus === 'Out of Stock',
            isFavorited: isFavorited
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
    if (filterCategory === 'new') return product.label === '新品'
    if (filterCategory === 'sale') return product.label === '優惠'
    return product.categoryName === filterCategory
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
      <Header />
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
