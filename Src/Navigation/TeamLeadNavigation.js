import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ManagerHome from "../Views/Pages/Teamlead/ManagerHome";
import { AntDesign, MaterialIcons, Ionicons,MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "react-native";
import ProfilePage from "../Views/Pages/ProfilePage";
import ManagerRequest from "../Views/Pages/Teamlead/ManagerRequest";
import ManagerHistory from "../Views/Pages/Teamlead/ManagerHistory";

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
          name="Requests"
          component={ManagerRequest}
          options={{
            tabBarIcon: () => (
              <MaterialCommunityIcons name="book-plus" size={24} color="black" />
            ),
          }}
        />

        <Tab.Screen
          name="History"
          component={ManagerHistory}
          options={{
            tabBarIcon: () => (
              <Ionicons name="notifications" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfilePage}
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
