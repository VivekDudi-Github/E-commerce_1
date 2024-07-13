import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedIn: false , 
}

const authSlice = createSlice({
    name : 'user'  , 
    initialState , 
    reducers : {
        loggingIn : (state)=> {
            state.loggedIn = true ;
        } , 
        
    }
})

export const {loggingIn , loadingFalse , loadingTrue } = authSlice.actions
export default authSlice.reducer ;