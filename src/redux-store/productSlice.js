import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    productLists: [],
    adminProductsList: [],
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
        }
    }
})
export const {pushProducts , removeProducts , removeAdminProducts , add_adminProducts } = productSlice.actions 
export default  productSlice  ;

