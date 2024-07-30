import { where , onSnapshot ,query , collection, orderBy, limit  , deleteDoc , doc} from "firebase/firestore";
import { auth, DB } from "../../firebase/firebase";
import { useEffect, useState } from "react";
import { addToOrderList  , clear_orderList , remove_orderList} from "../../redux-store/productSlice";
import { useDispatch , useSelector } from "react-redux";
import {newTime} from "./Product_detail" ;
import Loader from "../track/Loader";


const OrderDetail = () => {
const [loader , setLoader] = useState(false)
const dispatch = useDispatch() ;

const orderRef = collection(DB , "orders")
const adminId = auth.currentUser.uid

const [list , setList] = useState([]) 

//fetching data from list
const fetching_Orders = () => {
    setLoader(true)
        const q = query(orderRef , orderBy("date") , where("adminId" , "==" , adminId ) , limit(10))
        try {
             onSnapshot(q , (qSnapshot)=> {
                dispatch(clear_orderList())
                if(qSnapshot.empty){
                    setLoader(false)
                    alert("no orders found")
                }else{
                qSnapshot.forEach((item) => {      
                    const data = item.data() ;
                    dispatch(addToOrderList({ ...item.data() , id : item.id  , time : newTime(data.time) , addressInfo : {...data.addressInfo , time : newTime(data.addressInfo.time)}}))
                    setLoader(false)
                })}
            })
        } catch (error) {
            setLoader(false)
            alert('No orders found')
            console.log( "error while fetching order details", error );
        }
    }

useEffect(() => {
    if(orderList.length == 0)
    fetching_Orders() ;
} , [])


//getting list from store
const orderList  = useSelector( state => state.productlist.orderList)
useEffect(() => {
    if(orderList) {
        setList(orderList)
    }
} , [orderList])


//delete function
const handleDelete = async(id) => {
    setLoader(true)
    try {
        await deleteDoc(doc(DB , "orders" , id) )
        dispatch(remove_orderList(id)) 
        alert("order deleted sucessfully")
        setLoader(false)
    } catch (error) {
        setLoader(false)
        alert("Error while completing the operation , Please try again later ")
        console.log(" error while deleing doc in order page ", error );
    }
}

    return (
        <div>
            {loader && <Loader/>}
            <div>
                <div className="py-5">
                    {/* text  */}
                    <h1 className=" text-xl text-pink-300 font-bold">All Order</h1>
                </div>

                {/* table  */}
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400" >
                        <tbody>
                            <tr>
                                <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">
                                    S.No.
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                    Order Id
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                    Image
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                    Title
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                    Category
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                    Price
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                    Quantity
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                    Total Price
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                    Status
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                    Name
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                    Address
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                    Pincode
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                    Phone Number
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                    Email
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                    Date
                                </th>

                                <th scope="col"
                                    className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                    Action
                                </th>


                            </tr>

                            {/* orders-list */}

                                {list.map((item , index) => {
                                    let product = item.product ;
                                    let addressInfo = item.addressInfo

                                    return (
                                <tr className="text-pink-300" key={item.id}>

                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 ">
                                        {index + 1}.
                                    </td>

                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 ">
                                        {item.id}
                                    </td>

                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        <img src={product.image_url} alt="product_image" />
                                    </td>

                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {product.title}
                                    </td>

                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {product.catagory}
                                    </td>

                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        ₹ {product.price}
                                    </td>

                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {product.amount ? product.amount : 1}
                                    </td>

                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        ₹ { product.amount ? product.price * product.amount : product.price}
                                    </td>

                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {item.status}
                                    </td>

                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {addressInfo.name}
                                    </td>

                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {addressInfo.address}
                                    </td>

                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {addressInfo.pincode}
                                    </td>

                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {addressInfo.mobileNumber}
                                    </td>

                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {item.email}
                                    </td>

                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {addressInfo.date}
                                    </td>

                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 ">
                                        <span className='text-red-500 font-bold p-2 bg-pink-50 rounded-lg active:bg-pink-300 active: hover:bg-pink-400 hover:text-blue-50 duration-300'
                                        onClick={()=> handleDelete(item.id)} >Delete</span>
                                        </td>
                                    </tr>
                                    )
                                    })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;