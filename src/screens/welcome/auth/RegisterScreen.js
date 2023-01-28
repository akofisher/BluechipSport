import {
  Text,
  TextInput,
  Button,
  KeyboardShiftlessView,
} from 'components/common'
import { Header, Footer, Pager } from 'components/welcome'
import i18next from 'i18next'
import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import { useAuth, welcomeBackState } from 'stores'
import { cxs } from 'styles'

function RegisterScreen() {
  const { signUp, skipAuth } = useAuth()
  const { WelcomeBack } = welcomeBackState()

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordHidden, setPasswordHidden] = useState(true)
  const [confirmPasswordHidden, setConfirmPasswordHidden] = useState(true)

  const togglePasswordVisibility = () => setPasswordHidden(!passwordHidden)
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordHidden(!confirmPasswordHidden)

  return (
    <KeyboardShiftlessView>
      <Text>{i18next.t('Registration')}</Text>
      <Text>{i18next.t('AuthBenefits')}</Text>
      <ScrollView keyboardShouldPersistTaps="handled">
        <TextInput
          placeholder={i18next.t('YourMail')}
          iconLeft={{ name: 'envelope' }}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder={i18next.t('YourNickname')}
          iconLeft={{ name: 'user' }}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          secureTextEntry={passwordHidden}
          placeholder={i18next.t('YourPass')}
          iconLeft={{ name: 'lock' }}
          iconRight={{
            name: passwordHidden ? 'eye' : 'eye-slash',
            onPress: togglePasswordVisibility,
          }}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          secureTextEntry={confirmPasswordHidden}
          placeholder={i18next.t('RepeatPass')}
          iconLeft={{ name: 'lock' }}
          iconRight={{
            name: confirmPasswordHidden ? 'eye' : 'eye-slash',
            onPress: toggleConfirmPasswordVisibility,
          }}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <Button
          title={i18next.t('Registration')}
          onPress={() => {
            signUp({
              email,
              username,
              password,
              confirm_password: confirmPassword,
            })
          }}
        />
      </ScrollView>
    </KeyboardShiftlessView>
  )
}

export default RegisterScreen
