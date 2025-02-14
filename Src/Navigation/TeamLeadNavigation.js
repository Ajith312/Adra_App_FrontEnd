import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ManagerHome from "../Views/Pages/Teamlead/ManagerHome";
import ProfileScreen from "../Views/Pages/ProfileScreen";
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "react-native";
import ManagerNotification from "../Views/Pages/Teamlead/ManagerNotification";

const Tab = createBottomTabNavigator();

export const TeamLeadNavigation = () => {
  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Home"
          component={ManagerHome}
          options={{
            tabBarIcon: () => (
              <AntDesign name="appstore-o" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Notification"
          component={ManagerNotification}
          options={{
            tabBarIcon: () => (
              <Ionicons name="notifications" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: () => (
              <MaterialIcons name="person" size={30} color="black" />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};
