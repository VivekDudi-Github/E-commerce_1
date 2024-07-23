// function to add items to cart
import {useDispatch , useSelector} from "react-redux";
import {add_to_cart} from "../../../redux-store/productSlice"


function addTocart() { 
const dispatch = useDispatch() ;
const cartList = useSelector(state => state.productlist.cartList)

    const addToCart = (product , id) => {

        const foundItem = cartList.find(item => item.id === id);

        if(product.title != "" && product.price != "" && id ){
            if(cartList.length > 0 ){
                if( foundItem ){
                    cartList.forEach((item) => console.log(item.id , id))
                    alert("Product already in the cart")
                }else{
                    console.log("dispatched");
                    dispatch(add_to_cart({...product , id : id }))
                }
            }else {
                console.log("dispatched for empty array");
                dispatch(add_to_cart({...product , id : id }))
            }
        }else {
            console.log("failed to add product")
            alert("an error occured while adding the product")
        }
    }
    
return addToCart ;
}

export default addTocart ;