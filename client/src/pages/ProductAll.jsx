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
import $ from 'jquery'
import '../utils/ProductAll.js'

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
        <section className="swiper-slide">
          <img src="https://web.cheers.com.tw/event/2019fwf/assets/img/article/009.jpg" alt="DJ" />
          <div className="swiper-text">
            <h1>唱片騎師</h1>
            <p>
              DJ，即唱片騎師，是派對和音樂節的靈魂。他們掌握著音樂的節奏，創造獨特的聽覺體驗，點燃現場的每一個角落。無論是在夜店、音樂節還是私人派對，DJ通過精湛的混音技術和敏銳的音樂品味，將不同風格的音樂無縫結合，製造出令人沉醉的音樂流。
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
              身為嘻哈音樂廠牌的顏社，當然無法忘記音樂初衷，在實體唱片逐漸沒落情況下，還放膽在咖啡店樓下成立一間唱片行「Beans
              & Beats Records」，以嘻哈音樂為主，要讓這間唱片行成為台北市的Hip hop音樂聚落。
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
              街舞是一種充滿能量和創意的舞蹈形式，起源於嘻哈文化。街舞舞者通過動感的動作和音樂，表達自己的情感和個性。街舞包括多種風格，如Breaking、Popping、Locking等，每一種風格都有其獨特的魅力和技巧。街舞不僅是一種表演藝術，更是一種文化象徵，代表了年輕人的自由和活力。
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
      <br />
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
      <br />
      <li className="shop-filter-item">
        <a href="#" data-filter="饒舌">
          饒舌 | Rap
        </a>
      </li>
      <br />
      <li className="shop-filter-item">
        <a href="#" data-filter="塗鴉">
          塗鴉 | Graffiti
        </a>
      </li>
      <br />
      <li className="shop-filter-item">
        <a href="#" data-filter="滑板">
          滑板 | Skate
        </a>
      </li>
      <br />
      <li className="shop-filter-item">
        <a href="#" data-filter="新品">
          新品 | New
        </a>
      </li>
      <br />
      <li className="shop-filter-item">
        <a href="#" data-filter="優惠">
          優惠 | On Sale
        </a>
      </li>
    </ul>
  </aside>
)

const RwdFilter = () => (
  <aside className="RWD-shop-filter">
    <ul id="categoryFilter">
      <li className="shop-filter-item">
        <a href="#" className="selected" data-filter="all">
          全部
        </a>
      </li>
      <br />
      <li className="shop-filter-item">
        <a href="#" data-filter="DJ">
          刷碟 Disc Jockey (DJ)
        </a>
      </li>
      <li className="shop-filter-item">
        <a href="#" data-filter="街舞">
          街舞 Street Dance
        </a>
      </li>
      <br />
      <li className="shop-filter-item">
        <a href="#" data-filter="饒舌">
          饒舌 Rap
        </a>
      </li>
      <br />
      <li className="shop-filter-item">
        <a href="#" data-filter="塗鴉">
          塗鴉 Graffiti
        </a>
      </li>
      <br />
      <li className="shop-filter-item">
        <a href="#" data-filter="滑板">
          滑板 Skate
        </a>
      </li>
      <br />
    </ul>
  </aside>
)

const ProductItem = ({ product }) => (
  <div
    className={`product-item ${product.isSoldOut ? 'sold-out-card' : ''}`}
    data-category={`${product.category} ${product.label}`}
  >
    <div className="product-img">
      <img src={product.image} alt={product.alt} />
      <a href="#" className="favorite">
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

// 數據先安捏寫
const ProductList = () => {
  const [products, setProducts] = useState([
    {
      image:
        'https://images.goodsmile.info/cgm/images/product/20220502/12665/98719/large/d870c31d5f264155ac6e3e359b7d34bc.jpg',
      alt: '滑板編號1',
      category: '滑板',
      label: '新品',
      title: '美式拼貼滑板',
      price: 'NT$3683',
      isSoldOut: false
    },
    {
      image: 'https://cdn2.ettoday.net/images/7509/e7509491.jpg',
      alt: 'DJ編號1',
      category: 'DJ',
      label: '優惠',
      title: 'DJ Soda夜店狂歡',
      oldPrice: 'NT$1899',
      price: 'NT$1599',
      isSoldOut: false
    },
    {
      image: 'https://i.pinimg.com/564x/a6/e7/eb/a6e7ebd5010ca995d3ae6eba145ad6e6.jpg',
      alt: '噴漆編號1',
      category: '塗鴉',
      label: 'normal',
      title: 'Lexel噴漆',
      price: 'NT$363',
      isSoldOut: false
    },
    {
      image: 'https://i.pinimg.com/564x/2f/e0/b4/2fe0b40030f71606eed42d826fa850cd.jpg',
      alt: '噴漆編號4',
      category: '噴漆',
      label: '新品',
      title: '雷神噴漆',
      price: 'NT$599',
      isSoldOut: false
    },
    {
      image: 'https://i.pinimg.com/564x/e0/c5/eb/e0c5eb508528548a8ee104fe60579f77.jpg',
      alt: '饒舌編號2',
      category: '饒舌',
      label: 'normal',
      title: 'RapperLai',
      price: 'NT$1199',
      isSoldOut: false
    },
    {
      image: 'https://i.pinimg.com/564x/7e/75/24/7e75244c7427c041237f60c1e18308a6.jpg',
      alt: '街舞編號1',
      category: '街舞',
      label: 'normal',
      title: '台大街舞Battle盃',
      price: 'NT$200',
      isSoldOut: true
    }
  ])

  return (
    <main className="product-list">
      {products.map((product, index) => (
        <ProductItem key={index} product={product} />
      ))}
    </main>
  )
}

const ProductAll = () => {
  useEffect(() => {
    '../utils/ProductAll.js'
  }, [])

  return (
    <>
      <section className={`wrap-f ${resetStyles.reset}`}>
        <div className="container-f">
          <Banner />
        </div>
      </section>
      <section className={`wrap  ${resetStyles.reset}`}>
        <div className="container">
          <Filter />
          <RwdFilter />
          <ProductList />
        </div>
      </section>
    </>
  )
}

export default ProductAll
