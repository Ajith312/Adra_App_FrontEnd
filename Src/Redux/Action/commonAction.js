import axios from "axios"
import { API_URL } from '@env';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateLoginCredentials, updateLoginResponse,logoutUser, updateProfileDetails, updateManagerNotificationDetails, updateEmployeeNotificationDetails, showToast, updateTeamMembersData, updateRefreshToken, updateLoadingSpinner } from "../Slice/commonSlice"
import axiosInstance from "../../Service/axiosInstance";



export const handleLoginCredentials = (payload)=>(dispatch)=>{
    dispatch(updateLoginCredentials(payload))
 
}

export const handleRefereshToken = async(dispatch)=>{
    try {
        const {data} = await axiosInstance.post(`${API_URL}/employee/get-referesh-token`)
        console.log("RefreshToken",data);
        if(data.error_code ===200){
            dispatch(updateRefreshToken(data?.token))
        }else{
            dispatch(logoutUser());
        }
        
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        dispatch(showToast({ type: 'error', message: errorMessage }));
    }
}

export const handleLogin = (payload, navigation) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${API_URL}/employee/login`, payload);

        if (data.error_code === 200) { 
            await AsyncStorage.setItem("token", data.token);
            await AsyncStorage.setItem("role", data.role);

            dispatch(updateLoginResponse({ token: data.token, role: data.role }));
            // dispatch(showToast({ type: 'success', message: data.message || 'Login Successful' }));
            dispatch(updateLoadingSpinner())

            if (data.role === "developer") {
                navigation.navigate('EMPLOYEE');
            } else if (data.role === "teamlead") {
                navigation.navigate('TEAMLEAD');
            }
        } else {
            dispatch(showToast({ type: 'error', message: data.message || 'Invalid credentials' }));
            dispatch(updateLoadingSpinner());
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        dispatch(showToast({ type: 'error', message: errorMessage }));
        dispatch(updateLoadingSpinner());
    }
};


export const handleLogout = (navigation) => async (dispatch) => {
    try {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('role');

        dispatch(logoutUser());
        dispatch(showToast({ type: 'success', message: "Logout Successful"}));

        navigation.navigate('Login');
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        dispatch(showToast({ type: 'error', message: errorMessage }));
    }
};


export const getProfileDetails = async (dispatch) => {
    try {
        const { data } = await axiosInstance.get(
            `${API_URL}/employee/get-profile-details`
        );
        dispatch(updateProfileDetails(data))
        

    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        dispatch(showToast({ type: 'error', message: errorMessage }));
    }
};


export const leaveAndPermissionRequest = (payload) => async (dispatch) => {
    try {
        const { data } = await axiosInstance.post(
            `${API_URL}/employee/leave-request`,
            payload
        );

        if(data.error_code === 200){
            dispatch(showToast({ type: 'success', message: data.message || 'Request Submitted Succesfull' }));
        }
      
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        dispatch(showToast({ type: 'error', message: errorMessage }));
    }
}


export const getLeaveAndPermissionRequest = async(dispatch)=>{
    try {
        const { data } = await axiosInstance.get(
            `${API_URL}/employee/get-levaerequest-details`,
        );
        dispatch(updateManagerNotificationDetails(data))
        
       
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        dispatch(showToast({ type: 'error', message: errorMessage }));
    }
}

export const getEmployeeLeaveAndPermissionRequest = async(dispatch)=>{
    try {
        const { data } = await axiosInstance.get(
            `${API_URL}/employee/employee-notification-details`
        );
        dispatch(updateEmployeeNotificationDetails(data))
       
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        dispatch(showToast({ type: 'error', message: errorMessage }));
    }
}


export const changeRequestStatus = (value) => async (dispatch) => {
    const { id, acceptedStatus } = value;

    try {
        const { data } = await axiosInstance.post(
            `${API_URL}/employee/approve-request/${id}`,
            { acceptedStatus }
        );
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        dispatch(showToast({ type: 'error', message: errorMessage }));
    }
};


export const getTeamMembersDetails = async(dispatch)=>{
    try {
        const { data } = await axiosInstance.get(
            `${API_URL}/employee/get-team-details`
        );
       dispatch(updateTeamMembersData(data))
       
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        dispatch(showToast({ type: 'error', message: errorMessage }));
    }
}


export const updateFcmToken = ({ fcmToken, email }) => async (dispatch) => {
    console.log("Updating FCM Token:", fcmToken);
    try {
      const { data } = await axios.post(
        `${API_URL}/employee/update-fcm-token`,
        { fcmToken,email },
        
      );
  
      console.log("FCM Token Updated:", data);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong";
      dispatch(showToast({ type: "error", message: errorMessage }));
    }
  };
  
