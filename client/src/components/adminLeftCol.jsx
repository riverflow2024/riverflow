import React, { Component } from 'react'
import '../assets/adminPage.css'

export default function LeftCol () {
  return (
    <div class="sideBar">
      <div class="greeting flex">
        <div>
          <span>管理帳號</span>，你好！
        </div>
        <button class="btn">登出</button>
      </div>
      <div class="sideMenu">
        <ul>
          <li class="sideMenuOpt">
            <label class="menuTitle flex">
              <i class="fa-solid fa-bag-shopping"></i>商品管理
            </label>
            <ul class="secMenu">
              <li>
                <a href="prdList.html" class="menuPage thisPage">
                  商品列表
                </a>
              </li>
              <li>
                <a href="prdOrder.html" class="menuPage">
                  商品訂單
                </a>
              </li>
            </ul>
          </li>
          <li class="sideMenuOpt">
            <label class="menuTitle flex">
              <i class="fa-solid fa-newspaper"></i>專欄管理
            </label>
            <ul class="secMenu">
              <li>
                <a href="blogList.html" class="menuPage">
                  文章列表
                </a>
              </li>
            </ul>
          </li>
          <li class="sideMenuOpt">
            <label class="menuTitle flex">
              <i class="fa-solid fa-calendar-days"></i>活動管理
            </label>
            <ul class="secMenu">
              <li>
                <a href="eventList.html" class="menuPage">
                  活動列表
                </a>
              </li>
              <li>
                <a href="eventOrder.html" class="menuPage">
                  活動訂單
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
}
