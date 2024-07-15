import { NavLink } from "react-router-dom";
import { useSelector , useDispatch } from "react-redux";
import { query , onSnapshot  , collection, orderBy, QuerySnapshot } from "firebase/firestore"
import { DB } from "../../firebase/firebase";
import Loader from "../track/Loader";
import { pushProducts ,removeProducts } from "../../redux-store/productSlice";
import { useEffect, useState } from "react";

const ProductDetail = () => {
      const dispatch = useDispatch()
      const [ProductList , setProductList] = useState([])
        console.log(ProductList);

    const getProduct = () => {
        const collectionRef = collection (DB , "products")
        const q = query(collectionRef ,orderBy("time" ,"desc") )
    
        try {
            onSnapshot(q ,(QuerySnapshot)=> {
                let productArray = [] ; 
                QuerySnapshot.forEach((pro)=>{
                    productArray.push({...pro.data() , id: pro.id})
                    console.log("query-got");
                    setProductList(productArray) ;
                }
            )
            })
        } catch (error) {
            console.log(error);
            alert("error while fetching the products ")
        }
    }

    useEffect(()=> {
        getProduct() ;
    } , [])

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
                       
                        { ProductList.map(( { id, title, price, category, date, image_url } , index  ) =>{
                            console.log(index);
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
                           </td><td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 ">
                             edit
                           </td><td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 ">
                             Delete
                           </td>
                        </tr>)
                        })}
                           
                           
                           
                            {/* <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 ">
                                1.
                            </td>
                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                {'name'}
                            </td>
                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-green-500 cursor-pointer ">
                                Edit
                            </td> 
                            <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                                Delete
                            </td> */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductDetail;