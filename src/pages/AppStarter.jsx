import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '@/components/Footer'


function AppStarter() {
  return (
    <>
      <Header />
      <div className='pt-16'>
        <Outlet/>
      </div>
      <div className='fixed w-full bottom-0'>

      <Footer />
      </div>
  
    </>
  )
}

export default AppStarter