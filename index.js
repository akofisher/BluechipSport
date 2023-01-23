import messaging from "@react-native-firebase/messaging";
import initTranslate from "i18n/i18n";
import { AppRegistry } from "react-native";

import App from "./App";
initTranslate();
// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {});

AppRegistry.registerComponent("bluechipsport", () => App);
