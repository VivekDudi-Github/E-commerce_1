import {useSelector} from "react-redux"
import { Navigate } from "react-router-dom"

function User_procted_route({children}) {
  const user_role = useSelector(state => state.user.role)
  if(user_role == "user" || "admin"){
    return children
      
  }else{
        return <Navigate to={"/login"} />
  }
  
}

export default User_procted_route