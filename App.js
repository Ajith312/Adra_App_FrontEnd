import React, { useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNavigationContainerRef } from "@react-navigation/native";
import { AppNavigation } from "./Src/Navigation/AppNavigation";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./Store";
import Toast from "react-native-toast-message";
import GlobalToast from "./Src/Components/GlobalToast";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync, setupNotificationListeners } from "./Src/Service/NotificationService";
import { setNotificationTrigger } from "./Src/Redux/Slice/commonSlice";


export const navigationRef = createNavigationContainerRef();

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const notificationListener = useRef();
  const responseListener = useRef();
  const {notificationTrigger} = useSelector((state) => state.commonState);


  const handleNotificationReceived = () => {
    dispatch(setNotificationTrigger(notificationTrigger + 1));
  };

  useEffect(() => {
    registerForPushNotificationsAsync(dispatch);


    const listeners = setupNotificationListeners(navigationRef, handleNotificationReceived);
    notificationListener.current = listeners.notificationListener;
    responseListener.current = listeners.responseListener;


    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (response && response.notification.request.content.data) {
        const { screen } = response.notification.request.content.data;
        if (screen && navigationRef.isReady()) {
          navigationRef.current?.navigate(screen);
        }
      }
    });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, [dispatch, notificationTrigger]); 

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <AppNavigation />
      </NavigationContainer>
      <GlobalToast />
      <Toast />
    </>
  );
};

export default AppWrapper;
