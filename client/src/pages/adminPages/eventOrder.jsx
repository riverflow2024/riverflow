import React from 'react'
import $ from 'jquery'
import { Link, useMatch } from 'react-router-dom'

export default function EventOrderList () {
  const match = useMatch('/admin/eventOrderList/*')

  $(function () {
    $('.Status').each(function (index, elem) {
      // console.log(elem.innerText)
      if (elem.innerText == '已付款') {
        $(this).css('color', 'var(--side)')
      } else if (elem.innerText == '已退票') {
        $(this).css('color', 'var(--cancel)')
      }
    })
  })

  return (
    <div className='main'>
      <div className='pageTitle'>活動訂單</div>
      <div className='flex'>
        <div className='flex'>
          <input type='text' name='' id='pdtSearch' className='search' placeholder='關鍵字搜尋' />
          <input type='submit' value='搜尋' />
        </div>
      </div>
      <table page='1' itemshowing='5' className='listTable'>
        <thead>
          <tr>
            <td>訂單標號</td>
            <td>訂購人姓名</td>
            <td>購買場次</td>
            <td>購買票數</td>
            <td>訂單價格</td>
            <td>狀態</td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody>
          <tr className='item'>
            <td className='evtOrderId'>240708102104</td>
            <td className='userName'>王O明</td>
            <td className='evtName'>第八屆【台北盃街舞大賽】</td>
            <td className='evtOrderNum'>4</td>
            <td className='evtOrderPrice'>
              <span>$</span>2800
            </td>
            <td className='Status'>已付款</td>
            <td className='itemOpt'>
              <div className='flex'>
                <Link to='edit'>
                  <button id='btnEdit' className='btn itemOpr orderEdit inline-flex'>
                    <i className='fa-solid fa-pen' />編輯狀態
                  </button>
                </Link>
              </div>
            </td>
          </tr>
          <tr className='item'>
            <td className='evtOrderId'>240708102105</td>
            <td className='userName'>王O明</td>
            <td className='evtName'>塗鴉藝術家展演【葛菈芙帝】</td>
            <td className='evtOrderNum'>3</td>
            <td className='evtOrderPrice'>
              <span>$</span>600
            </td>
            <td className='Status'>已退票</td>
            <td className='itemOpt'>
              <div className='flex'>
                <a href='eventOrderInfo.html'>
                  <button id='btnEdit' className='btn itemOpr orderEdit inline-flex'>
                    <i className='fa-solid fa-pen' />編輯狀態
                  </button>
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
