import { createSlice } from "@reduxjs/toolkit";
import { increment } from "firebase/firestore";


const initialState = {
    productLists: [],
    adminProductsList: [],
    cartList : [] , 
  };

const productSlice = createSlice({
    name: "productlist" ,
    initialState ,
    reducers : {
        pushProducts : (state , action) => {
            state.productLists.push(action.payload)
        } , 
        removeProducts : (state) => {
            state.productLists = [] ;
        } , 
        add_adminProducts : (state , action) => {
            state.adminProductsList.push(action.payload) ; 
        } , 
        removeAdminProducts : (state) => {
            state.adminProductsList = [] ; 
        } ,
        add_to_cart : (state , action) => {
            state.cartList.push(action.payload)
        } , 
        remove_cart : (state , action) => {
           const updated_cartList = state.cartList.filter(item => item.id !== action.payload  ) 
           return {...state , cartList : updated_cartList};
        } , 
        cart_changeQuantity : (state , action) => {
            return {
                ...state ,
                cartList :  state.cartList.map((item) => { 
                            if(item.id == action.payload.id ){
                                return {...item , amount : action.payload.amount == 0 ? 1  : action.payload.amount }
                            }else{
                                console.log(`Item with ID ${action.payload.id} not found in cart`);
                                return item ;
                            }
                            }) 
        }} , 
        cart_drecreamentQuantity : (state , action) => {
            return ( 
            state.cartList.forEach((item) => { 
                if(item.id == action.payload.id ){
                   
                } 
            }))
        } ,
        cart_remove : (state , action) => {
            state.cartList = []
        }
    }
})

export const {pushProducts , removeProducts , removeAdminProducts , add_adminProducts , 
                add_to_cart , remove_cart , cart_drecreamentQuantity , cart_changeQuantity , cart_remove } = productSlice.actions 
export default  productSlice  ;

