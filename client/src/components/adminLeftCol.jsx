import React from 'react'
import { NavLink } from 'react-router-dom'
import '../assets/adminPage.css'

export default function LeftCol () {
  return (
    <div className='sideBar'>
      <div className='greeting flex'>
        <div>
          <span>管理帳號</span>，你好！
        </div>
        <button className='btn'>登出</button>
      </div>
      <div className='sideMenu'>
        <ul>
          <li className='sideMenuOpt'>
            <label className='menuTitle flex'>
              <i className='fa-solid fa-bag-shopping'> </i>商品管理
            </label>
            <ul className='secMenu'>
              <li>
                <NavLink to='/prdList' className='menuPage'>
                  商品列表
                </NavLink>
              </li>
              <li>
                <NavLink to='/prdOrder' className='menuPage'>
                  商品訂單
                </NavLink>
              </li>
            </ul>
          </li>
          <li className='sideMenuOpt'>
            <label className='menuTitle flex'>
              <i className='fa-solid fa-newspaper'> </i>專欄管理
            </label>
            <ul className='secMenu'>
              <li>
                <NavLink to='/blogList' className='menuPage'>
                  文章列表
                </NavLink>
              </li>
            </ul>
          </li>
          <li className='sideMenuOpt'>
            <label className='menuTitle flex'>
              <i className='fa-solid fa-calendar-days'> </i>活動管理
            </label>
            <ul className='secMenu'>
              <li>
                <NavLink to='/eventList' className='menuPage'>
                  活動列表
                </NavLink>
              </li>
              <li>
                <NavLink to='/eventOrder' className='menuPage'>
                  活動訂單
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
}
