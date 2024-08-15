import React from 'react'
import { Link, useMatch } from 'react-router-dom'

export default function BlogList () {
  const match = useMatch('/admin/blogList/*')

  return (
    <div className='main'>
      <div className='pageTitle'>文章列表</div>
      <div className='flex'>
        <Link to='edit' className='divided'>
          <button className='btn'>新增文章</button>
        </Link>
        <div className='flex'>
          <input type='text' name='' id='blogSearch' className='search' placeholder='文章搜尋' />
          <input type='submit' value='搜尋' />
        </div>
      </div>
      <table page='1' itemshowing='5' className='listTable'>
        <thead>
          <tr>
            <td>文章分類</td>
            <td>文章標題</td>
            <td>作者</td>
            <td>建立時間</td>
            <td>狀態</td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody>
          <tr className='item'>
            <td className='blogSort'>
              <div className='sort'>饒舌</div>
            </td>
            <td className='blogTitle'>來自成都集團CDC的大陸饒舌歌手王以太</td>
            <td className='blogAuthor'>Andy</td>
            <td className='time'>2024/08/05</td>
            <td className='Status'>上架</td>
            <td className='itemOpt'>
              <div className='flex'>
                <a href='addBlog.html'>
                  <button id='btnEdit' className='btn itemOpr inline-flex'>
                    <i className='fa-solid fa-pen' />編輯
                  </button>
                </a>
                <a href='../../static/news_article.html' target='_blank'>
                  <button id='btnView' className='btn itemOpr inline-flex'>
                    <i className='fa-solid fa-eye' />檢視
                  </button>
                </a>
              </div>
              <div className='flex'>
                <button id='btnSta' className='btn itemOpr inline-flex'>
                  <i className='fa-solid fa-arrow-down' />下架
                </button>
                <button className='btn itemOpr inline-flex'>
                  <i className='fa-solid fa-trash' />刪除
                </button>
              </div>
            </td>
          </tr>
          <tr className='item'>
            <td className='blogSort'>
              <div className='sort'>街舞</div>
            </td>
            <td className='blogTitle'>台灣嘻哈的強勢分之 - 台灣Trap 台...</td>
            <td className='blogAuthor'>Andy</td>
            <td className='time'>2024/07/28</td>
            <td className='Status'>上架</td>
            <td className='itemOpt'>
              <div className='flex'>
                <a href='#'>
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
                <button id='btnSta' className='btn itemOpr inline-flex'>
                  <i className='fa-solid fa-arrow-down' />下架
                </button>
                <button className='btn itemOpr inline-flex'>
                  <i className='fa-solid fa-trash' />刪除
                </button>
              </div>
            </td>
          </tr>
          <tr className='item'>
            <td className='blogSort'>
              <div className='sort'>街舞</div>
            </td>
            <td className='blogTitle'>台灣嘻哈的強勢分之 - 台灣Trap 台...</td>
            <td className='blogAuthor'>Andy</td>
            <td className='time'>2024/07/28</td>
            <td className='Status'>上架</td>
            <td className='itemOpt'>
              <div className='flex'>
                <a href='#'>
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
                <button id='btnSta' className='btn itemOpr inline-flex'>
                  <i className='fa-solid fa-arrow-down' />下架
                </button>
                <button className='btn itemOpr inline-flex'>
                  <i className='fa-solid fa-trash' />刪除
                </button>
              </div>
            </td>
          </tr>
          <tr className='item'>
            <td className='blogSort'>
              <div className='sort'>街舞</div>
            </td>
            <td className='blogTitle'>台灣嘻哈的強勢分之 - 台灣Trap 台...</td>
            <td className='blogAuthor'>Andy</td>
            <td className='time'>2024/07/28</td>
            <td className='Status'>上架</td>
            <td className='itemOpt'>
              <div className='flex'>
                <a href='#'>
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
                <button id='btnSta' className='btn itemOpr inline-flex'>
                  <i className='fa-solid fa-arrow-down' />下架
                </button>
                <button className='btn itemOpr inline-flex'>
                  <i className='fa-solid fa-trash' />刪除
                </button>
              </div>
            </td>
          </tr>
          <tr className='item'>
            <td className='blogSort'>
              <div className='sort'>街舞</div>
            </td>
            <td className='blogTitle'>台灣嘻哈的強勢分之 - 台灣Trap 台...</td>
            <td className='blogAuthor'>Andy</td>
            <td className='time'>2024/07/28</td>
            <td className='Status'>上架</td>
            <td className='itemOpt'>
              <div className='flex'>
                <a href='#'>
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
                <button id='btnSta' className='btn itemOpr inline-flex'>
                  <i className='fa-solid fa-arrow-down' />下架
                </button>
                <button className='btn itemOpr inline-flex'>
                  <i className='fa-solid fa-trash' />刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
