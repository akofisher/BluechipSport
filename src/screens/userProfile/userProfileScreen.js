import Avatar from 'components/common/Avatar'
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import { CancelSource, API } from 'services'
import { hideUserInfo, useGlobalState } from 'stores'

import { Button, Icon, Text, TextInput } from '../../components/common'
import { Header } from '../../components/header'
import i18next from 'i18next'
import { useAuth } from '../../stores'
import { Colors } from '../../styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const UserProfileScreen = ({ navigation, route }) => {
  const { Refresh, myRefresh } = useGlobalState()
  const { user, signOut, updateProfile } = useAuth()

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('user.username')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (user) {
      setEmail(user.email)
      setUsername(user.username)
      setPassword('')
    }
  }, [user])

  const goToNews = useCallback(() => {
    navigation.navigate('News')
  }, [navigation])

  const onLogOut = useCallback(async () => {
    await signOut()
    goToNews()
  }, [goToNews, signOut])

  const isSaveEnabled = useMemo(() => {
    if (user) {
      const isUserNameChanged = username !== user.username
      const isEmailNameChanged = email !== user.email
      const isPasswordChanged = !!password

      return isUserNameChanged || isEmailNameChanged || isPasswordChanged
    }
    return false
  }, [user, email, password, username])

  const onSavePress = useCallback(async () => {
    const payload = {}
    if (username !== user.username) {
      payload.username = username
    }

    if (email !== user.email) {
      payload.email = email
    }

    if (!!password) {
      payload.password = password
    }
    await updateProfile(payload)
  }, [email, password, updateProfile, user?.email, user?.username, username])

  const { userInfoOnInput } = hideUserInfo()
  const [base64Icon, setBase64Icon] = useState()

  const pickImage = async () => {
    launchImageLibrary(
      {
        mediaTypes: 'photo',
        aspect: [1, 1],
        selectionLimit: 1,
        quality: 0.1,
        includeBase64: true,
      },
      (result) => {
        if (!result.didCancel) {
          API.updateUserInfo({
            data: {
              avatar_new: result.assets[0].uri,
            },
          })
            .then((response) => {
              setBase64Icon(response.data.avatar)
              Refresh(!myRefresh)
            })
            .catch((error) => alert(error))
        }
      },
    )
  }

  const { bottom } = useSafeAreaInsets()

  return (
    <>
      <>
        <Header withoutNavigation />
        <TouchableOpacity style={styles.close} onPress={goToNews}>
          <Icon iconName={'CloseBlack'} stroke={'#F2F2F2'} strokeWidth={32} />
        </TouchableOpacity>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View style={{ alignItems: 'center' }}>
            <Avatar uri={user?.avatar} size={78} onPress={pickImage} />
            <Text style={styles.profileLabel}>{i18next.t('PROFILE')}</Text>
          </View>
          <View style={styles.content}>
            <ScrollView keyboardShouldPersistTaps="handled">
              <TextInput
                placeholder={i18next.t('Email')}
                onChangeText={setEmail}
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
              <View style={styles.divider} />
              <View style={styles.divider} />
              <Button
                title={i18next.t('SAVE')}
                onPress={onSavePress}
                disabled={!isSaveEnabled}
              />
              <View style={styles.divider} />
              <View style={styles.divider} />
              <View style={styles.divider} />
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity
          onPress={onLogOut}
          style={[styles.logout, { paddingBottom: bottom }]}
        >
          <Icon iconName={'Logout'} />
          <Text style={styles.logoutText}>{i18next.t('LOG OUT')}</Text>
        </TouchableOpacity>
      </>
    </>
  )
}

export default UserProfileScreen

const styles = StyleSheet.create({
  userDetailContainer: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#F6F6F6',
  },
  userDetailContainerHide: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#F6F6F6',
    opacity: 0,
    height: 0,
  },
  userImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginTop: 31,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileLabel: {
    fontSize: 21,
    color: '#000000',
    fontWeight: '700',
    marginTop: 25,
    marginBottom: 35,
  },
  tabs: {
    height: 67,
    backgroundColor: '#ffffff',
  },
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
    top: 40,
    right: 15,
    position: 'absolute',
  },
  logoutText: {
    marginLeft: 5,
    color: Colors.textBlack,
    fontWeight: '600',
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingBottom: 15,
  },
})
