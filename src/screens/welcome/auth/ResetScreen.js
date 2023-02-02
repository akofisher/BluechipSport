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

function ResetScreen({ navigation }) {
  const { resetPassword } = useAuth()

  const [email, setEmail] = useState('')

  const reset = useCallback(() => {
    setEmail('')
  }, [])

  const goToNews = useCallback(() => {
    navigation.navigate('News')
  }, [navigation])

  const onLinkPress = useCallback(() => {
    navigation.navigate('Login')
  }, [navigation])

  const onConfirmPress = useCallback(async () => {
    await resetPassword({ email })
    reset()
    onLinkPress()
  }, [resetPassword, email, reset, onLinkPress])

  return (
    <>
      <Header withoutNavigation />
      <TouchableOpacity style={styles.close} onPress={goToNews}>
        <Icon iconName={'CloseBlack'} stroke={'#F2F2F2'} strokeWidth={32} />
      </TouchableOpacity>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.labels}>
            <Text style={styles.title}>{i18next.t('RESET PASSWORD')}</Text>
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
              onChangeText={setEmail}
              value={email}
            />
            <View style={styles.divider} />
            <View style={styles.divider} />
            <Button
              color={'pink'}
              title={i18next.t('RESET')}
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
    top: 45,
    right: 15,
    position: 'absolute',
  },
})

export default ResetScreen
