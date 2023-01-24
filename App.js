
import crashlytics from "@react-native-firebase/crashlytics";
import { Provider } from "aniuta";
import React from "react";
import { View, LogBox } from "react-native";
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { enableScreens } from "react-native-screens";
import { Root } from "screens";
import { cxs } from "styles";

import "stores";

enableScreens();

if (__DEV__) {
  import("./ReactotronConfig");
}

//Disable LogBox
LogBox.ignoreAllLogs(true);

class App extends React.Component {
  componentDidCatch(error, errorInfo) {
    crashlytics.log("JS Crash: " + JSON.stringify(error.stack));
  }

  render() {
    return (
      <Provider>
        <SafeAreaProvider>
          <View style={cxs.flex}>
            <Root />
          </View>
        </SafeAreaProvider>
      </Provider>
    );
  }
}

export default App;
