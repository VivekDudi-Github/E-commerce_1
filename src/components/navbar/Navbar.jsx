import { useEffect } from "react";
import { Link , NavLink , useNavigate } from "react-router-dom";
import Search_Bar from "./Search_Bar";

import {auth } from "../../firebase/firebase"
import { signOut  } from "firebase/auth";
import { useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import {loggingIn , logginOut ,add_role , addUserdata } from "../../redux-store/userSlice"


const Navbar = () => {
const navigate = useNavigate() ;
const dispatch = useDispatch() ;

const auththentication = useSelector(state => state.user.IsLoggedIN)
const AdminAuthenitcation = useSelector(state => state.user.role)

const [authStatus , setAuthStatus] = useState(auththentication)
const [adminstatus , setAdminStatus] = useState("")

useEffect(() => {
    setAdminStatus(AdminAuthenitcation);
    setAuthStatus(auththentication) ;
  }, [AdminAuthenitcation ,auththentication ]);


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
            { authStatus && adminstatus !== "admin"  && <li>
                <Link to={'/user_dashboard'} >User</Link>
            </li>}

            {/* Admin */}
           { authStatus && adminstatus == "admin" && <li>
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