import React from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'

import LeftCol from './components/adminLeftCol'

import PrdList from './pages/adminPages/prdList'
import AddPrd from './pages/adminPages/addPrd'
import PrdOrderList from './pages/adminPages/prdOrder'
import PrdOrderInfo from './pages/adminPages/prdOrderInfo'

import BlogList from './pages/adminPages/blogList'
import AddBlog from './pages/adminPages/addBlog'

import EventList from './pages/adminPages/eventList'
import AddEvent from './pages/adminPages/addEvent'
import EventOrderList from './pages/adminPages/eventOrder'
import EventOrderInfo from './pages/adminPages/eventOrderInfo'

export default function AdminInterface () {
  const match = useMatch('/admin/*')

  return (
    <div className='admin-page'>
      <LeftCol />
      <Routes>
        <Route path='prdList' element={<PrdList />} />
        <Route path='prdList/edit' element={<AddPrd />} />
        <Route path='prdOrderList' element={<PrdOrderList />} />
        <Route path='prdOrderList/edit' element={<PrdOrderInfo />} />
        <Route path='blogList' element={<BlogList />} />
        <Route path='blogList/edit' element={<AddBlog />} />
        <Route path='eventList' element={<EventList />} />
        <Route path='eventList/edit' element={<AddEvent />} />
        <Route path='eventOrderList' element={<EventOrderList />} />
        <Route path='eventOrderList/edit' element={<EventOrderInfo />} />
      </Routes>
    </div>
  )
}