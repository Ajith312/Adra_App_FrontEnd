import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "react-native";
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import RequestForm from "../Views/Pages/Employee/RequestForm";
import ProfileScreen from "../Views/Pages/ProfileScreen";
import EmployeeNotification from "../Views/Pages/Employee/EmployeeNotification";

const Tab = createBottomTabNavigator();

export const EmployeeNavigation = () => {
  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Home"
          component={RequestForm}
          options={{
            tabBarIcon: () => (
              <AntDesign name="appstore-o" size={24} color="black" />
            ),
          }}
        />
          <Tab.Screen
          name="Notification"
          component={EmployeeNotification}
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
