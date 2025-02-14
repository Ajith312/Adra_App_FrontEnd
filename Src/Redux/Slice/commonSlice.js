import { createSlice } from "@reduxjs/toolkit";

const commonSlice = createSlice({
    name: "common slice",
    initialState: {
        email: "",
        password: "",
        token: null,
        role: null,
        profileDetails:[],
        managerNotificationDetails:[],
        employeeNotificationDetails:[]
        

        
    },
    reducers: {
        updateLoginCredentials: (state, action) => {
            state[action.payload?.field] = action.payload?.value;
        },
        updateLoginResponse: (state, action) => {
            state.token = action.payload?.token;  
            state.role = action.payload?.role;
            state.email = "";
            state.password = "";
        },
        logoutUser: (state) => {
            state.token = "";
            state.role = "";
            state.profileDetails = [];
        },
        updateProfileDetails: (state, action) => {
            state.profileDetails = action.payload?.data;
        },
        updateManagerNotificationDetails:(state,action)=>{
            state.managerNotificationDetails=action.payload?.data
            
        },
        updateEmployeeNotificationDetails:(state,action)=>{
            state.employeeNotificationDetails=action.payload?.data
           
        },
        
        
    }
});

const { actions, reducer } = commonSlice;

export const {
    updateLoginCredentials,
    updateLoginResponse,
    logoutUser,
    updateProfileDetails,
    updateManagerNotificationDetails,
    updateEmployeeNotificationDetails
} = actions;

export default reducer;
