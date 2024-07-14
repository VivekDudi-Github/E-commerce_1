import { Navigate } from 'react-router-dom'
import {useSelector } from "react-redux"

function Admin_protected_route({children}) {
const role = useSelector(state => state.user.role)

  console.log(role);
  if(role == "admin"){
    return children
      
  } else if (role === "user"){
        return <Navigate to={'/user_dashboard'} />

  }else if ( role === ""){
        return <Navigate to={"/login"} />
  }
  }

export default Admin_protected_route