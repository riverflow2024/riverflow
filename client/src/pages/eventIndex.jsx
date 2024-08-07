import React, { Component } from 'react'
import '../utils/EventIndex.js'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Scrollbar, A11y, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'

class EventIndex extends Component {
  state = {}
  render() {
    return (
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1.5}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        coverflowEffect={{
          depth: 200,
          rotate: 0,
          stretch: 0,
          slideShadows: true
        }}
        loop={true}
      >
        <SwiperSlide>
          <a href="#">
            <img
              src="https://res.cloudinary.com/shotgun/image/upload/ar_16:9,c_limit,f_auto,fl_lossy,q_auto,w_854/v1686313186/production/artworks/DJ_CONTEST_FINALE_1920x1080_zhvrs4"
              alt=""
            />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="#">
            <img
              src="https://www.juliacharleseventmanagement.co.uk/wp-content/uploads/2019/04/Street-Dancers-Performing-For-Audience.jpg"
              alt=""
            />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="#">
            <img
              src="https://www.juliacharleseventmanagement.co.uk/wp-content/uploads/2019/04/Street-Dance-Crew-For-Events.jpg"
              alt=""
            />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="#">
            <img
              src="https://www.juliacharleseventmanagement.co.uk/wp-content/uploads/2019/04/streetdancers1.jpg"
              alt=""
            />
          </a>
        </SwiperSlide>
      </Swiper>
    )
  }
}

export default EventIndex
