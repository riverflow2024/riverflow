import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../utils/EventIndex.js'
import '../assets/event/eventPage1.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Navigation, EffectCoverflow } from 'swiper/modules'
import 'swiper/css/bundle'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import Header from '../components/header'
import Footer from '../components/footer'
import axios from 'axios'

import yitaiImg from '../assets/images/events/event-yitai.jpg'
import galiImg from '../assets/images/events/event-gali.jpg'
import yeemaoImg from '../assets/images/events/event-yeemao.png'
import lunarfaceImg from '../assets/images/events/event-LUNARFACE.jpg'

const eventData = [
  {
    id: 1,
    category: 'rap',
    image: yitaiImg,
    title: '王以太 《Love Me Later》 台北站',
    date: '2024-09-12 至 2024-09-14',
    link: '../static/eventPage2.html'
  },
  {
    id: 2,
    category: 'streetdance',
    image: galiImg,
    title: 'GALI 《STRIPELIVE》IN TAIPEI',
    date: '2024-09-14 至 2024-09-14',
    link: '#'
  },
  {
    id: 3,
    category: 'rap',
    image: yitaiImg,
    title: '王以太 《Love Me Later》 台北站',
    date: '2024-09-12 至 2024-09-14',
    link: '../static/eventPage2.html'
  },
  {
    id: 4,
    category: 'streetdance',
    image: galiImg,
    title: 'GALI 《STRIPELIVE》IN TAIPEI',
    date: '2024-09-14 至 2024-09-14',
    link: '#'
  }
]

const EventSwiper = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
      autoplay={true}
      direction={'horizontal'}
      loop={true}
      navigation
      slidesPerView={1.5}
      effect='coverflow'
      centeredSlides={true}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: true
      }}
      className='swiper'
    >
      <SwiperSlide>
        <a href='#'>
          <img src={yitaiImg} alt='DJ Contest' />
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a href='#'>
          <img src={galiImg} alt='Street Dancers Performing' />
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a href='#'>
          <img src={yeemaoImg} alt='Street Dance Crew' />
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a href='#'>
          <img src={lunarfaceImg} alt='Street Dancers' />
        </a>
      </SwiperSlide>
    </Swiper>
  )
}

const EventIndex = () => {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const [apiEventData, setApiEventData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        const response = await axios.get('http://localhost:3000/riverflow/events')
        setApiEventData(response.data)
        setLoading(false)
      } catch (err) {
        console.error('獲取事件數據時出錯：', err)
        setApiEventData(eventData)
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const dataToUse = apiEventData.length > 0 ? apiEventData : eventData

  const filteredEvents = dataToUse.filter(
    (event) =>
      (filter === 'all' || event.category === filter || event.eventType === filter) &&
      (event.title || event.eventName).toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleFilterClick = (e, filterValue) => {
    e.preventDefault();
    setFilter(filterValue);
  }

  if (loading) return <div>載入中...</div>

  return (
    <div className='w-bg scrollCust'>
      <Header />
      <div className='wrap container'>
        

        <div className='carousel'>
          <EventSwiper />
        </div>

        <div className='event'>
          <div className='eventFilter'>
            <div>
              <input
                type='text'
                placeholder='搜尋活動'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className='titleSelect'>
              <div>
                <a href='#' onClick={(e) => handleFilterClick(e,'all')}>
                  全部
                </a>
              </div>
              <div>
                <a href='#' onClick={(e) => handleFilterClick(e,'DJ')}>
                  DJ | Disc Jockey
                </a>
              </div>
              <div>
                <a href='#' onClick={(e) => handleFilterClick(e,'streetdance')}>
                  街舞 | Street Dance
                </a>
              </div>
              <div>
                <a href='#' onClick={(e) => handleFilterClick(e,'rap')}>
                  饒舌 | Rap
                </a>
              </div>
              <div>
                <a href='#' onClick={(e) => handleFilterClick(e,'graffiti')}>
                  塗鴉 | Graffiti
                </a>
              </div>
              <div>
                <a href='#' onClick={(e) => handleFilterClick(e,'skate')}>
                  滑板 | Skate
                </a>
              </div>
            </div>
          </div>

          <div className='eventList'>
            <div className='eventProduct'>
              {filteredEvents.map((event) => (
                <div
                  key={event.id || event.eventId}
                  className='eventCard'
                  data-category={event.category || event.eventType}
                >
                  <Link to={`/Event/Detail/${event.eventId}`}>
                    <img src={`/images/events/${event.eventImg}`} alt={event.title || event.eventName} />
                    <p>{ event.eventName}</p>
                    <p>{ new Date(event.eventDate).toLocaleDateString()}</p>
                  </Link>
                </div>
              ))}
            </div>
            <div className='eventListBtn'>
              <button>查看更多活動</button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default EventIndex
