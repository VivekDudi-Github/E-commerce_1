import { createSlice } from "@reduxjs/toolkit";

const intialState = {
    productList : [] 
}

const productSlice = createSlice({
    name: "productlist" ,
    intialState ,
    reducers : {
        pushProducts : (state , action) => {
            state.productList = action.payload
        } , 
        removeProducts : (state) => {
            state.productList = null ;
        }
    }
})
export const {pushProducts , removeProducts} = productSlice.actions 
export default productSlice  ;