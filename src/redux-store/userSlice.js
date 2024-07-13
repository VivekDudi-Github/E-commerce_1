import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedIn: false , 
    Isloading : false ,
}

const authSlice = createSlice({
    name : user  , 
    initialState , 
    reducers : {
        loggingIn : (state)=> {
            state.loggedIn = true ;
        } , 
        
        loadingTrue : (state) => {
            state.Isloading = true ;
        } ,
        loadingFalse : (state) => {
            state.Isloading = false ;
        } ,
    
    }
})

export const {loggingIn , loadingFalse , loadingTrue } = authSlice.actions
export default authSlice.reducer ;