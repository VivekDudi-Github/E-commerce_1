//for checking authstatus and updating userdata
import {useState , useEffect} from "react"
import { auth , DB } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {where , query , onSnapshot , collection} from "firebase/firestore"

import {  useDispatch} from "react-redux"
import { loggingIn, logginOut , add_role , addUserdata } from "../../redux-store/userSlice";

export default function Check_auth (){
    const dispatch = useDispatch() ;
    const [authStatus , setAuthStatus] = useState(false)
    const [adminstatus , setAdminStatus] = useState(false)
    
//checking authstatus
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setAuthStatus(true);
          dispatch(loggingIn());
        } else {
          setAuthStatus(false);
          dispatch(logginOut());
        }
      });
      return () => unsubscribe(); 
    }, []) 
    
    
//check admin status and updating userdata 
       useEffect (() => {
        try {
            if(authStatus){
            const q = query(
                collection(DB , "user") , where("userId" , "==" , auth?.currentUser?.uid)
            ) ;
             onSnapshot(q , (QuerySnapshot) => {
                let userdata ;
                QuerySnapshot.forEach((doc) => userdata = doc.data() )
                if(userdata) {
                    dispatch(add_role(userdata.role)) ;
                    dispatch(addUserdata({ 
                        email : userdata.email , 
                        date : userdata.date ,
                        name : userdata.name , 
                     })) ;
                }
                if(userdata.role == "admin"){
                    setAdminStatus(true)
                }
            })
        }
        } catch (error) {
            console.log(error);
        }
       } , [authStatus])
    
    return null
}