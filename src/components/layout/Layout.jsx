import Navbar from "../navbar/Navbar"
import Footer from "../footer/Footer"


import React from 'react'

function Layout({children}) { 
  return (
    <div>
        <Navbar/>
        <div className='main-content '>
            {children}
        </div>
        <Footer/> 
    </div>
  )
}

export default Layout