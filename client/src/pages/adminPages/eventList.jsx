import React from 'react'
import $ from 'jquery'
import { Link, useMatch } from 'react-router-dom'

export default function EventList () {
  const match = useMatch('/admin/eventList/*')

  $(function () {
    $('.Status').each(function (index, elem) {
      // console.log(elem.innerText)
      if (elem.innerText == '上架') {
        $(this).css('color', 'var(--side)')
      } else if (elem.innerText == '下架') {
        $(this).css('color', 'var(--err)')
      }
    })
  })

  return (
    <div class='main'>
      <div class='pageTitle'>活動列表</div>
      <div class='flex'>
        <Link to='edit' class='divided'>
          <button class='btn'>新增活動</button>
        </Link>
        <div class='flex'>
          <input type='text' name='' id='pdtSearch' class='search' placeholder='活動搜尋' />
          <input type='submit' value='搜尋' />
        </div>
      </div>
      <table page='1' itemshowing='5' class='listTable'>
        <thead>
          <tr>
            <td>類別</td>
            <td>活動名稱</td>
            <td>開賣時間</td>
            <td>開始時間</td>
            <td>場地</td>
            <td>狀態</td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody>
          <tr class='item'>
            <td class='eventSort'>
              <div class='sort'>DJ</div>
              <br />
            </td>
            <td class='eventTitle'>王以太《Love Me Later》台北站</td>
            <td class='time'>
              2024/09/12
              <br />
              19:00:00
            </td>
            <td class='time'>
              2024/09/14
              <br />
              22:00:00
            </td>
            <td class='prdId'>Legacy Max</td>
            <td class='Status'>上架</td>
            <td class='itemOpt'>
              <div class='flex'>
                <a href='addEvent.html'>
                  <button id='btnEdit' class='btn itemOpr inline-flex'>
                    <i class='fa-solid fa-pen' />編輯
                  </button>
                </a>
                <a href='#'>
                  <button id='btnView' class='btn itemOpr inline-flex'>
                    <i class='fa-solid fa-eye' />檢視
                  </button>
                </a>
              </div>
              <div class='flex'>
                <button id='btnSta' class='btn itemOpr inline-flex'>
                  <i class='fa-solid fa-arrow-down' />下架
                </button>
                <button class='btn itemOpr inline-flex'>
                  <i class='fa-solid fa-trash' />刪除
                </button>
              </div>
            </td>
          </tr>
          <tr class='item'>
            <td class='eventSort'>
              <div class='sort'>DJ</div>
              <br />
            </td>
            <td class='eventTitle'>GALI《STRIPELIVE》IN TAIPEI</td>
            <td class='time'>
              2024/09/14
              <br />
              19:00:00
            </td>
            <td class='time'>
              2024/09/17
              <br />
              22:00:00
            </td>
            <td class='prdId'>Legacy Max</td>
            <td class='Status'>上架</td>
            <td class='itemOpt'>
              <div class='flex'>
                <a href='#'>
                  <button id='btnEdit' class='btn itemOpr inline-flex'>
                    <i class='fa-solid fa-pen' />編輯
                  </button>
                </a>
                <a href='#'>
                  <button id='btnView' class='btn itemOpr inline-flex'>
                    <i class='fa-solid fa-eye' />檢視
                  </button>
                </a>
              </div>
              <div class='flex'>
                <button id='btnSta' class='btn itemOpr inline-flex'>
                  <i class='fa-solid fa-arrow-down' />下架
                </button>
                <button class='btn itemOpr inline-flex'>
                  <i class='fa-solid fa-trash' />刪除
                </button>
              </div>
            </td>
          </tr>
          <tr class='item'>
            <td class='eventSort'>
              <div class='sort'>DJ</div>
              <br />
            </td>
            <td class='eventTitle'>趙翊帆《LUNARFACE公測巡演》</td>
            <td class='time'>2024/08/30</td>
            <td class='time'>2024/08/31</td>
            <td class='prdId'>場館A</td>
            <td class='Status'>上架</td>
            <td class='itemOpt'>
              <div class='flex'>
                <a href='#'>
                  <button id='btnEdit' class='btn itemOpr inline-flex'>
                    <i class='fa-solid fa-pen' />編輯
                  </button>
                </a>
                <a href='#'>
                  <button id='btnView' class='btn itemOpr inline-flex'>
                    <i class='fa-solid fa-eye' />檢視
                  </button>
                </a>
              </div>
              <div class='flex'>
                <button id='btnSta' class='btn itemOpr inline-flex'>
                  <i class='fa-solid fa-arrow-down' />下架
                </button>
                <button class='btn itemOpr inline-flex'>
                  <i class='fa-solid fa-trash' />刪除
                </button>
              </div>
            </td>
          </tr>
          <tr class='item'>
            <td class='eventSort'>
              <div class='sort'>DJ</div>
              <br />
            </td>
            <td class='eventTitle'>夜貓組《啊是在Halloween？》</td>
            <td class='time'>2024/10/30</td>
            <td class='time'>2024/10/31</td>
            <td class='prdId'>場館A</td>
            <td class='Status'>上架</td>
            <td class='itemOpt'>
              <div class='flex'>
                <a href='#'>
                  <button id='btnEdit' class='btn itemOpr inline-flex'>
                    <i class='fa-solid fa-pen' />編輯
                  </button>
                </a>
                <a href='#'>
                  <button id='btnView' class='btn itemOpr inline-flex'>
                    <i class='fa-solid fa-eye' />檢視
                  </button>
                </a>
              </div>
              <div class='flex'>
                <button id='btnSta' class='btn itemOpr inline-flex'>
                  <i class='fa-solid fa-arrow-down' />下架
                </button>
                <button class='btn itemOpr inline-flex'>
                  <i class='fa-solid fa-trash' />刪除
                </button>
              </div>
            </td>
          </tr>
          <tr class='item'>
            <td class='eventSort'>
              <div class='sort'>DJ</div>
              <br />
            </td>
            <td class='eventTitle'>Orbit《NBA全明星陣容》</td>
            <td class='time'>2024/09/19</td>
            <td class='time'>2024/09/20</td>
            <td class='prdId'>場館A</td>
            <td class='Status'>上架</td>
            <td class='itemOpt'>
              <div class='flex'>
                <a href='#'>
                  <button id='btnEdit' class='btn itemOpr inline-flex'>
                    <i class='fa-solid fa-pen' />編輯
                  </button>
                </a>
                <a href='#'>
                  <button id='btnView' class='btn itemOpr inline-flex'>
                    <i class='fa-solid fa-eye' />檢視
                  </button>
                </a>
              </div>
              <div class='flex'>
                <button id='btnSta' class='btn itemOpr inline-flex'>
                  <i class='fa-solid fa-arrow-down' />下架
                </button>
                <button class='btn itemOpr inline-flex'>
                  <i class='fa-solid fa-trash' />刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
