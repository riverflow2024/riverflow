import React from 'react'
import '../assets/style.css'
import AboutBanner from '../assets/images/aboutBanner.jpg'
import MemberPic1 from '../assets/images/memberPic_01.png'
import Header from '../components/header'

export default function AboutUs () {
  return (
    <div class='aboutPage'>
      <Header />
      <section>
        <div class='aboutBanner'>
          <img src={AboutBanner} alt='about_banner' />
        </div>
      </section>
      <section class='container'>
        <div class='gtitle'>
          <span>Members</span>
        </div>
        <div id='aboutMem01' class='memberIntro flex'>
          <div class='memImgBlk'>
            <img src={MemberPic1} alt='member_pic01' />
            <div class='memLabel'>Team Leader</div>
            <div class='memLabel purple'>Cat Lover :）</div>
          </div>
          <div class='memInfoBlk'>
            <div class='memNameInfo flex'>
              <div class='memName'>名字</div>
              <div class='memLink flex'>
                <a href='#'>
                  <i class='fa-brands fa-square-behance' />
                </a>
                <a href='#'>
                  <i class='fa-brands fa-instagram' />
                </a>
              </div>
            </div>
            <p>簡短的自我介紹約50字?簡短的自我介紹約50字?簡短的自我介紹約50字?簡短的自我介紹約50字?</p>
          </div>
        </div>
        <div id='aboutMem02' class='memberIntro flex picRight'>
          <div class='memImgBlk'>
            <img src={MemberPic1} alt='member_pic02' />
            <div class='memLabel purple label2'>UI/UX Designer</div>
            <div class='memLabel label2'>Gamer</div>
          </div>
          <div class='memInfoBlk'>
            <div class='memNameInfo flex'>
              <div class='memName'>名字</div>
              <div class='memLink flex'>
                <a href='#'>
                  <i class='fa-brands fa-square-behance' />
                </a>
                <a href='#'>
                  <i class='fa-brands fa-instagram' />
                </a>
              </div>
            </div>
            <p>
              簡短的自我介紹約50字?簡短的自我介紹約50字?簡短的自我介紹約50字?簡短的自我介紹約50字?簡短的自我介紹約50字?
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
