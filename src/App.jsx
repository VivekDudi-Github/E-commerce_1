import { useState } from 'react'
import './App.css'
import { Button } from '@material-tailwind/react'
import {   BrowserRouter ,  Routes , Route} from "react-router-dom"
import Home from './components/pages/home/Home'
import No_home from './components/pages/no home/No_home'

function App() {

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/*' element={<No_home/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}
export default App
