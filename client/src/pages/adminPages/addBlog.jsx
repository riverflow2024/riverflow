import React from 'react'
import { useNavigate } from 'react-router-dom'
import $ from 'jquery'
import 'jquery-ui/ui/widgets/tabs'

export default function AddBlog () {
  const navigate = useNavigate()

  $(function () {
    $('.tabs').tabs()
    $('.tabBtn').on('click', function () {
      // console.log(this)
      $('.tabBtn').removeClass('active')
      $(this).addClass('active')
    })

    // 圖片上傳
    $('#eventPic').on('change', function () {
      // console.log($(this).prop('files'))
      $('#fileChosen').text($(this).prop('files')[0].name)
    })
  })

  return (
    <div class='main'>
      <div class='pageTitle'>專欄編輯</div>
      <form action='' id='blogForm'>
        <div class='tabs'>
          <ul class='tabBtnList'>
            <li>
              <a href='#infoBlog' id='defaultOpen' class='tabBtn active'>
                專欄資訊
              </a>
            </li>
          </ul>

          {/* tabContent 商品資訊 */}
          <div id='infoBlog' class='tabContent'>
            <div class='infoItem'>
              <label for='blogTitle' class='editTitle'>
                文章標題：
              </label>
              <input id='blogTitle' name='blogTitle' type='text' required />
              <span class='required'>※此欄位為必填</span>
            </div>
            <div class='infoItem'>
              <label class='editTitle'>主要圖片：</label>
              <div class='picItem'>
                <label for='blogPic' class='custUpload'>
                  <i class='fa-solid fa-upload' /> 上傳圖片
                </label>
                <input id='blogPic' name='blogPic' type='file' required accept='image/png, image/jpeg' />
                <span id='fileChosen'>未選擇任何檔案</span>
              </div>
            </div>
            <div class='infoItem'>
              <label for='blogSort' class='editTitle'>
                文章分類：
              </label>
              <select name='blogSort' id='blogSort' required>
                <option value='dj'>刷碟 Disc Jockey</option>
                <option value='graffiti'>塗鴉 Graffiti</option>
                <option value='rap'>饒舌 Rap</option>
                <option value='streetDance'>街舞 Street Dance</option>
                <option value='skate'>滑板 Skate</option>
              </select>
            </div>
            <div class='infoItem'>
              <label for='blogAuhtor' class='editTitle'>
                文章作者：
              </label>
              <input id='blogAuhtor' name='blogAuhtor' type='text' required />
            </div>
            <div class='introItem'>
              <label for='blogIntro' class='editTitle'>
                專欄內文：
              </label>
              <div class='itemInfo'>
                <textarea name='blogIntro' id='blogIntro' required></textarea>
              </div>
            </div>
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
      </form>
    </div>
  )
}
