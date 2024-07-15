import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import productSlice from "./productSlice";

const store = configureStore({
    reducer : {
        user : userSlice ,
        productlist : productSlice ,
    }
})
export default store ;