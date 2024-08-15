import React from 'react'
import { useNavigate } from 'react-router-dom'
import $ from 'jquery'
import 'jquery-ui/ui/widgets/tabs'

export default function EventOrderInfo () {
  const navigate = useNavigate()

  $(function () {
    $('.tabs').tabs()
    $('.tabBtn').on('click', function () {
      // console.log(this)
      $('.tabBtn').removeClass('active')
      $(this).addClass('active')
    })
  })

  return (
    <div className='main'>
      <div className='pageTitle'>購票訂單詳細</div>
      <div className='tabs'>
        <ul className='tabBtnList'>
          <li>
            <a href='#orderDetail' id='defaultOpen' className='tabBtn active'>
              訂單詳細資訊
            </a>
          </li>
        </ul>

        {/* <!-- tabContent 活動訂單資訊--> */}
        <div id='orderDetail' className='tabContent'>
          <form action='' className='prdOrderForm'>
            <div className='orderInfoList flex'>
              <div className='details'>
                <div className='orderItem'>
                  <div>訂單成立時間：</div>
                  <div id='orderTime' className='orderItemInfo'>
                    2024.07.14 23:02
                  </div>
                </div>
                <div className='orderItemList flex'>
                  <div className='orderItem half'>
                    <div>訂購人名稱：</div>
                    <div id='orderUserName' className='orderItemInfo'>
                      王大明
                    </div>
                  </div>
                  <div className='orderItem half'>
                    <div>訂購人性別：</div>
                    <div id='orderUserGender' className='orderItemInfo'>
                      男
                    </div>
                  </div>
                </div>
                <div className='orderItem'>
                  <div>訂購人e-mail：</div>
                  <div id='orderUserEmail' className='orderItemInfo'>
                    wangdaming@test.com
                  </div>
                </div>
                <div className='orderItem'>
                  <div>訂購人電話：</div>
                  <div id='orderUserPhone' className='orderItemInfo'>
                    0900-100100
                  </div>
                </div>
                <div className='orderItem'>
                  <div>付款方式：</div>
                  <div id='eventOrderPayment' className='orderItemInfo'>
                    線上付款
                  </div>
                </div>
                <div className='orderItem'>
                  <div>付款狀態：</div>
                  <div id='eventOrderPaymentStatus' className='orderItemInfo'>
                    付款成功
                  </div>
                </div>
                <div className='orderItem'>
                  <div>電子發票：</div>
                  <div id='eventOrderReceipt' className='orderItemInfo'>
                    手機載具
                  </div>
                  <div id='eventCarrier' className='orderItemInfo'>
                    /SVSVSVS
                  </div>
                </div>
              </div>
              <div className='details'>
                <div className='orderItem'>
                  <div>購買場次：</div>
                  <div id='orderEventName' className='orderItemInfo'>
                    第八屆【台北盃街舞大賽】
                  </div>
                </div>
                <div className='orderItem'>
                  <div>購買票數</div>
                  <div id='orderTicketNum' className='orderItemInfo'>
                    4
                  </div>
                </div>
                <div className='orderItem'>
                  <div>購買區域</div>
                  <div id='orderEventArea' className='orderItemInfo'>
                    1F搖滾區
                  </div>
                </div>
                <div className='orderItem'>
                  <div>取票序號</div>
                  <div id='orderRandonNum' className='orderItemInfo'>
                    04759365
                  </div>
                </div>
                <div className='orderItem'>
                  <div>訂單金額：</div>
                  <div className='orderItemInfo flex'>
                    <span>NT$</span>
                    <span id='orderSumPrice'>4720</span>
                  </div>
                </div>
                <div className='orderItem'>
                  <label for='eventOrderStatus'>訂單狀態：</label>
                  <select name='eventOrderStatus' id='eventOrderStatus' className='statusEdit'>
                    <option value='processing'>處理中</option>
                    <option value='completed'>已完成</option>
                    <option value='cancelled'>已取消</option>
                    <option value='refunded'>已退款</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className='btnList flex'>
        <button classNameName='btn' onClick={() => navigate(-1)}>
          <i className='fa-solid fa-angle-left' /> 返回
        </button>
        <button className='btn' type='submit'>
          <i className='fa-solid fa-floppy-disk' /> 儲存
        </button>
      </div>
    </div>
  )
}
