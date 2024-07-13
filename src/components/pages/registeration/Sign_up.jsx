import {useState} from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Timestamp , addDoc , collection } from "firebase/firestore";
import {createUserWithEmailAndPassword} from "firebase/auth"
import {auth , DB} from "../../../firebase/firebase"
import Loader from "../../track/Loader";


const Signup = () => {
    const navigate = useNavigate() ;
    const [Loading , setLoading ] = useState(false)

    const [UserData , setuserData] = useState({
        name : "" ,
        email: "" ,
        password : "" ,
        role : 'user' , 
    })

    //sign_up function
const handle_Signup  = async () => {
    if (UserData.name && UserData.email && UserData.password){
        try { 
            setLoading(true)
    const userCredentail = await createUserWithEmailAndPassword(auth , UserData.email , UserData.password)
       
            if(userCredentail){
                console.log("userCredentail" , userCredentail);
                const user = {
                    userId: userCredentail.user.uid , 
                    email : userCredentail.user.email ,
                    role : UserData.role , 
                    time : Timestamp.now() ,
                    date : new Date().toLocaleDateString(
                        "en-US"  , 
                        {
                            month: "short" , 
                            day : "2-digit" , 
                            year : "numeric"
                        }
                    ) 
                }
                const userRefrence = collection(DB , "user")
                
                addDoc(userRefrence , user)

                setuserData ({
                    name: ""  , 
                    email: "" , 
                    password : "" ,
                })
            alert("created account succesfully")
            setLoading(false) ;
            navigate("/login") ;

            }else{
                console.log("userCredential not found" );
            }
        } catch (error) {
            setLoading(false)
            console.log("error while creating the new account using email and password" , error);
            alert("error while creating the new account using email and password" )
        }
    }else{
        alert("all feilds are required")
    }
}

    return (
        <div className='flex justify-center items-center h-screen '>
            {/* Login Form  */}
            <div className="login_Form bg-pink-50 px-1 lg:px-8 py-6 border border-pink-100 rounded-xl shadow-2xl">

                {/* Top Heading  */}
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-pink-500 '>
                        Signup
                    </h2>
                </div>

                {/* Input One:Full Name  */}
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder='Full Name'
                        onChange={(e)=> setuserData({
                            ...UserData , 
                            name : e.target.value
                        })}
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200'
                    />
                </div>

                {/* Input Two:Email Address  */}
                <div className="mb-3">
                    <input
                        type="email"
                        placeholder='Email Address'
                        onChange={(e)=> setuserData({
                            ...UserData , 
                            email : e.target.value
                        })}
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200'
                    />
                </div>

                {/* Input Three:Password  */}
                <div className="mb-5">
                    <input
                        type="password"
                        placeholder='Password'
                        onChange={(e)=> setuserData({
                            ...UserData , 
                            password : e.target.value
                        })}
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200'
                    />
                </div>

                {/* Signup Button  */}
                <div className="mb-5">
                    <button
                        type='button'
                        className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md '
                        onClick={()=> handle_Signup() }
                    >
                        Signup
                    </button>
                </div>

                <div>
                    <h2 className='text-black'>Have an account <Link className=' text-pink-500 font-bold' to={'/login'}>Login</Link></h2>
                </div>

            </div>
           {Loading && <Loader/>}
        </div>
    );
}

export default Signup;