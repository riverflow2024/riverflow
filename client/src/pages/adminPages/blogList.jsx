import React, { useReducer, useEffect, useCallback } from 'react'
import axios from 'axios'
import { Link, useMatch } from 'react-router-dom'
import BlogItem from '../../components/blogItem'

const initialState = {
  blogs: [],
  loading: true,
  error: null,
  currentPage: 1,
  searchTerm: '',
  blogsPerPage: 5
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return { ...state, blogs: action.payload, loading: false }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'UPDATE_BLOG':
      return {
        ...state,
        blogs: state.blogs.map((blog) =>
          blog.newsId === action.payload.newsId ? { ...blog, ...action.payload } : blog
        )
      }
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload, currentPage: 1 }
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload }
    default:
      return state
  }
}

const BlogList = () => {
  useMatch('/admin/blogList/*')

  const [state, dispatch] = useReducer(reducer, initialState)
  const { blogs, loading, error, currentPage, searchTerm, blogsPerPage } = state

  const fetchBlogs = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3000/riverflow/admin/news')
      dispatch({ type: 'SET_BLOGS', payload: response.data })
    } catch (err) {
      console.error('獲取文章數據錯誤：', err)
      dispatch({ type: 'SET_ERROR', payload: '獲取文章數據時出錯' })
    }
  }, [])

  useEffect(() => {
    fetchBlogs()
  }, [fetchBlogs])

  useEffect(() => {
    const updateStatusColors = () => {
      document.querySelectorAll('.Status').forEach((elem) => {
        if (elem.innerText === '上架') {
          elem.style.color = 'var(--side)'
        } else if (elem.innerText === '下架') {
          elem.style.color = 'var(--err)'
        }
      })
    }
    updateStatusColors()
  }, [blogs, currentPage])

  const reloadBlogItem = useCallback(async (blogId, newStatus) => {
    try {
      const response = await axios.get(`http://localhost:3000/riverflow/admin/news/${blogId}`)
      dispatch({
        type: 'UPDATE_BLOG',
        payload: { ...response.data, newsStatus: newStatus, newsId: blogId }
      })
    } catch (err) {
      console.error('重新加載文章數據錯誤：', err)
    }
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date
      .toLocaleString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      })
      .replace(/\//g, '-')
  }

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.newsTitle &&
      (blog.newsTitle.toLowerCase().includes(searchTerm.toLowerCase()) || blog.newsTitle.includes(searchTerm))
  )

  const indexOfLastBlog = currentPage * blogsPerPage
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog)
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage)

  const paginate = (pageNumber) => dispatch({ type: 'SET_CURRENT_PAGE', payload: pageNumber })

  const handleSearch = (e) => {
    e.preventDefault()
    dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.blogSearch.value })
  }

  if (loading) return <div>加載中...</div>
  if (error) return <div>{error}</div>

  return (
    <div className='main'>
      <div className='pageTitle'>文章列表</div>
      <div className='flex'>
        <Link to='edit' className='divided'>
          <button className='btn'>新增文章</button>
        </Link>
        <form onSubmit={handleSearch} className='flex'>
          <input type='text' name='blogSearch' id='blogSearch' className='search' placeholder='文章搜尋' />
          <input type='submit' value='搜尋' />
        </form>
      </div>
      <table className='listTable'>
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
          {currentBlogs.map((blog) => (
            <BlogItem
              key={blog.newsId}
              blog={{ ...blog, createdAt: formatDate(blog.createdAt) }}
              onStatusChange={reloadBlogItem}
            />
          ))}
        </tbody>
      </table>
      <div className='pagination'>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default BlogList
