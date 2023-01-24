import {
  Text,
  TextInput,
  Button,
  KeyboardShiftlessView,
} from 'components/common'
import i18next from 'i18next'
import React, { useCallback, useState } from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native'
import { Icon } from '../../../components/common'

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordHidden, setPasswordHidden] = useState(true)

  const goToNews = useCallback(() => {
    navigation.navigate('News')
  }, [navigation])

  const toggleVisibility = () => setPasswordHidden(!passwordHidden)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity style={styles.close} onPress={goToNews}>
        <Icon iconName={'CloseBlack'} stroke={'#F2F2F2'} strokeWidth={32} />
      </TouchableOpacity>
      <KeyboardShiftlessView>
        <Text>{i18next.t('AuthHeader')}</Text>
        <Text>{i18next.t('AuthBenefits')}</Text>
        <ScrollView keyboardShouldPersistTaps="handled">
          <TextInput
            placeholder={i18next.t('YourMail')}
            keyboardType="email-address"
            autoCapitalize="none"
            iconLeft={{ name: 'envelope' }}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            secureTextEntry={passwordHidden}
            placeholder={i18next.t('YourPass')}
            autoCapitalize="none"
            iconLeft={{ name: 'lock' }}
            iconRight={{
              name: passwordHidden ? 'eye' : 'eye-slash',
              onPress: toggleVisibility,
            }}
            onChangeText={(text) => setPassword(text)}
          />
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('Reset')}>
              <Text>{i18next.t('PassRecovery')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text>{i18next.t('Registration')}</Text>
            </TouchableOpacity>
          </View>
          <Button
            title={i18next.t('AuthHeader')}
            onPress={() => {
              signIn({ email, password })
            }}
          />
          <Text>{i18next.t('SignInWithSocialPlatforms')}</Text>
        </ScrollView>
      </KeyboardShiftlessView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  close: {
    alignSelf: 'flex-end',
    paddingHorizontal: 15,
  },
})

export default LoginScreen
