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
        cart_incrementQuantity : (state , action) => {
            state.cartList.forEach((item) => { 
                if(item.id == action.payload.id ){
                    item.amount ? 
                    item = { ...item , amount : 1}  
                    : 
                    item = {...item , amount : action.payload.amount }
                } 
            })
        } , 
        cart_drecreamentQuantity : (state , action) => {
            state.cartList.forEach((item) => { 
                if(item.id == action.payload.id ){
                    item.amount ? 
                    item = { ...item , amount : 0}  
                    : 
                    item = {...item , amount : action.payload.amount }
                } 
            })
            }
    }
})

export const {pushProducts , removeProducts , removeAdminProducts , add_adminProducts , 
                add_to_cart , remove_cart , cart_drecreamentQuantity , cart_incrementQuantity } = productSlice.actions 
export default  productSlice  ;

