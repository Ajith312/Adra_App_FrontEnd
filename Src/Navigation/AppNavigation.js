import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Views/Auth/Login";
import ForgotPassword from "../Views/Auth/ForgotPassword";
import ResetPassword from "../Views/Auth/ResetPassword";
import RequestForm from "../Views/Pages/Employee/RequestForm";
import { TeamLeadNavigation } from "./TeamLeadNavigation";
import {StyleSheet, Image, View } from "react-native";
import {Ionicons,Feather } from "@expo/vector-icons";
import { EmployeeNavigation } from "./EmployeeNavigation";
import { useDispatch } from "react-redux";
import { handleLogout } from "../Redux/Action/commonAction";
import { useNavigation } from "@react-navigation/native";
import Details from "../Views/Auth/Details";
import Images from "../Utils/Image";
import ManagerTeam from "../Views/Pages/Teamlead/ManagerTeam";

const Stack = createStackNavigator();

export const AppNavigation = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogoutSubmit = () => {
    dispatch(handleLogout(navigation));
  };

  return (
    <Stack.Navigator initialRouteName="Details">
      <Stack.Screen
        name="Details"
        component={Details}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Request Form"
        component={RequestForm}
        options={{ headerShown: true }}
      />
         <Stack.Screen
        name="My Teams"
        component={ManagerTeam}
        options={{ headerShown: true }}
      />

      <Stack.Screen
        name="TEAMLEAD"
        component={TeamLeadNavigation}
        options={({ navigation }) => ({
          headerShown: true,
          headerLeft: null,
          headerTitle: () => (
            <>
            <Image source={Images.adraLogo} resizeMode="contain" style={styles.logo} />
            </>
            ),
            headerRight: () => (
              <View style={styles.headerIconBox}>
                 <Ionicons name="notifications-outline" size={24} color="black" />
                 <Feather name="log-out" size={24} color="black" onPress={handleLogoutSubmit}  />
              </View>
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
          <>
          <Image source={Images.adraLogo} resizeMode="contain" style={styles.logo} />
          </>
          ),
          headerRight: () => (
            <View style={styles.headerIconBox}>
               <Ionicons name="notifications-outline" size={24} color="black" />
               <Feather name="log-out" size={24} color="black" onPress={handleLogoutSubmit}  />
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  logo:{
    width:50,
    height:50
  },
  headerIconBox:{
    marginRight:20,
    display:"flex",
    flexDirection:"row",
    gap:25
  }
});
