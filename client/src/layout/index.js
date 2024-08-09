import React from 'react'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer/Footer'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <>
     <Navbar/>
     <Outlet />
     <Footer/>
    </>
  )
}

export default MainLayout