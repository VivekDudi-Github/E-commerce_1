import { useState , useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { auth, DB } from "../../../firebase/firebase";
import Loader from "../../track/Loader";
import {signInWithEmailAndPassword} from "firebase/auth"
import { doc, onSnapshot, query, QuerySnapshot, where , collection } from "firebase/firestore";

const Login = () => {
    const navigate = useNavigate()
    const [Loading , setLaoding] = useState(false) ;  

    const [userData , setUserData] = useState ({
        email : "" , 
        password : "" , 
    }) 

    const login_handler = async () => {
        if(userData.email && userData.password){
            try { setLaoding(true)
                const users = await signInWithEmailAndPassword(auth , userData.email , userData.password)
                    if(users){
                        setLaoding(false)
                        alert("Loggedin Successfully")
                        navigate("/")
                        setUserData({
                            email: "" , 
                            password : "" , 
                        })                        
                    }else{
                        setLaoding(false)
                        console.log("users didn't make");
                    }

            } catch (error) {
                setLaoding(false)
                alert("invalid credentials")
                console.log(error , "error while logging in");
            }
        }else{
            alert("Please fill all required fields")
        }
        }

//automatic redirecting if already user--        
        const authstatus = useSelector(state => state.user.IsLoggedIN)
        useEffect(() => {
            if(authstatus){
                navigate("/")
            }
        }, [authstatus])


    return (
        <div className='flex justify-center items-center h-screen'>
            {/* Login Form  */}
            <div className="login_Form bg-pink-50 px-1 lg:px-8 py-6 border border-pink-100 rounded-xl shadow-md">

                {/* Top Heading  */}
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-pink-500 '>
                        Login
                    </h2>
                </div>

                {/* Input Two  */}
                <div className="mb-3">
                    <input
                        type="email"
                        placeholder='Email Address'
                        onChange={(e)=> {
                            setUserData({
                                ...userData , 
                                email : e.target.value
                            })
                        }}
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200'
                    />
                </div>

                {/* Input Three  */}
                <div className="mb-5">
                    <input
                        type="password"
                        placeholder='Password'
                        onChange={(e)=> {
                            setUserData({
                                ...userData , 
                                password : e.target.value
                            })
                        }}
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200'
                    />
                </div>

                {/* Signup Button  */}
                <div className="mb-5">
                    <button
                        type='button'
                        onClick={()=> login_handler()}
                        className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md '
                    >
                        Login
                    </button>
                </div>

                <div>
                    <h2 className='text-black'>Don't Have an account <Link className=' text-pink-500 font-bold' to={'/sign_up'}>Signup</Link></h2>
                </div>
            </div>
            {Loading && <Loader/>}
        </div>
    );
}

export default Login;