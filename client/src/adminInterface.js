import React from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'

import AdminLogin from './pages/adminPages/adminLogin'
import LeftCol from './components/adminLeftCol'

import PrdList from './pages/adminPages/prdList'
import AddPrd from './pages/adminPages/addPrd'
import PrdOrderList from './pages/adminPages/prdOrder'
import PrdOrderInfo from './pages/adminPages/prdOrderInfo'

import BlogList from './pages/adminPages/blogList'
import AddBlog from './pages/adminPages/addBlog'
import EditBlog from './pages/adminPages/editBlog'

import EventList from './pages/adminPages/eventList'
import AddEvent from './pages/adminPages/addEvent'
import EditEvent from './pages/adminPages/editEvent'

import EventOrderList from './pages/adminPages/eventOrder'
import EventOrderInfo from './pages/adminPages/eventOrderInfo'

export default function AdminInterface() {
  useMatch('/admin/*')

  return (
    <div className='admin-page'>
      <LeftCol />
      <Routes>
        <Route index element={<AdminLogin />}></Route>
        <Route path='prdList' element={<PrdList />} />
        <Route path='prdList/create' element={<AddPrd />} />
        <Route path='prdOrderList' element={<PrdOrderList />} />
        <Route path='prdOrderList/edit/:id' element={<PrdOrderInfo />} />
        <Route path='blogList' element={<BlogList />} />
        <Route path='blogList/create' element={<AddBlog />} />
        <Route path='blogList/edit/:id' element={<EditBlog />} />
        <Route path='eventList' element={<EventList />} />
        <Route path='eventList/create' element={<AddEvent />} />
        <Route path='eventList/edit/:id' element={<EditEvent />} />
        <Route path='eventOrderList' element={<EventOrderList />} />
        <Route path='eventOrderList/edit/:id' element={<EventOrderInfo />} />
      </Routes>
    </div>
  )
}
