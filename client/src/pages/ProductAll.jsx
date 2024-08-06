import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Swiper, { Navigation, Pagination } from 'swiper'
import '../assets/reset.css'

import '../assets/ProductAll.css'
import '../assets/index.css'

const Header = () => (
  <div className="header">
    <img src="../../assets/images/indexImg/nav.jpg" alt="Nav" />
  </div>
)

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
      </div>
      <div className="swiper-scrollbar"></div>
    </div>
  )
}

const Filter = () => (
  <aside className="shop-filter">
    <div className="filter-text">
      <h3>商品搜尋欄</h3>
      <input type="text" id="searchInput" placeholder="請輸入商品名稱" />
    </div>
    <ul id="categoryFilter">
      <li className="shop-filter-item">
        <a href="#" className="selected" data-filter="all">
          全部類別
        </a>
      </li>
      <li className="shop-filter-item">
        <a href="#" data-filter="DJ">
          DJ | Disc Jockey{' '}
        </a>
      </li>
      <li className="shop-filter-item">
        <a href="#" data-filter="街舞">
          街舞 | Street Dance
        </a>
      </li>
      <li className="shop-filter-item">
        <a href="#" data-filter="饒舌">
          饒舌 | Rap
        </a>
      </li>
      <li className="shop-filter-item">
        <a href="#" data-filter="塗鴉">
          塗鴉 | Graffiti
        </a>
      </li>
      <li className="shop-filter-item">
        <a href="#" data-filter="滑板">
          滑板 | Skate
        </a>
      </li>
      <li className="shop-filter-item">
        <a href="#" data-filter="新品">
          新品 | New
        </a>
      </li>
      <li className="shop-filter-item">
        <a href="#" data-filter="優惠">
          優惠 | On Sale
        </a>
      </li>
    </ul>
  </aside>
)

const ProductItem = ({ product }) => (
  <div className="product-item" data-category={`${product.category} ${product.label}`}>
    <div className="product-img">
      <img src={product.image} alt={product.alt} />
      <a href="#" className="favorite">
        <i className="fa-regular fa-heart"></i>
      </a>
    </div>
    <div className="labels">
      <span className="label">{product.category}</span>
      <span className="label">{product.label}</span>
    </div>
    <div className="product-info">
      <h4>{product.title}</h4>
      <div className="product-text">
        <p>{product.price}</p>
        <a href="./ProductDetail.html" className="look-btn">
          查看商品
        </a>
      </div>
    </div>
  </div>
)

const ProductList = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    // 使用 axios 獲取產品數據
    axios
      .get('/api/products')
      .then((response) => {
        setProducts(response.data)
      })
      .catch((error) => {
        console.error('Error fetching products:', error)
      })
  }, [])

  return (
    <main className="product-list">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </main>
  )
}

const ProductAll = () => {
  return (
    <div className="container-f">
      <Header />
      <Banner />
      <section className="container">
        <Filter />
        <ProductList />
      </section>
    </div>
  )
}

export default ProductAll
