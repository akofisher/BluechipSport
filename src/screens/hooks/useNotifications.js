import messaging, { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
import { useEffect } from "react";
import { Platform } from "react-native";
import PushNotification from "react-native-push-notification";
import { requestUserPermission } from "utils";

export const useNotifications = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (response) => {
      if (Platform.OS !== "ios") {
        showNotification(response.notification);
      } else {
        const isPermissionGranted = await requestUserPermission();
        if (isPermissionGranted) {
          showNotification(response.notification);
        }
      }
    });

    return unsubscribe;
  }, []);

  const showNotification = (notification: FirebaseMessagingTypes.Notification) => {
    PushNotification.localNotification({
      title: notification.title,
      message: notification.body,
    });
  };
};
