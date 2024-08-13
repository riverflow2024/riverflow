import React from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import LeftCol from './components/adminLeftCol'
import PrdList from './pages/adminPages/prdList'

export default function AdminInterface () {
  const match = useMatch('/admin/*')

  return (
    <div className='admin-page'>
      <LeftCol />
      <Routes>
        <Route path='prdList' element={<PrdList />} />
      </Routes>
    </div>
  )
}
