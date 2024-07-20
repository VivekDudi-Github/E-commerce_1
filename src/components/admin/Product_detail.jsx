import { NavLink } from "react-router-dom";
import { useSelector , useDispatch } from "react-redux";
import { query , onSnapshot  , collection, orderBy } from "firebase/firestore"
import { DB } from "../../firebase/firebase";
import Loader from "../track/Loader";
import { add_adminProducts , removeAdminProducts } from "../../redux-store/productSlice";
import { useEffect, useState } from "react";

const ProductDetail = () => {
const dispatch = useDispatch()


const [ProductList , setProductList] = useState([])

 //fetching the list from firestore
 const getProduct = () => {
    const collectionRef = collection (DB , "products")
    const q = query(collectionRef ,orderBy("time") )

    try {
        onSnapshot(q ,(QuerySnapshot)=> {
            dispatch(removeAdminProducts())
            QuerySnapshot.forEach((pro)=>{
                dispatch(add_adminProducts({...pro.data()  , time : newTime(pro.data().time) , id: pro.id})) ;
            }
        ) 
        } , 
    )
    } catch (error) {
        console.log(error);
        alert("error while fetching the products ")
    }
}


//function for making timestamp serializable
const newTime = (timestamp) => {
    let milliseconds ;
    if(  timestamp){
    milliseconds = timestamp.seconds * 1000  + timestamp.nanoseconds / 1000000 ; 
    const full_date  =  new Date(milliseconds) ;
    const date = `${full_date.getDate()}-${full_date.getMonth() + 1}-${full_date.getFullYear()}`
    return(date) ;
    } else {
        console.log("wrong date and time name") ;
        return ("unknown error or not available") ;
    }
 }


//intializing  from the store 
useEffect(()=> {
getProduct() ;
} , [])


//getting the list store
const adminProd = useSelector(state => state.productlist.adminProductsList) ;
useEffect(() => {
    if (adminProd) {
        setProductList(adminProd) ;
    }
} , [adminProd])

    
    return (
        <div>
            {/* <Loader/> */}
            <div className="py-5 flex justify-between items-center">
                {/* text  */}
                <h1 className=" text-xl text-pink-300 font-bold">All Product</h1>
                {/* Add Product Button  */}
                <NavLink to='/add_products'>
                    <button className="px-5 py-2 bg-pink-50 border border-pink-100 rounded-lg active:bg-pink-300 duration-500">Add Product</button>
                </NavLink>
            </div>

            {/* table  */}
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border sm:border-separate border-pink-100 text-pink-400" >
                    <tbody>
                        <tr>
                        <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">S.No.</th>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">Image</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Title</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Price</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Category</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"> Date</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Action</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Action</th>
                        </tr>
                       
                        { ProductList?  ProductList?.map(( { id, title, price, category, date, image_url } , index  ) =>{
                        return (
                        <tr className="text-pink-300" key={id}>   
                           <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 ">
                             {index + 1}.
                           </td>
                           <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                <div className="flex justify-center">
                                    <img className="w-20 " src={"https://i.pinimg.com/736x/e4/61/f2/e461f2246b6ad93e2099d98780626396.jpg"} alt="image" />
                                </div>
                           </td>
                           <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 ">
                             {title}.
                           </td><td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 ">
                             {price}.
                           </td><td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 ">
                             {category}
                           </td><td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 ">
                             {date.slice( 0 , 14 )}
                           </td><td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500  ">
                             <NavLink className='text-blue-500 font-bold p-2 bg-pink-50 rounded-lg active:bg-pink-300 active: hover:bg-pink-200 hover:text-blue-50 duration-300' to={`/update_product/${id}`}>Edit</NavLink>

                           </td><td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 ">
                           <NavLink className='text-red-500 font-bold p-2 bg-pink-50 rounded-lg active:bg-pink-300 active: hover:bg-pink-200 hover:text-blue-50 duration-300' to={"/update_post"}>Delete</NavLink>
                           </td>
                        </tr>)
                        }) 
                    : <h1> Updating</h1>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductDetail;