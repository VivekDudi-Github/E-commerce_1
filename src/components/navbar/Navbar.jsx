import { useEffect } from "react";
import { Link , NavLink , useNavigate } from "react-router-dom";
import Search_Bar from "./Search_Bar";


import {auth, DB} from "../../firebase/firebase"
import { signOut , onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import {loggingIn , logginOut ,add_role , addUserdata } from "../../redux-store/userSlice"


const Navbar = () => {
const navigate = useNavigate() ;
const dispatch = useDispatch() ;


const [authStatus , setAuthStatus] = useState(false)
const [adminstatus , setAdminStatus] = useState(false)

//checking authstatus
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user);
      setAuthStatus(true);
      console.log("authstatus");
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


//signOut function
    const handle_signOut = () => {
        try {
            signOut(auth) ;
            console.log("logged out");
            setAuthStatus(false) ;
            dispatch(logginOut()) ;
            navigate("/login") ;
            
        } catch (error) {
            console.log(error);
        }
    }

// navList Data
    const navList = (
        <ul className="flex space-x-3 text-white font-medium text-md px-5 ">
            {/* Home */}
            <li>
                <NavLink to={"/"} >Home</NavLink>
            </li>

            {/* All Product */}
            <li>
                <Link to={'/all_products'} >All Product</Link>
            </li>

            {/* Signup */}
           { !authStatus && <li>
                <Link to={'/sign_up'} >Signup</Link>
            </li> }

            {/* Login */}
           { !authStatus && <li>
                <Link to={'/login'} >Login</Link>
            </li> }

            {/* User */}
            { authStatus && !adminstatus && <li>
                <Link to={'/user_dashboard'} >User</Link>
            </li>}

            {/* Admin */}
           { authStatus && adminstatus && <li>
                <Link to={'/admin_dashboard'} >Admin</Link>
            </li>}

            {/* Cart */}
            {authStatus && <li>
                <Link to={'/cart'} >
                    Cart(0)
                </Link>
            </li>}

            {/* Signout */}
             { authStatus && <li onClick={()=> handle_signOut()}
                    className="hover:cursor-pointer"
                    >   Signout
            </li>  }
            
        </ul>
    )
    return (
        <nav className="bg-pink-600 sticky top-0 z-50">
            {/* main  */}
            <div className="lg:flex lg:justify-between items-center py-3 lg:px-3 ">
                {/* left  */}
                <div className="left py-3 lg:py-0 text-center">
                    <NavLink to={'/'}>
                    <span className=" mx-auto font-bold text-white text-2xl text-center">E-Bharat</span>
                    </NavLink>
                </div>

                {/* right  */}
                <div className="right flex justify-center mb-4 lg:mb-0">
                    {navList}
                </div>

                {/* Search Bar  */}
                <Search_Bar />
            </div>
        </nav>
    );
}

export default Navbar;