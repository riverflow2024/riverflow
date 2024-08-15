import React from 'react'
import { useNavigate } from 'react-router-dom'
import $ from 'jquery'
import 'jquery-ui/ui/widgets/tabs'

export default function PrdOrderInfo () {
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
    <div class='main'>
      <div class='pageTitle'>購物訂單詳細</div>
      <div class='tabs'>
        <ul class='tabBtnList'>
          <li>
            <a href='#orderDetail' id='defaultOpen' class='tabBtn active'>
              訂單詳細資訊
            </a>
          </li>
        </ul>

        {/* <!-- tabContent 商品資訊--> */}
        <div id='orderDetail' class='tabContent'>
          <form action='' class='prdOrderForm'>
            <div class='orderInfoList flex'>
              <div class='details'>
                <div class='orderItem'>
                  <div>訂單成立時間：</div>
                  <div id='orderTime' class='orderItemInfo'>
                    2024.07.14 23:02
                  </div>
                </div>
                <div class='orderItemList flex'>
                  <div class='orderItem half'>
                    <div>訂購人名稱：</div>
                    <div id='orderUserName' class='orderItemInfo'>
                      王大明
                    </div>
                  </div>
                  <div class='orderItem half'>
                    <div>訂購人性別：</div>
                    <div id='orderUserGender' class='orderItemInfo'>
                      男
                    </div>
                  </div>
                </div>
                <div class='orderItem'>
                  <div>訂購人e-mail：</div>
                  <div id='orderUserEmail' class='orderItemInfo'>
                    wangdaming@test.com
                  </div>
                </div>
                <div class='orderItem'>
                  <div>訂購人電話：</div>
                  <div id='orderUserPhone' class='orderItemInfo'>
                    0900-100100
                  </div>
                </div>
                <div class='orderItem'>
                  <div>購買票券：</div>
                  <div class='orderItemInfo flex'>
                    <div id='orderPrdName'>藝術家聯名T恤【白】</div>
                    <div>
                      x <span id='orderPrdNum'>1</span>
                    </div>
                  </div>
                </div>
                <div class='orderItem'>
                  <div>訂單金額：</div>
                  <div class='orderItemInfo flex'>
                    <span>NT$</span>
                    <span id='orderSumPrice'>2260</span>
                  </div>
                </div>
                <div class='orderItem'>
                  <div>付款方式：</div>
                  <div id='orderPayment' class='orderItemInfo'>
                    線上付款
                  </div>
                </div>
                <div class='orderItem'>
                  <div>付款狀態：</div>
                  <div id='orderPaymentStatus' class='orderItemInfo'>
                    付款成功
                  </div>
                </div>
                <div class='orderItem'>
                  <div>電子發票：</div>
                  <div id='orderReceipt' class='orderItemInfo'>
                    手機載具
                  </div>
                  <div id='carrier' class='orderItemInfo'>
                    /SVSVSVS
                  </div>
                </div>
              </div>
              <div class='details'>
                <div class='orderItem'>
                  <div>收件人姓名</div>
                  <div id='orderRecipient' class='orderItemInfo'>
                    王小明
                  </div>
                </div>
                <div class='orderItem'>
                  <div>收件人手機</div>
                  <div id='orderRecipientPhone' class='orderItemInfo'>
                    0900-100101
                  </div>
                </div>
                <div class='orderItemList flex'>
                  <div class='orderItem half'>
                    <div>收件人取貨方式：</div>
                    <div id='orderShipment' class='orderItemInfo'>
                      7-11取貨
                    </div>{' '}
                  </div>
                  <div class='orderItem half'>
                    <div>收件人取貨店鋪：</div>
                    <div id='orderShipmentShop' class='orderItemInfo'>
                      273813/昌進門市
                    </div>{' '}
                  </div>
                </div>
                <div class='orderItem'>
                  <div>收件人手機</div>
                  <div id='orderShipmentAddress' class='orderItemInfo'>
                    台中市南屯區大進街387號1樓
                  </div>
                </div>
                <div class='orderItem'>
                  <div>訂單備註</div>
                  <div id='orderUserNote' class='orderItemInfo infoArea'>
                    我想要那ㄍ酷東西謝謝:）））
                  </div>
                </div>
                <div class='orderItem'>
                  <label for='orderSellerNote'>賣家備註：</label>
                  <textarea name='orderSellerNote' id='orderSellerNote' class='note' placeholder='輸入備註事項'> </textarea>
                </div>
                <div class='orderItem'>
                  <label for='prdOrderStatus'>訂單狀態：</label>
                  <select name='prdOrderStatus' id='prdOrderStatus' class='statusEdit'>
                    <option value='processing'>處理中</option>
                    <option value='shipped'>已出貨</option>
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
      <div class='btnList flex'>
        <button className='btn' onClick={() => navigate(-1)}>
          <i class='fa-solid fa-angle-left' /> 返回
        </button>
        <button class='btn' type='submit'>
          <i class='fa-solid fa-floppy-disk' /> 儲存
        </button>
      </div>
    </div>
  )
}
