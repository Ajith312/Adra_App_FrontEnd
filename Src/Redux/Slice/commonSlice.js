import { createSlice } from "@reduxjs/toolkit";

const commonSlice = createSlice({
    name: "common slice",
    initialState: {
        email: "",
        password: "",
        token: null,
        fcmToken:null,
        role: null,
        profileDetails:[],
        managerNotificationDetails:[],
        employeeNotificationDetails:[],
        filteredData:[],
        teamMembersDetails:[],
        toastVisible:false,
        toastType:"",
        toastMessage:"",
        modalShow:false,
        notificationTrigger:0
        

        
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
        updateFilteredData:(state,action)=>{
            state.filteredData = action.payload

        },
        updateTeamMembersData:(state,action)=>{
            state.teamMembersDetails = action?.payload?.data

        },
        showToast: (state, action) => {
            state.toastVisible = true;
            state.toastType = action.payload.type;
            state.toastMessage = action.payload.message;
          },
        hideToast: (state) => {
            state.toastVisible = false;
            state.toastMessage = '';
          },
        updateModelShow:(state)=>{
            state.modalShow=!state.modalShow
          },
        setFcmToken:(state,action)=>{
            state.fcmToken=action?.payload
        },
        setNotificationTrigger:(state,action)=>{
            state.notificationTrigger=action?.payload

        }
        
        
    }
});

const { actions, reducer } = commonSlice;

export const {
    updateLoginCredentials,
    updateLoginResponse,
    logoutUser,
    updateProfileDetails,
    updateManagerNotificationDetails,
    updateEmployeeNotificationDetails,
    updateFilteredData,
    updateTeamMembersData,
    showToast,
    hideToast,
    updateModelShow,
    setFcmToken,
    setNotificationTrigger
} = actions;

export default reducer;
