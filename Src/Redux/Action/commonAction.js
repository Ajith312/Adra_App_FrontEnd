import axios from "axios"
import { API_URL } from '@env';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateLoginCredentials, updateLoginResponse,logoutUser, updateProfileDetails, updateManagerNotificationDetails, updateEmployeeNotificationDetails, showToast, updateTeamMembersData } from "../Slice/commonSlice"



export const handleLoginCredentials = (payload)=>(dispatch)=>{
    dispatch(updateLoginCredentials(payload))
 
}

export const handleLogin = (payload, navigation) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${API_URL}/employee/login`, payload);

        if (data.error_code === 200) { 
            await AsyncStorage.setItem("token", data.token);
            await AsyncStorage.setItem("role", data.role);

            dispatch(updateLoginResponse({ token: data.token, role: data.role }));
            dispatch(showToast({ type: 'success', message: data.message || 'Login Successful' }));
         

            if (data.role === "developer") {
                navigation.navigate('EMPLOYEE');
            } else if (data.role === "teamlead") {
                navigation.navigate('TEAMLEAD');
            }
        } else {
            dispatch(showToast({ type: 'error', message: data.message || 'Invalid credentials' }));
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        dispatch(showToast({ type: 'error', message: errorMessage }));
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

export const getProfileDetails = (token) => async (dispatch) => {
    try {
        const { data } = await axios.get(
            `${API_URL}/employee/get-profile-details`,
            {
                headers: { Authorization: `Bearer ${token}` },
                "Content-Type": "application/json" 
            }
        );
        dispatch(updateProfileDetails(data))

    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        dispatch(showToast({ type: 'error', message: errorMessage }));
    }
};



export const leaveAndPermissionRequest = (token, payload) => async (dispatch) => {
    try {
        const { data } = await axios.post(
            `${API_URL}/employee/leave-request`,
            payload,
            {
                headers: { Authorization: `Bearer ${token}` },
                "Content-Type": "application/json" 
            }
        );

        if(data.error_code === 200){
            dispatch(showToast({ type: 'success', message: data.message || 'Request Submitted Succesfull' }));
        }
      
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        dispatch(showToast({ type: 'error', message: errorMessage }));
    }
}


export const getLeaveAndPermissionRequest = (token)=> async(dispatch)=>{
    try {
        const { data } = await axios.get(
            `${API_URL}/employee/get-levaerequest-details`,
            {
                headers: { Authorization: `Bearer ${token}` },
                "Content-Type": "application/json" 
            }
        );
        dispatch(updateManagerNotificationDetails(data))
        
       
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        dispatch(showToast({ type: 'error', message: errorMessage }));
    }
}

export const getEmployeeLeaveAndPermissionRequest = (token)=> async(dispatch)=>{
    try {
        const { data } = await axios.get(
            `${API_URL}/employee/employee-notification-details`,
            {
                headers: { Authorization: `Bearer ${token}` },
                "Content-Type": "application/json" 
            }
        );
        dispatch(updateEmployeeNotificationDetails(data))
       
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        dispatch(showToast({ type: 'error', message: errorMessage }));
    }
}


export const changeRequestStatus = (token, value) => async (dispatch) => {
    const { id, acceptedStatus } = value;

    try {
        const { data } = await axios.post(
            `${API_URL}/employee/approve-request/${id}`,
            { acceptedStatus },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json" 
                },
            }
        );
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        dispatch(showToast({ type: 'error', message: errorMessage }));
    }
};


export const getTeamMembersDetails = (token)=> async(dispatch)=>{
    try {
        const { data } = await axios.get(
            `${API_URL}/employee/get-team-details`,
            {
                headers: { Authorization: `Bearer ${token}` },
                "Content-Type": "application/json" 
            }
        );
       dispatch(updateTeamMembersData(data))
        // console.log(data);
       
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        dispatch(showToast({ type: 'error', message: errorMessage }));
    }
}


export const updateFcmToken = ({ fcmToken, email }) => async (dispatch) => {
    console.log("Updating FCM Token:", fcmToken);
    console.log("email",email);
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
  
