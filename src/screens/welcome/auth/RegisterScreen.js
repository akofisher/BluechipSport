import { Text, TextInput, Button } from 'components/common'
import i18next from 'i18next'
import React, { useCallback, useEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { Header } from '../../../components/header'
import { Icon } from '../../../components/common'
import { useAuth } from '../../../stores'

function RegisterScreen({ navigation }) {
  const { signUp, user } = useAuth()

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const reset = useCallback(() => {
    setEmail('')
    setUsername('')
    setPassword('')
    setConfirmPassword('')
  }, [])

  const goToNews = useCallback(() => {
    navigation.navigate('News')
  }, [navigation])

  useEffect(() => {
    if (user) {
      goToNews()
    }
  }, [goToNews, user])

  const onLinkPress = useCallback(() => {
    navigation.navigate('Login')
  }, [navigation])

  const onConfirmPress = useCallback(async () => {
    await signUp({
      email,
      username,
      password,
      confirm_password: confirmPassword,
    })
    reset()
  }, [confirmPassword, email, password, reset, signUp, username])

  return (
    <>
      <Header withoutNavigation />
      <TouchableOpacity style={styles.close} onPress={goToNews}>
        <Icon iconName={'CloseBlack'} stroke={'#F2F2F2'} strokeWidth={32} />
      </TouchableOpacity>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.content}>
          <View style={styles.labels}>
            <Text style={styles.title}>{i18next.t('REGISTRATION')}</Text>
            <View style={styles.questionBlock}>
              <Text style={styles.question}>
                {i18next.t('Have an account?')}
              </Text>
              <TouchableOpacity onPress={onLinkPress}>
                <Text style={styles.linkText}>{i18next.t('Login')}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView keyboardShouldPersistTaps="handled">
            <TextInput
              placeholder={i18next.t('Email')}
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            <View style={styles.divider} />
            <TextInput
              placeholder={i18next.t('Username')}
              onChangeText={setUsername}
              value={username}
            />
            <View style={styles.divider} />
            <TextInput
              isPassword={true}
              placeholder={i18next.t('Password')}
              onChangeText={setPassword}
              value={password}
            />
            <View style={styles.divider} />
            <TextInput
              isPassword={true}
              placeholder={i18next.t('Repeat Password')}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
            />
            <View style={styles.divider} />
            <View style={styles.divider} />
            <Button
              color={'pink'}
              title={i18next.t('REGISTRATION')}
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

export default RegisterScreen
