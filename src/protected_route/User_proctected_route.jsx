import {useSelector} from "react-redux"
import { Navigate } from "react-router-dom"

function User_procted_route({children}) {
  const user_role = useSelector(state => state.user.role)
  if(user_role == "user"){
    return children
      
  } else if ( user_role == "admin"){
        return <Navigate to={'/admin_dashboard'} />

  }else{
        return <Navigate to={"/login"} />
  }
  
}

export default User_procted_route