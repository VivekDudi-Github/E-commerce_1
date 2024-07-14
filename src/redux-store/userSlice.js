import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    IsLoggedIN: false , 
    role : "" ,
    email : "" ,
    userData : {} ,
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
            state.email ="" ;
            state.role = "" ;
            state.userData = null ;
        } ,
        addUserdata : (state , action) => {
            state.userData = action.payload
        } , 
        add_role : (state , action)=> {
            state.role = action.payload
        } ,
        remove_role : (state) => {
            state.role = "" ;
        } ,
        addEmail : (state , action) => {
            state.email = action.payload ;
        } ,
        removeEmail : (state , action) => {
            state.email = "" 
        } 
    }
})

export const {loggingIn , logginOut ,add_role ,remove_role , addEmail ,removeEmail ,addUserdata } = authSlice.actions
export default authSlice.reducer ;