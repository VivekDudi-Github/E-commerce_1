// function to add items to cart
// import { DB } from "../../../firebase/firebase";
// import { addDoc , collection , doc } from "firebase/firestore";
import {useDispatch , useSelector} from "react-redux";
import {add_to_cart} from "../../../redux-store/productSlice"
import { auth } from "../../../firebase/firebase";

function addTocart() { 
// const userId = auth?.currentUser?.uid  ;
// const collectionRef = collection(DB , "cart")
// const docRef = doc(collectionRef , userId)
const dispatch = useDispatch() ;
const cartList = useSelector(state => state.productlist.cartList)


const addToCart = async(product , id) => {
        const item = {...product , id : id }


// adding items in state
        const foundItem = cartList.find(item => item.id === id);

        if(product.title != "" && product.price != "" && id ){
            if(cartList.length > 0 ){
                if( foundItem ){
                    alert("Product already in the cart")
                }else{
                    try {
                        dispatch(add_to_cart({...item}))
                        // await addDoc( docRef ,item )
                        // .then(() => console.log("successfully added in cart"))
                    } catch (error) {
                        console.log( "error while setting item cart_firestore" , error);
                    }
                }
            }else {
                dispatch(add_to_cart({...item}))
            }
        }else {
            console.log("failed to add product")
            alert("an error occured while adding the product")
        }
    }
    
return addToCart ;
}

export default addTocart ;