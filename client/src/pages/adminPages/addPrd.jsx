import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import $ from 'jquery'
import 'jquery-ui/ui/widgets/tabs'
import MultiSelectDropdown from '../../components/MultiSelectDropdown'

export default function AddPrd() {
  const navigate = useNavigate()
  const [selectedOptions, setSelectedOptions] = useState([])
  const [specItems, setSpecItems] = useState([{ id: 1, title: '', isInitial: true }])
  const [tableItems, setTableItems] = useState([{ id: 1, name: '', stock: 0, isInitial: true }])
  const [isDisChecked, setIsDisChecked] = useState(false)

  // tab
  $(function () {
    $('.tabs').tabs()
    $('.tabBtn').on('click', function () {
      // console.log(this)
      $('.tabBtn').removeClass('active')
      $(this).addClass('active')
    })
  })

  // 圖片上傳抓取檔名
  $('#prdPic').on('change', function () {
    // console.log($(this).prop('files'))
    $('#fileChosen').text($(this).prop('files')[0].name)
  })

  // 抓取規格名稱
  $(document).on('input', '.specTitle', function () {
    let itemId = $(this).parent('.specItem').attr('spec-id')
    $(`#specName${itemId}`).text($(this).val())
  })

  // 新增規格
  const addItem = () => {
    const newItemId = specItems.length + 1
    setSpecItems([
      ...specItems,
      {
        id: newItemId,
        title: '',
        isInitial: false
      }
    ])
    setTableItems([
      ...tableItems,
      {
        id: newItemId,
        name: '',
        stock: 0,
        isInitial: false
      }
    ])
  }

  // 分類選項
  const handleChange = (selected) => {
    setSelectedOptions(selected)
  }

  const handleSubmit = () => {
    const selectedCategories = selectedOptions.map(option => option.value)
    console.log('選擇的分類:', selectedCategories)
  }

  // 表單測試
  //   document.getElementById('prdForm').addEventListener('submit', function (event) {
  //     event.preventDefault() // 防止表單提交
  //     const formData = new FormData(event.target)

  //     // 將表單資料列印到 console
  //     formData.forEach((value, key) => {
  //       console.log(`${key}: ${value}`)
  //     })
  //   })

  return (
    <div className="main">
      <div className="pageTitle">商品編輯</div>
      <form action="" id="prdForm">
        <div className="tabs">
          <ul className="tabBtnList">
            <li>
              <a href="#infoDesc" id="defaultOpen" className="tabBtn active">
                商品基本資訊
              </a>
            </li>
            <li>
              <a href="#infoSpec" className="tabBtn">
                商品規格
              </a>
            </li>
            <li>
              <a href="#prdDiscount" className="tabBtn">
                商品優惠
              </a>
            </li>
          </ul>

          {/* tabContent 商品資訊 */}
          <div id="infoDesc" className="tabContent">
            <div className="infoItem">
              <label htmlFor="prdName" className="editTitle">
                商品名稱：
              </label>
              <input id="prdName" name="prdName" type="text" required />
              <span className="required">※此欄位為必填</span>
            </div>
            <div className="infoItem">
              <label className="editTitle">商品圖片：</label>
              <div className="picItem">
                <label htmlFor="prdPic" className="custUpload">
                  <i className="fa-solid fa-upload" /> 上傳圖片
                </label>
                <input id="prdPic" name="prdPic" type="file" required accept="image/png, image/jpeg" />
                <span id="fileChosen">未選擇任何檔案</span>
              </div>
            </div>
            <MultiSelectDropdown
              selectedOptions={selectedOptions}
              onChange={handleChange}
            />
            {/* <div className='infoItem'>
              <label htmlFor='prdSort' className='editTitle'>
                商品分類：
              </label>
              <select name='sort' id='prdSort'>
                <option value='dj'>DJ</option>
                <option value='graffiti'>塗鴉</option>
                <option value='rap'>饒舌</option>
                <option value='streetDance'>街舞</option>
                <option value='skate'>滑板</option>
                <option value='new'>新上市</option>
                <option value='discount'>優惠</option>
              </select>
            </div> */}
            <div className='infoItem'>
              <label htmlFor='prdPrice' className='editTitle'>
                商品售價：
              </label>
              <div className="itemPrice">
                <span className="priceMark event">NT$</span>
                <input id="prdPrice" type="number" min="0" required />
              </div>
            </div>
            <div className="infoItem itemList">
              <span className="editTitle">商品特性：</span>
              <div className="descInfo">
                <div className="descItem">
                  <label htmlFor="prdDesc" className="editTitle">
                    說明：
                  </label>
                  <input id="prdDesc" name="prdDesc" type="text" required />
                </div>
                <div className="descItem">
                  <label htmlFor="prdSpec1" className="editTitle">
                    適用：
                  </label>
                  <input id="prdSpec1" name="prdSpec1" type="text" required />
                </div>
                <div className="descItem">
                  <label htmlFor="prdSpec2" className="editTitle">
                    材質：
                  </label>
                  <input id="prdSpec2" name="prdSpec2" type="text" required />
                </div>
              </div>
            </div>
          </div>

          {/* tabContent 商品規格 */}
          <div id="infoSpec" className="tabContent">
            <div className="specEdit">
              <span className="editTitle">規格選項：</span>
              <div className="specInfo">
                <div className="specItem" spec-id="1">
                  <label htmlFor="prdSpec1">規格1名稱：</label>
                  <input id="prdSpec1" name="prdSpec1" className="specTitle" type="text" required />
                  <button onClick={addItem} className="addItem">
                    <i className="bi bi-plus-circle"> </i>
                  </button>
                </div>{' '}
                {specItems.map((item, index) => (
                  <div key={item.id} className="specItem" spec-id={item.id}>
                    <label htmlFor={`prdSpec${item.id}`}>規格{item.id}名稱：</label>
                    <input
                      id={`prdSpec${item.id}`}
                      name={`prdSpec${item.id}`}
                      value={item.title}
                      type="text"
                      className="specTitle"
                      required
                      onChange={(e) => {
                        const newItems = [...specItems]
                        newItems[index].title = e.target.value
                        setSpecItems(newItems)

                        const newTableItems = [...tableItems]
                        newTableItems[index].name = e.target.value
                        setTableItems(newTableItems)
                      }}
                    />
                    <button onClick={addItem}>
                      <i className="bi bi-plus-circle" />
                    </button>
                    <button
                      onClick={() => {
                        const newItems = specItems.filter((_, i) => i !== index)
                        setSpecItems(newItems)
                      }}
                    >
                      <i className="bi bi-dash-circle" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <hr />
            <div>
              <table className="specSum">
                <thead>
                  <tr>
                    <td>規格</td>
                    <td>庫存</td>
                  </tr>
                </thead>
                <tbody>
                  <tr className="specItemInfo" spec-id="1">
                    <td>
                      <span id="specName1" className="itemTitle">
                        {' '}
                      </span>
                    </td>
                    <td>
                      <input type="number" name="specStock1" id="specStock1" min="0" step="1" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* tabContent 商品優惠 */}
          <div id="prdDiscount" className="tabContent">
            <div className="infoItem">
              <span>商品優惠：</span>
              <input type="checkbox" name="disCheck" id="disCheck" className="prdDisCheck" />
              <label htmlFor="disCheck" className="checkmark">
                {' '}
              </label>
            </div>
            <div className="ifHasDis hidden">
              <div className="infoItem itemflexList">
                <div>
                  <label htmlFor="discountStart" className="editTitle">
                    優惠開始時間：
                  </label>
                  <input id="discountStart" type="datetime-local" name="discountStart" />
                </div>
                <div>
                  <label htmlFor="discountEnd" className="editTitle">
                    優惠結束時間：
                  </label>
                  <input id="discountEnd" type="datetime-local" name="discountEnd" />
                </div>
              </div>
              <div className="infoItem">
                <label htmlFor="discountRate" className="editTitle">
                  優惠方式：
                </label>
                <input
                  id="discountRate"
                  name="discountRate"
                  className="discountWay"
                  type="number"
                  min="0"
                  max="1"
                  step="0.01"
                  placeholder="輸入0～1之間的數字"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="btnList flex">
          <a>
            <button className="btn" onClick={() => navigate(-1)}>
              <i className="fa-solid fa-angle-left" /> 返回
            </button>
          </a>
          <button onClick={handleSubmit} className='btn'>
            <i className='fa-solid fa-floppy-disk' /> 儲存
          </button>
        </div>
      </form>
    </div>
  )
}
