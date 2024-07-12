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

          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}
export default App
