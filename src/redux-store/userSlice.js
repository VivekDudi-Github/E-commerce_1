import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    IsLoggedIN: false , 
    

}

const authSlice = createSlice({
    name : 'user'  , 
    initialState , 
    reducers : {
        loggingIn : (state)=> {
            state.IsLoggedIN = true ;
        } , 
        logginOut : (state)=> {
            state.IsLoggedIN = false ;
        }
    }
})

export const {loggingIn , loadingFalse , loadingTrue } = authSlice.actions
export default authSlice.reducer ;