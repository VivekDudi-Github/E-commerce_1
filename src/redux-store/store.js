import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import productSlice from "./productSlice";

const store = configureStore({
    reducer : {
        user : userSlice ,
        productlist : productSlice.reducer ,
    } 
})
export default store ;