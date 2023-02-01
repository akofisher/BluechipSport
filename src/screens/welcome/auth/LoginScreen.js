import { Text, TextInput, Button } from 'components/common'
import i18next from 'i18next'
import React, { useCallback, useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native'
import { Icon } from '../../../components/common'
import { Header } from '../../../components/header'
import { useAuth } from '../../../stores'

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn, user } = useAuth()

  const reset = useCallback(() => {
    setEmail('')
    setPassword('')
  }, [])

  const goToNews = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  useEffect(() => {
    if (user) {
      goToNews()
    }
  }, [goToNews, user])

  const goToResetPassword = useCallback(() => {
    navigation.navigate('Reset')
  }, [navigation])

  const onLinkPress = useCallback(() => {
    navigation.navigate('SignUp')
  }, [navigation])

  const onConfirmPress = useCallback(async () => {
    signIn({ email, password })
    reset()
  }, [email, password, reset, signIn])

  return (
    <>
      <Header withoutNavigation />
      <TouchableOpacity style={styles.close} onPress={goToNews}>
        <Icon iconName={'CloseBlack'} stroke={'#F2F2F2'} strokeWidth={32} />
      </TouchableOpacity>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.content}>
          <View style={styles.labels}>
            <Text style={styles.title}>{i18next.t('LOGIN')}</Text>
            <View style={styles.questionBlock}>
              <Text style={styles.question}>
                {i18next.t('Don’t have an account?')}
              </Text>
              <TouchableOpacity onPress={onLinkPress}>
                <Text style={styles.linkText}>{i18next.t('Registration')}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView keyboardShouldPersistTaps="handled">
            <TextInput
              placeholder={i18next.t('Email')}
              onChangeText={setEmail}
              value={email}
            />
            <View style={styles.divider} />
            <TextInput
              isPassword={true}
              placeholder={i18next.t('Password')}
              onChangeText={setPassword}
              onTogglePassword={goToResetPassword}
              value={password}
              customPasswordHideShowComponent={
                <Text style={styles.passwordHint}>{i18next.t('Forgot?')}</Text>
              }
            />
            <View style={styles.divider} />
            <View style={styles.divider} />
            <Button
              color={'pink'}
              title={i18next.t('LOGIN')}
              onPress={onConfirmPress}
            />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 35,
  },
  labels: {
    alignItems: 'center',
  },
  title: {
    color: '#000000',
    fontSize: 21,
    fontWeight: '700',
  },
  questionBlock: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 18,
    marginBottom: 33,
  },
  question: {
    color: '#111315',
    fontSize: 13,
    fontWeight: '400',
    marginRight: 4,
  },
  passwordHint: {
    top: -10,
    color: '#111315',
    fontSize: 15,
    fontWeight: '600',
  },
  linkText: {
    color: '#111315',
    fontSize: 15,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  divider: {
    height: 15,
  },
  close: {
    alignSelf: 'flex-end',
    top: 60,
    right: 15,
    position: 'absolute',
    zIndex: 1000,
  },
})

export default LoginScreen
