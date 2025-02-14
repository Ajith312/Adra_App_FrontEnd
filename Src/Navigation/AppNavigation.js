import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Views/Auth/Login';
import ForgotPassword from '../Views/Auth/ForgotPassword';
import ResetPassword from '../Views/Auth/ResetPassword';
import RequestForm from '../Views/Pages/Employee/RequestForm';
import { TeamLeadNavigation } from './TeamLeadNavigation';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { EmployeeNavigation } from './EmployeeNavigation';
import { useDispatch } from 'react-redux';
import { handleLogout } from '../Redux/Action/commonAction';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();


export const AppNavigation = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()


  const handleLogoutSubmit = () => {
    dispatch(handleLogout(navigation)); 
};

  return (
    <Stack.Navigator initialRouteName="Login">
    
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
      <Stack.Screen name="RequestForm" component={RequestForm} options={{ headerShown: false }} />
      
    
      <Stack.Screen
        name="TEAMLEAD"
        component={TeamLeadNavigation}
        options={({ navigation }) => ({
          headerShown: true,
          headerLeft: null, 
          headerTitle: () => (
            <AntDesign name="menuunfold" size={24} color="black" />
            
          ),
          headerRight: () => (
            <TouchableOpacity onPress={handleLogoutSubmit}>
              <Text style={styles.logoutbtn}>Logout</Text>
            </TouchableOpacity>
          ),
         
        })}
      />

        
<Stack.Screen
        name="EMPLOYEE"
        component={EmployeeNavigation}
        options={({ navigation }) => ({
          headerShown: true,
          headerLeft: null, 
          headerTitle: () => (
            <AntDesign name="menuunfold" size={24} color="black" />
            
          ),
          headerRight: () => (
            <TouchableOpacity onPress={handleLogoutSubmit}>
              <Text style={styles.logoutbtn}>Logout</Text>
            </TouchableOpacity>
          ),
         
        })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  logoutbtn:{
    fontSize: 16, 
    color: 'white', 
    marginRight: 15,
    backgroundColor:"black",
    padding:10,
    borderRadius:5
  }
})
