import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "react-native";
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import EmployeeHome from "../Views/Pages/Employee/EmployeeHome";
import EmployeeHistory from "../Views/Pages/Employee/EmployeeHistory";
import ProfilePage from "../Views/Pages/ProfilePage";

const Tab = createBottomTabNavigator();

export const EmployeeNavigation = () => {
  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Home"
          component={EmployeeHome}
          options={{
            tabBarIcon: () => (
              <AntDesign name="appstore-o" size={24} color="black" />
            ),
          }}
        />
          <Tab.Screen
          name="History"
          component={EmployeeHistory}
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
