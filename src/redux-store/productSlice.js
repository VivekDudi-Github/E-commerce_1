import { createSlice } from "@reduxjs/toolkit";


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
            state.cartList.filter(item => item.id !== action.id ) 
        }
    }
})

export const {pushProducts , removeProducts , removeAdminProducts , add_adminProducts , 
                add_to_cart , remove_cart } = productSlice.actions 
export default  productSlice  ;

