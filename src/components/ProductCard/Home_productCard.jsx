import { NavLink } from "react-router-dom";
import {useSelector , useDispatch} from "react-redux"
import { DB } from "../../firebase/firebase";
import { collection , query , getDocs, orderBy, limit, startAfter } from "firebase/firestore";
import { useEffect , useState } from "react";
import {pushProducts } from "../../redux-store/productSlice"
import {newTime} from "../admin/Product_detail"
import addTocart from "../pages/cart/addToCart";
import Loader from "../track/Loader";


// productData 
// const productData = [
//     // {
//     //     id: 1,
//     //     image: 'https://i.pinimg.com/564x/3e/05/ce/3e05cefbc7eec79ac175ea8490a67939.jpg',
//     //     title: 'Hand Painted Blue Kaushalam Tea Pot in Aluminium',
//     //     desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
//     //     price: 150,
//     //     trendingProductName: 'Featured',
//     //     quantity: 1,
//     // },
//     // {
//     //     id: 2,
//     //     image: 'https://i.pinimg.com/736x/e4/61/f2/e461f2246b6ad93e2099d98780626396.jpg',
//     //     title: 'Kaushalam kalash Copper Pot',
//     //     desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
//     //     price: 120,
//     //     trendingProductName: 'Featured',
//     //     quantity: 1,
//     // },
//     // {
//     //     id: 3,
//     //     image: 'https://i.pinimg.com/564x/fd/50/68/fd50688767adb47aba7204f034554cbd.jpg',
//     //     title: 'Hand Painted Blue Kaushalam Tea Pot in Aluminium',
//     //     desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
//     //     price: 130,
//     //     trendingProductName: 'Featured',
//     //     quantity: 1,
//     // },
//     // {
//     //     id: 4,
//     //     image: 'https://i.pinimg.com/564x/22/80/8d/22808d88ada424962f2e064f3075b2d1.jpg',
//     //     title: 'Hand Painted Blue Kaushalam Tea Pot in Aluminium',
//     //     desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
//     //     price: 120,
//     //     trendingProductName: 'Featured',
//     //     quantity: 1,
//     // },
//     // {
//     //     id: 1,
//     //     image: 'https://i.pinimg.com/564x/3e/05/ce/3e05cefbc7eec79ac175ea8490a67939.jpg',
//     //     title: 'Hand Painted Blue Kaushalam Tea Pot in Aluminium',
//     //     desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
//     //     price: 150,
//     //     trendingProductName: 'Featured',
//     //     quantity: 1,
//     // },
//     // {
//     //     id: 2,
//     //     image: 'https://i.pinimg.com/736x/e4/61/f2/e461f2246b6ad93e2099d98780626396.jpg',
//     //     title: 'Kaushalam kalash Copper Pot',
//     //     desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
//     //     price: 120,
//     //     trendingProductName: 'Featured',
//     //     quantity: 1,
//     // },
//     // {
//     //     id: 3,
//     //     image: 'https://i.pinimg.com/564x/fd/50/68/fd50688767adb47aba7204f034554cbd.jpg',
//     //     title: 'Hand Painted Blue Kaushalam Tea Pot in Aluminium',
//     //     desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
//     //     price: 130,
//     //     trendingProductName: 'Featured',
//     //     quantity: 1,
//     // },
//     // {
//     //     id: 4,
//     //     image: 'https://i.pinimg.com/564x/22/80/8d/22808d88ada424962f2e064f3075b2d1.jpg',
//     //     title: 'Hand Painted Blue Kaushalam Tea Pot in Aluminium',
//     //     desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
//     //     price: 120,
//     //     trendingProductName: 'Featured',
//     //     quantity: 1,
//     // }
// ]

const HomePageProductCard = () => {
const addinCart = addTocart() ;

const dispatch = useDispatch() ;
const productList = useSelector(state => state.productlist.productLists) ;

const [loading , setloading] = useState(false) ;
const [lastVisible , setlastvisible] = useState(0) ;

const check_for_list = useSelector(state => state?.productlist?.productLists)

//getting the products
const getAllProducts = async () => {
    const collectionRef = collection(DB , "products")
    let q ; 
    if(lastVisible !== 0 ){
        q = query( collectionRef , orderBy("time") , startAfter(lastVisible) , limit(2))
    }else{
        q = query(collectionRef , orderBy("time") , limit(2))
    }

    try {
            setloading(true)
            const qSnapshot = await getDocs(q) ;
            qSnapshot.docs.map(doc =>  {
                dispatch(pushProducts({ ...doc.data() , time: newTime(doc.data().time) , id: doc.id  }));  
            }) 
            setlastvisible(qSnapshot.docs[qSnapshot.docs.length - 1])
            setloading(false)

    } catch (error) {
        setloading(false)
    console.log("error ",  error);
}
}

useEffect(() => {
    if( check_for_list.length == 0 ){
        getAllProducts() ;
    }
}, [])




    return (
        <div className="mt-10">
            {loading && <Loader/>}
            {/* Heading  */}
            <div className="">
                <h1 className=" text-center mb-5 text-2xl font-semibold">Bestselling Products</h1>
            </div>

            {/* main  */}
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-5 mx-auto">
                    <div className="flex flex-wrap m-4">
                        {productList.map((item, index) => {
                            const { image_url, title, price, id } = item
                            return (
                                <div key={index} className="p-4 w-full md:w-1/4">
                                    <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                                          <NavLink to={`/product_info/${id}`}>
                                            <img
                                                className="lg:h-80  h-96 w-full object-contain"
                                                src={image_url}
                                                alt="product_image"
                                            />
                                            </NavLink>
                                        <div className="p-6">
                                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                                E-bharat
                                            </h2>
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                {title.substring(0, 25)}
                                            </h1>
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                ₹{price}
                                            </h1>

                                            <div className="flex justify-center ">
                                                <button className=" bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold active:scale-95 duration-200"
                                                    onClick={() => addinCart(item , id) }
                                                >
                                                    Add To Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
            
            {/* load more button */}
            <div className="w-full">
                <button 
                className=" block mx-auto bg-pink-500 hover:bg-pink-600 w-[80%] text-white py-[8px] rounded-lg font-bold active:scale-95 duration-200"
                onClick={()=> getAllProducts()}
                >Load More</button>
            </div>
        </div>
    );
}

export default HomePageProductCard;