import crashlytics from '@react-native-firebase/crashlytics'
import { Provider } from 'aniuta'
import { Provider as ReduxProvider } from 'react-redux'

import React from 'react'
import { View, LogBox, StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { enableScreens } from 'react-native-screens'
import { Root } from 'screens'
import { cxs } from 'styles'


import 'stores'
import { store } from './src/store'
import { Colors } from './src/styles'

enableScreens()

if (__DEV__) {
  import('./ReactotronConfig')
}

//Disable LogBox
LogBox.ignoreAllLogs(true)

class App extends React.Component {
  componentDidCatch(error, errorInfo) {
    crashlytics.log('JS Crash: ' + JSON.stringify(error.stack))
  }

  render() {
    return (
      <ReduxProvider store={store}>
        <Provider>
          <SafeAreaProvider>
            <View style={cxs.flex}>
              <StatusBar
                animated={true}
                backgroundColor={Colors.headerBackground}
                barStyle={'light-content'}
              />
              <Root />
            </View>
          </SafeAreaProvider>
        </Provider>
      </ReduxProvider>
    )
  }
}

export default App
