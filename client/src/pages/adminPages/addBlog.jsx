// Author: zhier1114
import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { containerPadding } from 'lightbox2'

export default function AddBlog() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [formData, setFormData] = useState({
    newsType: 'dj',
    newsTitle: '',
    coverImg: null,
    newsContent: '',
    newsAuthor: '',
    newsStatus: 1
  })

  const [minDateTime, setMinDateTime] = useState('')
  const [fileName, setFileName] = useState('未選擇任何檔案')

  useEffect(() => {
    // 設置最小日期時間為當前時間
    const now = new Date()
    const offset = now.getTimezoneOffset()
    now.setMinutes(now.getMinutes() - offset)
    setMinDateTime(now.toISOString().slice(0, 16))
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFileName(file.name)
      setFormData((prevState) => ({
        ...prevState,
        coverImg: file
      }))
    }
  }

  const handleEditorChange = (event, editor) => {
    const data = editor.getData()
    setFormData((prevState) => ({
      ...prevState,
      newsContent: data
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const postData = new FormData()
    for (const key in formData) {
      postData.append(key, formData[key])
    }

    try {
      const response = await axios.post('http://localhost:3000/riverflow/admin/news/create', postData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log('部落格文章已創建:', response.data)
      navigate(-1)
    } catch (error) {
      console.error('創建部落格文章時出錯:', error)
    }
  }

  return (
    <div className='main'>
      <div className='pageTitle'>專欄編輯</div>
      <form onSubmit={handleSubmit}>
        <div className='tabs'>
          <ul className='tabBtnList'>
            <li>
              <a href='#infoBlog' id='defaultOpen' className='tabBtn active'>
                專欄資訊
              </a>
            </li>
          </ul>

          <div id='infoBlog' className='tabContent'>
            <div className='infoItem'>
              <label htmlFor='newsTitle' className='editTitle'>
                文章標題：
              </label>
              <input
                id='newsTitle'
                name='newsTitle'
                type='text'
                required
                value={formData.newsTitle}
                onChange={handleInputChange}
              />
              <span className='required'>※此欄位為必填</span>
            </div>
            <div className='infoItem'>
              <label className='editTitle'>主要圖片：</label>
              <div className='picItem'>
                <label htmlFor='coverImg' className='custUpload'>
                  <i className='fa-solid fa-upload' /> 上傳圖片
                </label>
                <input
                  id='coverImg'
                  name='coverImg'
                  type='file'
                  required
                  accept='image/png, image/jpeg'
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <span id='fileChosen'>{fileName}</span>
              </div>
            </div>
            <div className='infoItem'>
              <label htmlFor='newsType' className='editTitle'>
                文章分類：
              </label>
              <select name='newsType' id='newsType' required value={formData.newsType} onChange={handleInputChange}>
                <option value='DJ'>刷碟 Disc Jockey</option>
                <option value='塗鴉'>塗鴉 Graffiti</option>
                <option value='饒舌'>饒舌 Rap</option>
                <option value='街舞'>街舞 Street Dance</option>
                <option value='滑板'>滑板 Skate</option>
              </select>
            </div>
            <div className='infoItem'>
              <label htmlFor='newsAuthor' className='editTitle'>
                文章作者：
              </label>
              <input
                id='newsAuthor'
                name='newsAuthor'
                type='text'
                required
                value={formData.newsAuthor}
                onChange={handleInputChange}
              />
            </div>
            <div className='introItem' style={{ height: '400px' }}>
              <label htmlFor='newsContent' className='editTitle'>
                專欄內文：
              </label>
              <div className='itemInfo'>
                <CKEditor
                  editor={ClassicEditor}
                  data={formData.newsContent}
                  onChange={handleEditorChange}
                  style={{ height: '400px' }}
                />
              </div>
            </div>
            <div className='infoItem'>
              <label htmlFor='pubTime' className='editTitle'>
                發布時間：
              </label>
              <input
                id='pubTime'
                name='pubTime'
                type='datetime-local'
                onChange={handleInputChange}
                min={minDateTime}
                value={formData.pubTime}
                step='1' // 這允許秒數的輸入
              />
            </div>
          </div>
        </div>
        <div className='btnList flex'>
          <button className='btn' type='button' onClick={() => navigate(-1)}>
            <i className='fa-solid fa-angle-left' /> 返回
          </button>
          <button className='btn' type='submit'>
            <i className='fa-solid fa-floppy-disk' /> 新增
          </button>
        </div>
      </form>
    </div>
  )
}
