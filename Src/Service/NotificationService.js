import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import Toast from "react-native-toast-message";
import { setFcmToken } from "../Redux/Slice/commonSlice";


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, 
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const registerForPushNotificationsAsync = async (dispatch) => {
  let fcmToken;

  if (!Device.isDevice) {
    alert("Must use a physical device for push notifications");
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }

  fcmToken = (await Notifications.getExpoPushTokenAsync()).data;
  console.log("Expo Push Token:", fcmToken);

  dispatch(setFcmToken(fcmToken));

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return fcmToken;
};

export const setupNotificationListeners = (navigationRef) => {
  const notificationListener = Notifications.addNotificationReceivedListener(
    (notification) => {
      Toast.show({
        type: "success",
        text1: notification.request.content.title,
        text2: notification.request.content.body,
      });
    }
  );

  const responseListener = Notifications.addNotificationResponseReceivedListener(
    (response) => {
      const data = response.notification.request.content.data;

      if (data && data.screen && navigationRef.isReady()) {
        navigationRef.current?.navigate(data.screen);
      }
    }
  );

  return { notificationListener, responseListener };
};
