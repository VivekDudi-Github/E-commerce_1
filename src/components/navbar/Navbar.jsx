import { useEffect } from "react";
import { Link } from "react-router-dom";
import Search_Bar from "./Search_Bar";
import {auth, DB} from "../../firebase/firebase"
import { signOut , onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { collection, onSnapshot, query, QuerySnapshot, where } from "firebase/firestore";

const Navbar = () => {
const navigate = useNavigate() ;
const [authStatus , setAuthStatus] = useState(false)


//checking authstatus
    onAuthStateChanged( auth , (user) => {
        if(user){
            setAuthStatus(true)
        }else{
            setAuthStatus(false)
        }      
    })


//check admin status    
    try {
        if(authStatus){
        const q = query(
            collection(DB , "user") , where("userId" , "==" , auth?.currentUser?.uid)
        ) ;
        const data = onSnapshot(q , (QuerySnapshot) => {
            let userdata ;
            QuerySnapshot.forEach((doc) => userdata = doc.get("role") )
            console.log("retrieved role")
        })
    }else {
        console.log("waiting for authstatus");
    }
    } catch (error) {
        console.log(error);
    }


//
    const handle_signOut = async() => {
        try {
            await signOut(auth)
            console.log("logged out");
            navigate("/login")
        } catch (error) {
            console.log(error);
        }
    }

    // navList Data
    const navList = (
        <ul className="flex space-x-3 text-white font-medium text-md px-5 ">
            {/* Home */}
            <li>
                <Link to={'/'}>Home</Link>
            </li>

            {/* All Product */}
            <li>
                <Link to={'/all_products'}>All Product</Link>
            </li>

            {/* Signup */}
            <li>
                <Link to={'/sign_up'}>Signup</Link>
            </li>

            {/* User */}
            <li>
                <Link to={'/user_dashboard'}>User</Link>
            </li>

            {/* Admin */}
            <li>
                <Link to={'/admin_dashboard'}>Admin</Link>
            </li>

            {/* logout */}
            {/* <li>
                logout
            </li> */}

            {/* Cart */}
            <li>
                <Link to={'/cart'}>
                    Cart(0)
                </Link>
            </li>
            <li>
                <span onClick={()=> handle_signOut()}
                    className="hover:cursor-pointer"
                    >
                    Signout
                </span>
            </li>
        </ul>
    )
    return (
        <nav className="bg-pink-600 sticky top-0 z-50">
            {/* main  */}
            <div className="lg:flex lg:justify-between items-center py-3 lg:px-3 ">
                {/* left  */}
                <div className="left py-3 lg:py-0">
                    <Link to={'/'}>
                    <h2 className=" font-bold text-white text-2xl text-center">E-Bharat</h2>
                    </Link>
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