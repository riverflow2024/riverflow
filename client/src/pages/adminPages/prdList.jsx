import React, { useState, useEffect } from 'react'
import $ from 'jquery'
import { Link, useMatch } from 'react-router-dom'
import axios from 'axios'

async function login(username, password) {
  try {
    const response = await axios.post('localhost:3000/riverflow/admin/login', {username, password})
    const token = response.data.token
    localStorage.setItem('authToken', token)
    return token
  } catch (error) {
    console.log('登錄失敗:', error)
    throw error
  }
}

export default function PrdList () {
  const match = useMatch('/admin/prdList/*')
  const [data, setData] = useState(null)


  useEffect(() => {
    const fetchData = async () => {
      try {
        let token = localStorage.getItem('authToken')
        if (!token) {
          token = await login('adminaccount', 'Adminsecret')
        }
        
        const response = await axios.get('localhost:3000/riverflow/admin/')
        setData(response.data)
        console.log('測試:', response.data)
      } catch (error) {
        console.error('error')
      }
    }

    fetchData()
  }, [])

  $(function () {
    $('.Status').each(function (index, elem) {
      //   $elem = $(elem)
      // console.log($elem.attr('status'))
      switch ($(elem).attr('status')) {
        case 'Available':
          $(elem).html('上架')
          $(elem).css('color', 'var(--side)')
          break
        case 'Discontinued':
          $(elem).text('下架')
          $(this).css('color', 'var(--err)')
          break
        case 'Out_of_Stock':
          $(elem).text('售完')
          $(this).css('color', 'var(--cancel)')
          break
      }
    })

    $('.prdStock').each(function (index, elem) {
      if (elem.innerText == 0) {
        $(this).css('color', 'red')
      }
    })
  })

  return (
    <div className='main'>
      <div className='pageTitle'>商品列表</div>
      <div className='flex'>
        <Link to='edit' className='divided'>
          <button className='btn'>新增商品</button>
        </Link>
        <div className='flex'>
          <input type='text' name='' id='pdtSearch' className='search' placeholder='商品搜尋' />
          <input type='submit' value='搜尋' />
        </div>
      </div>
      <table page='1' itemshowing='5' className='listTable'>
        <thead>
          <tr>
            <td>圖片</td>
            <td>分類</td>
            <td>商品編號</td>
            <td>商品名稱</td>
            <td>價格</td>
            <td>總庫存</td>
            <td>狀態</td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody>
          <tr prdid='01' className='item'>
            <td>
              <img src='../../assets/images/eventPrd02.jpg' alt='' className='prdImgPre' />
            </td>
            <td className='prdSort'>
              <div className='sort'>饒舌</div>
              <br />
              <div className='sort'>新品</div>
            </td>
            <td className='prdId'>2407081029</td>
            <td className='prdName'>王以太聯名短袖T恤</td>
            <td className='prdPrice'>
              <span>$</span>1480
            </td>
            <td className='prdStock'>60</td>
            <td className='Status' status='Available'>
              上架
            </td>
            <td className='itemOpt'>
              <div className='flex'>
                <a href='addPrd.html'>
                  <button id='btnEdit' className='btn itemOpr inline-flex'>
                    <i className='fa-solid fa-pen' />編輯
                  </button>
                </a>
                <a href='#'>
                  <button id='btnView' className='btn itemOpr inline-flex'>
                    <i className='fa-solid fa-eye' />檢視
                  </button>
                </a>
              </div>
              <div className='flex'>
                <button className='btn btnSta itemOpr inline-flex'>
                  <i className='fa-solid fa-arrow-down' />下架
                </button>
                <button className='btn itemOpr inline-flex'>
                  <i className='fa-solid fa-trash'></i>刪除
                </button>
              </div>
            </td>
          </tr>
          <tr className='item'>
            <td>
              <img src='../../assets/images/memberCollection.png' alt='' className='prdImgPre' />
            </td>
            <td className='prdSort'>
              <div className='sort'>饒舌</div>
              <br />
            </td>
            <td className='prdId'>2407081028</td>
            <td className='prdName'>王以太 演說家 幸存者 專輯</td>
            <td className='prdPrice'>
              <span>$</span>880
            </td>
            <td className='prdStock'>105</td>
            <td className='Status' status='Available'>
              上架
            </td>
            <td className='itemOpt'>
              <div className='flex'>
                <a href='addPrd.html'>
                  <button id='btnEdit' className='btn itemOpr inline-flex'>
                    <i className='fa-solid fa-pen'></i>編輯
                  </button>
                </a>
                <a href='#'>
                  <button id='btnView' className='btn itemOpr inline-flex'>
                    <i className='fa-solid fa-eye'></i>檢視
                  </button>
                </a>
              </div>
              <div className='flex'>
                <button className='btn btnSta itemOpr inline-flex'>
                  <i className='fa-solid fa-arrow-down'></i>下架
                </button>
                <button className='btn itemOpr inline-flex'>
                  <i className='fa-solid fa-trash'></i>刪除
                </button>
              </div>
            </td>
          </tr>
          <tr className='item'>
            <td>
              <img src='../../assets/images/eventPrd01.jpg' alt='' className='prdImgPre' />
            </td>
            <td className='prdSort'>
              <div className='sort'>饒舌</div>
              <br />
              <div className='sort'>新品</div>
            </td>
            <td className='prdId'>2407081027</td>
            <td className='prdName'>王以太聯名夾棉外套</td>
            <td className='prdPrice'>
              <span>$</span>2580
            </td>
            <td className='prdStock'>60</td>
            <td className='Status' status='Available'>
              上架
            </td>
            <td className='itemOpt'>
              <div className='flex'>
                <a href='#'>
                  <button id='btnEdit' className='btn itemOpr inline-flex'>
                    <i className='fa-solid fa-pen'></i>編輯
                  </button>
                </a>
                <a href='#'>
                  <button id='btnView' className='btn itemOpr inline-flex'>
                    <i className='fa-solid fa-eye'></i>檢視
                  </button>
                </a>
              </div>
              <div className='flex'>
                <button className='btn btnSta itemOpr inline-flex'>
                  <i className='fa-solid fa-arrow-down'></i>下架
                </button>
                <button className='btn itemOpr inline-flex'>
                  <i className='fa-solid fa-trash'></i>刪除
                </button>
              </div>
            </td>
          </tr>
          <tr className='item'>
            <td>
              <img
                src='https://images.goodsmile.info/cgm/images/product/20220502/12665/98719/large/d870c31d5f264155ac6e3e359b7d34bc.jpg'
                alt=''
                className='prdImgPre'
              />
            </td>
            <td className='prdSort'>
              <div className='sort'>滑板</div>
              <br />
              <div className='sort'>新品</div>
            </td>
            <td className='prdId'>2407081026</td>
            <td className='prdName'>美式拼貼滑板</td>
            <td className='prdPrice'>
              <span>$</span>3683
            </td>
            <td className='prdStock'>24</td>
            <td className='Status' status='Available'>
              下架
            </td>
            <td className='itemOpt'>
              <div className='flex'>
                <a href='#'>
                  <button id='btnEdit' className='btn itemOpr inline-flex'>
                    <i className='fa-solid fa-pen'></i>編輯
                  </button>
                </a>
                <a href='#'>
                  <button id='btnView' className='btn itemOpr inline-flex'>
                    <i className='fa-solid fa-eye'></i>檢視
                  </button>
                </a>
              </div>
              <div className='flex'>
                <button className='btn btnSta itemOpr inline-flex'>
                  <i className='fa-solid fa-arrow-down'></i>下架
                </button>
                <button className='btn itemOpr inline-flex'>
                  <i className='fa-solid fa-trash'></i>刪除
                </button>
              </div>
            </td>
          </tr>
          <tr className='item'>
            <td>
              <img src='https://cdn2.ettoday.net/images/7509/e7509491.jpg' alt='' className='prdImgPre' />
            </td>
            <td className='prdSort'>
              <div className='sort'>DJ</div>
              <br />
              <div className='sort'>優惠</div>
            </td>
            <td className='prdId'>2407081025</td>
            <td className='prdName'>DJ Soda夜店狂歡</td>
            <td className='prdPrice'>
              <span>$</span>1899
            </td>
            <td className='prdStock'>10</td>
            <td className='Status' status='Available'>
              下架
            </td>
            <td className='itemOpt'>
              <div className='flex'>
                <a href='#'>
                  <button id='btnEdit' className='btn itemOpr inline-flex'>
                    <i className='fa-solid fa-pen'></i>編輯
                  </button>
                </a>
                <a href='#'>
                  <button id='btnView' className='btn itemOpr inline-flex'>
                    <i className='fa-solid fa-eye'></i>檢視
                  </button>
                </a>
              </div>
              <div className='flex'>
                <button className='btn btnSta itemOpr inline-flex'>
                  <i className='fa-solid fa-arrow-down'></i>下架
                </button>
                <button className='btn itemOpr inline-flex'>
                  <i className='fa-solid fa-trash'></i>刪除
                </button>
              </div>
            </td>
          </tr>
          <tr className='item'>
            <td>
              <img
                src='https://i.pinimg.com/564x/a6/e7/eb/a6e7ebd5010ca995d3ae6eba145ad6e6.jpg'
                alt=''
                className='prdImgPre'
              />
            </td>
            <td className='prdSort'>
              <div className='sort'>塗鴉</div>
              <br />
            </td>
            <td className='prdId'>2407081024</td>
            <td className='prdName'>Lexel噴漆</td>
            <td className='prdPrice'>
              <span>$</span>363
            </td>
            <td className='prdStock'>15</td>
            <td className='Status' status='Discontinued'>
              下架
            </td>
            <td className='itemOpt'>
              <div className='flex'>
                <a href='#'>
                  <button id='btnEdit' className='btn itemOpr inline-flex'>
                    <i className='fa-solid fa-pen'></i>編輯
                  </button>
                </a>
                <a href='#'>
                  <button id='btnView' className='btn itemOpr inline-flex'>
                    <i className='fa-solid fa-eye'></i>檢視
                  </button>
                </a>
              </div>
              <div className='flex'>
                <button className='btn btnSta itemOpr inline-flex'>
                  <i className='fa-solid fa-arrow-down'></i>上架
                </button>
                <button className='btn itemOpr inline-flex'>
                  <i className='fa-solid fa-trash'></i>刪除
                </button>
              </div>
            </td>
          </tr>
          <tr className='item'>
            <td>
              <img
                src='https://i.pinimg.com/564x/2f/e0/b4/2fe0b40030f71606eed42d826fa850cd.jpg'
                alt=''
                className='prdImgPre'
              />
            </td>
            <td className='prdSort'>
              <div className='sort'>塗鴉</div>
              <br />
              <div className='sort'>新品</div>
            </td>
            <td className='prdId'>2407081023</td>
            <td className='prdName'>雷神噴漆</td>
            <td className='prdPrice'>
              <span>$</span>599
            </td>
            <td className='prdStock'>38</td>
            <td className='Status' status='Available'>
              下架
            </td>
            <td className='itemOpt'>
              <div className='flex'>
                <a href='#'>
                  <button id='btnEdit' className='btn itemOpr inline-flex'>
                    <i className='fa-solid fa-pen'></i>編輯
                  </button>
                </a>
                <a href='#'>
                  <button id='btnView' className='btn itemOpr inline-flex'>
                    <i className='fa-solid fa-eye'></i>檢視
                  </button>
                </a>
              </div>
              <div className='flex'>
                <button className='btn btnSta itemOpr inline-flex'>
                  <i className='fa-solid fa-arrow-down'></i>下架
                </button>
                <button className='btn itemOpr inline-flex'>
                  <i className='fa-solid fa-trash'></i>刪除
                </button>
              </div>
            </td>
          </tr>
          <tr className='item'>
            <td>
              <img
                src='https://i.pinimg.com/564x/e0/c5/eb/e0c5eb508528548a8ee104fe60579f77.jpg'
                alt=''
                className='prdImgPre'
              />
            </td>
            <td className='prdSort'>
              <div className='sort'>饒舌</div>
              <br />
            </td>
            <td className='prdId'>2407081022</td>
            <td className='prdName'>RapperLai</td>
            <td className='prdPrice'>
              <span>$</span>1299
            </td>
            <td className='prdStock'>10</td>
            <td className='Status' status='Available'>
              下架
            </td>
            <td className='itemOpt'>
              <div className='flex'>
                <a href='#'>
                  <button id='btnEdit' className='btn itemOpr inline-flex'>
                    <i className='fa-solid fa-pen'></i>編輯
                  </button>
                </a>
                <a href='#'>
                  <button id='btnView' className='btn itemOpr inline-flex'>
                    <i className='fa-solid fa-eye'></i>檢視
                  </button>
                </a>
              </div>
              <div className='flex'>
                <button className='btn btnSta itemOpr inline-flex'>
                  <i className='fa-solid fa-arrow-down'></i>下架
                </button>
                <button className='btn itemOpr inline-flex'>
                  <i className='fa-solid fa-trash'></i>刪除
                </button>
              </div>
            </td>
          </tr>
          <tr className='item'>
            <td>
              <img
                src='https://i.pinimg.com/564x/7e/75/24/7e75244c7427c041237f60c1e18308a6.jpg'
                alt=''
                className='prdImgPre'
              />
            </td>
            <td className='prdSort'>
              <div className='sort'>滑板</div>
              <br />
              <div className='sort'>新品</div>
            </td>
            <td className='prdId'>2407081021</td>
            <td className='prdName'>台大街舞Battle盃</td>
            <td className='prdPrice'>
              <span>$</span>200
            </td>
            <td className='prdStock'>0</td>
            <td className='Status' status='Out_of_Stock'>
              售完
            </td>
            <td className='itemOpt'>
              <div className='flex'>
                <a href='#'>
                  <button id='btnEdit' className='btn itemOpr inline-flex'>
                    <i className='fa-solid fa-pen'></i>編輯
                  </button>
                </a>
                <a href='#'>
                  <button id='btnView' className='btn itemOpr inline-flex'>
                    <i className='fa-solid fa-eye'></i>檢視
                  </button>
                </a>
              </div>
              <div className='flex'>
                <button className='btn btnSta itemOpr inline-flex'>
                  <i className='fa-solid fa-arrow-down'></i>下架
                </button>
                <button className='btn itemOpr inline-flex'>
                  <i className='fa-solid fa-trash'></i>刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
