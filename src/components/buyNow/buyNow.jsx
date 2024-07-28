import {Button , Dialog , DialogBody } from "@material-tailwind/react";
import { useState } from "react";
import { auth, DB } from "../../firebase/firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useSelector } from "react-redux";
import Loader from "../track/Loader";

const BuyNowModal = () => {
    const [open, setOpen] = useState(false);

    const [loader , setLoader] = useState(false)

    const cartItems = useSelector(state => state.productlist?.cartList)

    const [addressInfo, setAddressInfo] = useState({
        name: "",
        address: "",
        pincode: "",
        mobileNumber: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        ) 
    });

//function to place order 
const buyNowFunction = async (e) => {
    e.preventDefault() ;
    const collectionRef = collection( DB , "orders")

    const orderInfo = { 
        addressInfo ,
        email : auth.currentUser.email , 
        userId :  auth.currentUser.uid , 
        status: "confirmed",
        delivered : false ,
        dispatched : false ,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
                
            })   
    }

    try {
        let orderCount = 0 ;``

//looping cart items to create new orders        
        const promises = cartItems.map( async (item) => {
           try {
            setLoader(true)
            await addDoc(collectionRef , {...orderInfo , product : item , adminId : item.adminId})
            handleOpen();
            orderCount ++ ;
            setLoader(false)
            return Promise.resolve() ;
            
        } catch (error) {
            alert( `order failed after ${orderCount} orders`) ;
            console.log("error while doing loop for placing an order" , error);
            setLoader(false)
            return Promise.reject(error);  
        } 
    
        });
           await Promise.all(promises)
           .then(()=>{
            alert(`${orderCount} Orders Placed Successfully`) ;
            setLoader(false)
            setAddressInfo({ name: "", address: "", pincode: "", mobileNumber: "" });
           })
           .catch(()=> {
            console.error("Errors occurred:", errors);
            alert("An error occurred while placing the order");
            setLoader(false)
           })
    
    } catch (error) {
        console.log("error while placing an order" , error);
        alert("An error occurred while placing the order")
        setLoader(false)
    }
    }



    const handleOpen = () => setOpen(!open);
    return (
        <>
            <Button
                type="button"
                onClick={handleOpen}
                className="w-full px-4 py-3 text-center text-gray-100 bg-pink-600 border border-transparent dark:border-gray-700 hover:border-pink-500 hover:text-pink-700 hover:bg-pink-100 rounded-xl"
            >
                Buy now
            </Button>
            <Dialog open={open} handler={handleOpen} className=" bg-pink-50 z-40">
                
            <span className="z-50 absolute">
             { loader && <Loader/>}
            </span>
                <DialogBody className="">
                    <form onSubmit={buyNowFunction}>  
                        <div className="mb-3">
                            <input required
                                onChange={(e) => setAddressInfo({...addressInfo , name : e.target.value})}
                                type="text"
                                name="name"
                                placeholder='Enter your name'
                                className='bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300'
                            />
                        </div>

                        <div className="mb-3">
                            <input required
                                onChange={(e) => setAddressInfo({...addressInfo , address : e.target.value})}
                                type="text"
                                name="address"
                                placeholder='Enter your address'
                                className='bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300'
                            />
                        </div>

                        <div className="mb-3">
                            <input required
                                onChange={(e) => setAddressInfo({...addressInfo , pincode : e.target.value})}
                                type="number"
                                name="pincode"
                                placeholder='Enter your pincode'
                                className='bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300'
                            />
                        </div>

                        <div className="mb-3">
                            <input required
                                onChange={(e) => setAddressInfo({...addressInfo , mobileNumber : e.target.value})}
                                type="text"
                                name="mobileNumber"
                                placeholder='Enter your mobileNumber'
                                className='bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300'
                            />
                        </div>

                        <div className="">
                            <Button
                                type="submit"
                                className="w-full px-4 py-3 text-center text-gray-100 bg-pink-600 border border-transparent dark:border-gray-700 rounded-lg"
                            >
                                Buy now
                            </Button>
                        </div>
                    </form>
                </DialogBody>
            </Dialog>
        </>
    );
}

export default BuyNowModal;