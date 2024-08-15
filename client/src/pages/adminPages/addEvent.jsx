import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import $ from 'jquery'
import 'jquery-ui/ui/widgets/tabs'

export default function AddEvent() {
  const navigate = useNavigate()

  $(function () {
    $('.tabs').tabs()
    $('.tabBtn').on('click', function () {
      // console.log(this)
      $('.tabBtn').removeClass('active')
      $(this).addClass('active')
    })
  })

  // 圖片上傳
  $('#prdPic').on('change', function () {
    // console.log($(this).prop('files'))
    $('#fileChosen').text($(this).prop('files')[0].name)
  })

  $('#priceSingle').css('display', 'none') // 預設
  $('#eventPlace').on('change', function () {
    if ($('#eventPlace').val() == 1) {
      // 對號座顯示
      $('#priceSingle').css('display', 'none')
      $('#priceMulti').css('display', 'flex')
    } else {
      // 單一區顯示
      $('#priceSingle').css('display', 'block')
      $('#priceMulti').css('display', 'none')
    }
  })

  return (
    <div class='main'>
      <div class='pageTitle'>新增活動</div>
      <form action='' id='eventForm' enctype='multipart/form-data'>
        <div class='tabs'>
          <ul class='tabBtnList'>
            <li>
              <a href='#eventIntro' id='defaultOpen' class='tabBtn active'>
                活動資訊
              </a>
            </li>
            <li>
              <a href='#eventInfo' class='tabBtn'>
                活動介紹
              </a>
            </li>
          </ul>

          {/* tabContent 商品資訊 */}
          <div id='eventIntro' class='tabContent'>
            <div class='infoItem'>
              <label for='eventName' class='editTitle'>
                活動名稱：
              </label>
              <input id='eventName' name='eventName' type='text' required />
            </div>
            <div class='infoItem'>
              <label class='editTitle'>主要圖片：</label>
              <div class='picItem'>
                <label for='eventPic' class='custUpload'>
                  <i class='fa-solid fa-upload' /> 上傳圖片
                </label>
                <input
                  id='eventPic'
                  name='eventPic'
                  class='fileInput'
                  type='file'
                  required
                  accept='image/png, image/jpeg'
                />
                <span id='fileChosen'>未選擇任何檔案</span>
              </div>
            </div>
            <div class='infoItem'>
              <label for='eventSort' class='editTitle'>
                商品分類：
              </label>
              <select name='eventSort' id='eventSort'>
                <option value='dj'>刷碟 Disc Jockey</option>
                <option value='graffiti'>塗鴉 Graffiti</option>
                <option value='rap'>饒舌 Rap</option>
                <option value='streetDance'>街舞 Street Dance</option>
                <option value='skate'>滑板 Skate</option>
              </select>
            </div>
            <div class='infoItem'>
              <label for='launchDate' class='editTitle'>
                活動上架時間：
              </label>
              <input id='launchDate' name='launchDate' type='datetime-local' required />
            </div>
            <div class='infoItem itemflexList'>
              <div>
                <label for='eventSell' class='editTitle'>
                  活動開賣時間：
                </label>
                <input id='eventSell' name='eventSell' type='datetime-local' required />
              </div>
              <div>
                <label for='eventStart' class='editTitle'>
                  活動開始時間：
                </label>
                <input id='eventStart' name='eventStart' type='datetime-local' required />
              </div>
            </div>
            <div class='infoItem'>
              <label for='eventPlace' class='editTitle'>
                活動場館：
              </label>
              <select name='eventPlace' id='eventPlace'>
                <option value='1'>室內-對號入座</option>
                <option value='0'>戶外-自由座</option>
              </select>
            </div>
            <div id='priceMulti' class='flex multiSect'>
              <div class='infoList'>
                <label for='eventPrice_multi' class='editTitle'>
                  活動票價：
                </label>
                <div class='descInfo'>
                  <div class='descItem'>
                    <label for='sec1Price' class='editTitle'>
                      1F搖滾區：
                    </label>
                    <div class='itemPrice'>
                      <span class='priceMark event'>NT$</span>
                      <input id='sec1Price' name='sec1Price' type='number' min='0' step='1' required />
                    </div>
                  </div>
                  <div class='descItem'>
                    <label for='sec2Price' class='editTitle'>
                      2F坐席區：
                    </label>
                    <div class='itemPrice'>
                      <span class='priceMark event'>NT$</span>
                      <input id='sec2Price' name='sec2Price' type='number' min='0' required />
                    </div>
                  </div>
                  <div class='descItem'>
                    <label for='sec3Price' class='editTitle'>
                      2F站席區：
                    </label>
                    <div class='itemPrice'>
                      <span class='priceMark event'>NT$</span>
                      <input id='sec3Price' type='number' min='0' required />
                    </div>
                  </div>
                  <div class='descItem'>
                    <label for='sec4Price' class='editTitle'>
                      1F身障區：
                    </label>
                    <div class='itemPrice'>
                      <span class='priceMark event'>NT$</span>
                      <input id='sec4Price' type='number' min='0' required />
                    </div>
                  </div>
                </div>
              </div>
              <div id='stockMulti' class='infoList'>
                <label for='eventPrice_multi' class='editTitle'>
                  票券庫存：
                </label>
                <div class='descInfo'>
                  <div class='descItem'>
                    <label for='sec1Stock' class='editTitle'>
                      1F搖滾區：
                    </label>
                    <input id='sec1Stock' class='tktStock' name='sec1Stock' type='number' min='0' step='1' required />
                  </div>
                  <div class='descItem'>
                    <label for='sec2Stock' class='editTitle'>
                      2F坐席區：
                    </label>
                    <input id='sec2Stock' class='tktStock' name='sec2Stock' type='number' min='0' step='1' required />
                  </div>
                  <div class='descItem'>
                    <label for='sec3Stock' class='editTitle'>
                      2F站席區：
                    </label>
                    <input id='sec3Stock' class='tktStock' name='sec3Stock' type='number' min='0' step='1' required />
                  </div>
                  <div class='descItem'>
                    <label for='sec4Stock' class='editTitle'>
                      1F身障區：
                    </label>
                    <input id='sec4Stock' class='tktStock' name='sec4Stock' type='number' min='0' step='1' required />
                  </div>
                </div>
              </div>
            </div>
            <div id='priceSingle'>
              <div class='infoItem'>
                <label for='eventPrice_single' class='editTitle'>
                  活動票價：
                </label>
                <div class='itemPrice'>
                  <span class='priceMark event'>NT$</span>
                  <input id='eventPrice_single' type='number' min='0' required />
                </div>
              </div>
              <div class='infoItem'>
                <label for='eventSingleStock' class='editTitle'>
                  票券庫存：
                </label>
                <input id='secSingleStock' name='secSingleStock' type='number' min='0' step='1' required />
              </div>
            </div>
          </div>

          {/* tabContent 活動介紹 */}
          <div id='eventInfo' class='tabContent'>
            <div class='infoItem'>
              <label class='editTitle'>介紹圖片：</label>
              <div class='picItem'>
                <label for='eventInfoPic' class='custUpload'>
                  <i class='fa-solid fa-upload'></i>
                  上傳圖片
                </label>
                <input
                  id='eventInfoPic'
                  name='eventInfoPic'
                  class='fileInput'
                  type='file'
                  accept='image/png, image/jpeg'
                />
                <span id='infoPicsChosen' class='fileChosen'>
                  未選擇任何檔案
                </span>
              </div>
            </div>
            <div class='introItem'>
              <label for='eventDesc' class='editTitle'>
                活動介紹：
              </label>
              <div class='itemInfo'>
                <textarea name='eventDesc' id='eventDesc' placeholder='活動介紹' required></textarea>
              </div>
            </div>
            <div class='introItem'>
              <label for='eventAnnoc' class='editTitle'>
                最新公告：
              </label>
              <div class='itemInfo'>
                <textarea name='eventAnnoc' id='eventAnnoc' placeholder='最新公告'></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class='btnList flex'>
          <button className='btn' onClick={() => navigate(-1)}>
            <i class='fa-solid fa-angle-left'></i> 返回
          </button>
          <button class='btn' type='submit'>
            <i class='fa-solid fa-floppy-disk'></i> 儲存
          </button>
        </div>
      </form>
    </div>
  )
}
