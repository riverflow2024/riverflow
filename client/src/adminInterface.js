import React from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'

import LeftCol from './components/adminLeftCol'

import PrdList from './pages/adminPages/prdList'
import AddPrd from './pages/adminPages/addPrd'

import BlogList from './pages/adminPages/blogList'

export default function AdminInterface () {
  const match = useMatch('/admin/*')

  return (
    <div className='admin-page'>
      <LeftCol />
      <Routes>
        <Route path='prdList' element={<PrdList />} />
        <Route path='prdList/edit' element={<AddPrd />} />
        <Route path='blogList' element={<BlogList />} />
      </Routes>
    </div>
  )
}
