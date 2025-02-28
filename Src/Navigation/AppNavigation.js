import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Views/Auth/Login";
import ForgotPassword from "../Views/Auth/ForgotPassword";
import ResetPassword from "../Views/Auth/ResetPassword";
import RequestForm from "../Views/Pages/Employee/RequestForm";
import { TeamLeadNavigation } from "./TeamLeadNavigation";
import { StyleSheet, Image, View, Text } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { EmployeeNavigation } from "./EmployeeNavigation";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "../Redux/Action/commonAction";
import { useNavigation } from "@react-navigation/native";
import Details from "../Views/Auth/Details";
import Images from "../Utils/Image";
import ManagerTeam from "../Views/Pages/Teamlead/ManagerTeam";

const Stack = createStackNavigator();

export const AppNavigation = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { managerNotificationDetails } = useSelector(
    (state) => state.commonState
  );

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
              <Image
                source={Images.adraLogo}
                resizeMode="contain"
                style={styles.logo}
              />
            </>
          ),
          headerRight: () => (
            <View style={styles.headerIconBox}>
              <Ionicons name="notifications-outline" size={24} color="black" onPress={() => navigation.navigate('TEAMLEAD', { screen: 'Requests' })}
              />
              <Feather
                name="log-out"
                size={24}
                color="black"
                onPress={handleLogoutSubmit}
              />
              {managerNotificationDetails?.length > 0 ? (
                <View style={styles.notification}>
                  <Text style={styles.notificationtext}>
                    {managerNotificationDetails.length}
                  </Text>
                </View>
              ) : (
                ""
              )}
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
              <Image
                source={Images.adraLogo}
                resizeMode="contain"
                style={styles.logo}
              />
            </>
          ),
          headerRight: () => (
            <View style={styles.headerIconBox}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color="black"
                style={styles.notificationIcon}
              />
              <Feather
                name="log-out"
                size={24}
                color="black"
                onPress={handleLogoutSubmit}
              />
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  headerIconBox: {
    marginRight: 20,
    display: "flex",
    flexDirection: "row",
    gap: 25,
  },
  notificationIcon: {
    position: "relative",
  },
  notification: {
    width: 12,
    height: 12,
    backgroundColor: "red",
    borderRadius: "50%",
    position: "absolute",
    left: 12,
    top: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  notificationtext: {
    fontSize: 8,
    color: "#fff",
    fontWeight: "bold",
  },
});
