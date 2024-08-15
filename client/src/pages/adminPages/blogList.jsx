import React from 'react'
import { Link } from 'react-router-dom'

const BlogList = () => {
  return (
    <>
      <div className="main">
        <div className="pageTitle">文章列表</div>
        <div className="flex">
          <a href="addBlog.html" class="divided">
            <button class="btn">新增文章</button>
          </a>
        </div>
      </div>
    </>
  )
}

export default BlogList
