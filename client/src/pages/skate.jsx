import React, { useEffect } from 'react'
import $ from 'jquery'
import 'jquery.marquee'
import Parallax from 'parallax-js'
import gsap from 'gsap'
import ScrollMagic from 'scrollmagic'

// 引入圖片
import skateTitle from '../assets/images/skate/SkateTitle.png'
import skatepeople from '../assets/images/skate/skatepeople.jpg'
import skatepeople2 from '../assets/images/skate/skatepeople2.webp'
import cute from '../assets/images/skate/cute.png'
import cute2 from '../assets/images/skate/噴漆滑板去背.png'
import challenge from '../assets/images/skate/challenge噴漆.png'
import skateskill from '../assets/images/skate/skateskill.jpg'
import skateskillThree from '../assets/images/skate/skateskillThree.webp'
import lightning from '../assets/images/skate/lightning.svg.png'
import star from '../assets/images/skate/star.svg.png'
import RiverFlow1 from '../assets/images/skate/RiverFlow1.png'
import skateimg1 from '../assets/images/skate/skateimg1.png'
import skateimg2 from '../assets/images/skate/skateimg2.png'
import skateimg3 from '../assets/images/skate/skateimg3.png'
import skateimg4 from '../assets/images/skate/skateimg4.png'
import LetSkate from '../assets/images/skate/LetSkate.png'

import '../assets/skate.css'

const Skate = () => {
  useEffect(() => {
    // 初始化跑馬燈
    $('.marquee').marquee({
      allowCss3Support: true,
      css3easing: 'linear',
      delayBeforeStart: -35000,
      direction: 'left',
      duplicated: true,
      duration: 25000,
      gap: 20,
      pauseOnCycle: false,
      pauseOnHover: false,
      startVisible: false
    })

    // 手動設置背景圖片
    document.querySelector('.parallax-window').style.backgroundImage = `url(${skatepeople})`
    document.querySelector('.parallax-window-2').style.backgroundImage = `url(${skatepeople2})`
    document.querySelector('.parallax-window-3').style.backgroundImage = `url(${skateskill})`
    document.querySelector('.parallax-window-4').style.backgroundImage = `url(${skateskillThree})`

    // 初始化視差效果
    const parallaxElements = document.querySelectorAll('.parallax-window')
    parallaxElements.forEach((el) => {
      new Parallax(el)
    })

    // scroll 疊加效果製作
    var controller = new ScrollMagic.Controller()

    var wipeAnimation = gsap
      .timeline() // 使用 gsap.timeline() 替代 TimelineMax
      .fromTo('section.panel.two-img', { x: '-100%' }, { x: '0%', ease: 'none', duration: 1 }) // in from left
      .fromTo('section.panel.three-img', { x: '100%' }, { x: '0%', ease: 'none', duration: 1 }) // in from right
      .fromTo('section.panel.four-img', { x: '-100%' }, { x: '1%', ease: 'none', duration: 1 }) // in from left
      .fromTo('section.panel.five-img', { x: '100%' }, { x: '0%', ease: 'none', duration: 1 }) // in from right
      .fromTo('section.panel.six-text', { y: '100%' }, { x: '0%', ease: 'none', duration: 1 }) // in from right

    var scene = new ScrollMagic.Scene({
      triggerElement: '#pinContainer',
      triggerHook: 'onLeave',
      duration: '400%'
    })
      .setPin('#pinContainer')
      .setTween(wipeAnimation)
      .addTo(controller)

    // 清理函數
    return () => {
      // 清除跑馬燈
      $('.marquee').marquee('destroy')

      // 清除 ScrollMagic
      scene.destroy(true)
      controller.destroy(true)
    }
  }, [])

  return (
    <div className="scrollCust">
      <main>
        <section className="intro">
          <img src={skateTitle} className="skateImg" alt="Group" />
          <div className="text">
            <h1>
              滑板
              <br />
              挑戰帶來的成長與快樂
            </h1>
          </div>
        </section>
        <section className="sectionTwo">
          <div className="imageHalf">
            <div className="parallax-window " data-parallax="scroll"></div>
            <div className="parallax-window parallax-window-2" data-parallax="scroll"></div>
          </div>
          <div className="sectionTwoDetails">
            <h2>
              滑板
              <br />
              不僅僅是
              <br />
              一項運動
            </h2>
            <p>
              滑板提供了無與倫比的體驗，這不僅僅是一項運動，而是一種促進社區和創造力的生活方式。無論你是初學者還是專業滑手，滑板都能將人們聚集在一起，共享它所帶來的激情與自由。滑板運動不僅能夠強化身體素質，還能培養團隊合作精神和創意思維，體驗滑板所提供的無限可能，探索更多前所未有的挑戰與樂趣。
            </p>
          </div>
          <img className="cuteImg" src={cute} alt="cute" />
        </section>
        <section className="marquee-text">
          <div className="marquee" data-optionname="value">
            <p>RiverFlow✧Skate✧</p>
          </div>
        </section>
        <section className="community">
          <h2>
            挑戰
            <br />
            與技巧
          </h2>
          <p>
            滑板運動代表著挑戰和創新。從基本的平衡和滑行技巧，到高難度的空中動作和翻轉，滑板提供了無限的探索空間。這項運動不僅能增強體能，還能提升心理素質，幫助滑手們在面對困難時保持冷靜和專注。每一次的跌倒與重來，都是對意志力的考驗與磨練。滑板社區是一個充滿支持和鼓勵的地方，無論你是新手還是老手，都能在這裡找到歸屬感和認同感。滑板是一種生活態度，帶給你無限的可能和無窮的挑戰。
          </p>
          <img className="cuteImgTwo" src={cute2} alt="cute2" />
          <img className="challenge" src={challenge} alt="challenge" />
        </section>
        <section className="sustain-right">
          <div className="parallax-window parallax-window-3" data-parallax="scroll"></div>
          <div className="sustain-right-text">
            <h2>
              我們是 <br />
              極限 <br />
              挑戰者
            </h2>
            <p>
              滑板運動強調力量、靈活性和無盡的興奮。它挑戰身體的極限，讓滑板高手體驗前所未有的刺激。滑板不僅僅是一項運動，更是一種不懈追求新高度和大膽壯舉的旅程。它體現了冒險精神，挑戰極限，享受滑行的自由。
            </p>
            <img className="lightning" src={lightning} alt="lightning" />
          </div>
        </section>
        <section className="sustain-left">
          <div className="parallax-window parallax-window-4" data-parallax="scroll"></div>
          <div className="sustain-left-text">
            <h2>
              我們是 <br />
              冒險家
            </h2>
            <p>
              滑板運動就像征服新的高度一樣刺激。只需一塊滑板和正確的心態，你就能探索這個不同的世界，創造難忘的體驗。從城市街頭到滑板公園，每一次滑行都是一次新的冒險。滑板不僅能增強你的體能，還能鍛煉你的平衡感和靈活性。享受風馳電掣的快感，挑戰自己的極限。
            </p>
            <img className="star" src={star} alt="star" />
          </div>
        </section>
        <div id="pinContainer">
          <section className="panel one-img">
            <img src={RiverFlow1} alt="RiverOne" />
          </section>
          <section className="panel two-img">
            <img src={skateimg1} alt="skate" />
          </section>
          <section className="panel three-img">
            <img src={skateimg2} alt="skate" />
          </section>
          <section className="panel four-img">
            <img src={skateimg3} alt="skate" />
          </section>
          <section className="panel five-img">
            <img src={skateimg4} alt="skate" />
          </section>
          <section className="end">
            <h2>
              一同成為
              <br /> 滑板友好伙伴
            </h2>
            <img src={LetSkate} alt="LetSkate" />
          </section>
        </div>
      </main>
    </div>
  )
}

export default Skate
