import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateLoginCredentials, updateLoginResponse,logoutUser, updateProfileDetails, updateManagerNotificationDetails, updateEmployeeNotificationDetails } from "../Slice/commonSlice"



export const handleLoginCredentials = (payload)=>(dispatch)=>{
    dispatch(updateLoginCredentials(payload))
 
}

export const handleLogin = (payload, navigation) => async (dispatch) => {
    try {
        const { data } = await axios.post("http://10.10.24.61:8000/employee/login", payload);

        if (data.error_code === 200) {
            await AsyncStorage.setItem("token", data.token);
            await AsyncStorage.setItem("role", data.role);

           
            dispatch(updateLoginResponse({ token: data.token, role: data.role }));

            if (data.role === "developer") {
                navigation.navigate('EMPLOYEE');
            } else if (data.role === "teamlead") {
                navigation.navigate('TEAMLEAD');
            }
        } else {
            console.log("Login failed:", data.message);
        }
    } catch (error) {
        console.error("Login error:", error);
        
    }
};


export const handleLogout = (navigation) => async (dispatch) => {
    try {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('role');

        dispatch(logoutUser());
        navigation.navigate('Login');
    } catch (error) {
        console.error("Logout error:", error);
    }
};

export const getProfileDetails = (token) => async (dispatch) => {
    try {
        const { data } = await axios.get(
            "http://10.10.24.61:8000/employee/get-profile-details",
            {
                headers: { Authorization: `Bearer ${token}` },
                "Content-Type": "application/json" 
            }
        );
        dispatch(updateProfileDetails(data))

    } catch (error) {
        console.error("Error fetching profile:", error);
    }
};



export const leaveAndPermissionRequest = (token, payload) => async (dispatch) => {
    try {
        const { data } = await axios.post(
            "http://10.10.24.61:8000/employee/leave-request",
            payload,
            {
                headers: { Authorization: `Bearer ${token}` },
                "Content-Type": "application/json" 
            }
        );
      
    } catch (error) {
        console.error("Error in leaveAndPermissionRequest:", error);
    }
}


export const getLeaveAndPermissionRequest = (token)=> async(dispatch)=>{
    try {
        const { data } = await axios.get(
            "http://10.10.24.61:8000/employee/get-levaerequest-details",
            {
                headers: { Authorization: `Bearer ${token}` },
                "Content-Type": "application/json" 
            }
        );
        dispatch(updateManagerNotificationDetails(data))
        
       
    } catch (error) {
        console.error("Error in leaveAndPermissionRequest:", error);
    }
}

export const getEmployeeLeaveAndPermissionRequest = (token)=> async(dispatch)=>{
    try {
        const { data } = await axios.get(
            "http://10.10.24.61:8000/employee/employee-notification-details",
            {
                headers: { Authorization: `Bearer ${token}` },
                "Content-Type": "application/json" 
            }
        );
        dispatch(updateEmployeeNotificationDetails(data))
       
    } catch (error) {
        console.error("Error in leaveAndPermissionRequest:", error);
    }
}


export const changeRequestStatus = (token, value) => async (dispatch) => {
    const { id, acceptedStatus } = value;

    try {
        const { data } = await axios.post(
            `http://10.10.24.61:8000/employee/approve-request/${id}`,
            { acceptedStatus },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json" 
                },
            }
        );
    } catch (error) {
        console.error("Error in changeRequestStatus:", error);
    }
};
