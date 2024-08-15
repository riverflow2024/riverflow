import React from 'react'
import $ from 'jquery'
import { Link, useMatch } from 'react-router-dom'

export default function PrdOrderList () {
  const match = useMatch('/admin/prdOrderList/*')

  $(function () {
    $('.Status').each(function (index, elem) {
      // console.log(elem.innerText)
      if (elem.innerText == '已完成') {
        $(this).css('color', 'var(--side)')
      } else if (elem.innerText == '已取消') {
        $(this).css('color', 'var(--cancel)')
      }
    })
  })

  return (
    <div className='main'>
      <div className='pageTitle'>商品訂單</div>
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
            <td>訂購人手機</td>
            <td>訂單價格</td>
            <td>付款方式</td>
            <td>狀態</td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody>
          <tr prdorderid='1' className='item'>
            <td className='prdOrderId'>240708102104</td>
            <td className='userName'>王O明</td>
            <td className='userPhone'>0900000001</td>
            <td className='prdOrderPrice'>
              <span>$</span>1120
            </td>
            <td className='prdPayment'>線上付款</td>
            <td className='Status'>已完成</td>
            <td className='itemOpt'>
              <div className='flex'>
                <Link to='edit'>
                  <button id='btnEdit' className='btn itemOpr orderEdit inline-flex'>
                    <i className='fa-solid fa-pen' />
                    編輯狀態
                  </button>
                </Link>
              </div>
            </td>
          </tr>
          <tr className='item'>
            <td className='prdOrderId'>240708102104</td>
            <td className='userName'>王O明</td>
            <td className='userPhone'>0900000002</td>
            <td className='prdOrderPrice'>
              <span>$</span>1120
            </td>
            <td className='prdPayment'>線上付款</td>
            <td className='Status'>已取消</td>
            <td className='itemOpt'>
              <div className='flex'>
                <a href='prdOrderInfo.html'>
                  <button id='btnEdit' className='btn itemOpr orderEdit inline-flex'>
                    <i className='fa-solid fa-pen' />
                    編輯狀態
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
