import { useState } from 'react'
import './App.css'
import { Button } from '@material-tailwind/react' 
import {   BrowserRouter ,  Routes , Route} from "react-router-dom"
import Home from './components/pages/home/Home.jsx'
import No_home from './components/pages/no home/No_home'
import Product_info from './components/pages/product_info/Product_info'
import Scroll_Top from './components/scroll_top/Scroll_Top.jsx'
import Cart from './components/pages/cart/Cart.jsx'
import All_products from './components/pages/all_product/All_products.jsx'
import Sign_up from './components/pages/registeration/Sign_up.jsx'
import Login from './components/pages/login/Login.jsx'
import User_dashboard from './components/pages/user/User_dashboard.jsx'
import Admin_dashboard from './components/pages/admin/Admin_dashboard.jsx'
import Add_product_page from './components/pages/admin/Add_product_page.jsx'
import Update_product_page from './components/pages/admin/Update_product_page.jsx'
import Loader from './components/track/Loader.jsx'

import {useSelector} from "react-redux"


function App() {
 
  return (
    <>
      <div>
        <BrowserRouter>
        <Scroll_Top/>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/*' element={<No_home/>} />
            <Route path='/product_info' element={<Product_info/>} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/all_products' element={<All_products/>} />
            <Route path='/sign_up' element={<Sign_up/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/user_dashboard' element={<User_dashboard/>} />
            <Route path='/admin_dashboard' element={<Admin_dashboard/>} />
            <Route path='/add_products' element={<Add_product_page/>} />
            <Route path='/update_product' element={<Update_product_page/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}
export default App
