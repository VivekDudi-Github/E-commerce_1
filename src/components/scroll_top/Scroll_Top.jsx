import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function Scroll_Top() {
    const pathName = useLocation() ;

    useEffect(()=> {
        setTimeout(()=> {
            window.scrollTo(0 , 0)
        } , 0)
    } ,[pathName])

  return null
}

export default Scroll_Top