// Author: zhier1114
import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const BlogItem = ({ blog, onStatusChange }) => {
  const [status, setStatus] = useState(blog.newsStatus)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    setStatus(blog.newsStatus)
  }, [blog.newsStatus])

  const updateStatus = useCallback(
    async (newStatus) => {
      setIsUpdating(true)
      try {
        const endpoint = newStatus === 1 ? 'launch' : 'remove'
        const response = await axios.put(`http://localhost:3000/riverflow/admin/news/${blog.newsId}/${endpoint}`)
        setStatus(newStatus)
        onStatusChange(blog.newsId, newStatus)
      } catch (error) {
        console.error('狀態更新失敗:', error)
      } finally {
        setIsUpdating(false)
      }
    },
    [blog.newsId, onStatusChange]
  )

  const removeStatus = () => updateStatus(0)
  const launchStatus = () => updateStatus(1)

  return (
    <tr className='item'>
      <td className='blogSort'>
        <div className='sort'>{blog.newsType}</div>
      </td>
      <td className='blogTitle'>{blog.newsTitle}</td>
      <td className='blogAuthor'>{blog.newsAuthor}</td>
      <td className='time'>{blog.createdAt}</td>
      <td className='Status'>{status === 1 ? '上架' : '下架'}</td>
      <td className='itemOpt'>
        <div className='flex'>
          <a href='addBlog.html'>
            <button id='btnEdit' className='btn itemOpr inline-flex'>
              <i className='fa-solid fa-pen' />
              編輯
            </button>
          </a>
          <a href='../../static/news_article.html' target='_blank'>
            <button id='btnView' className='btn itemOpr inline-flex'>
              <i className='fa-solid fa-eye' />
              檢視
            </button>
          </a>
        </div>
        <div className='flex'>
          {status === 0 ? (
            <button onClick={launchStatus} className='btn itemOpr inline-flex' disabled={isUpdating}>
              <i className='fa-solid fa-arrow-up' />
              {isUpdating ? '更新中...' : '上架'}
            </button>
          ) : (
            <button onClick={removeStatus} className='btn itemOpr inline-flex' disabled={isUpdating}>
              <i className='fa-solid fa-arrow-down' />
              {isUpdating ? '更新中...' : '下架'}
            </button>
          )}
          <button className='btn itemOpr inline-flex'>
            <i className='fa-solid fa-trash' />
            刪除
          </button>
        </div>
      </td>
    </tr>
  )
}

export default BlogItem
