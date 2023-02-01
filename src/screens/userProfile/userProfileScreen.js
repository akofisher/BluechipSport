import Avatar from 'components/common/Avatar'
import React, { useState, useEffect, useCallback } from 'react'
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
import { SafeAreaView } from 'react-native-safe-area-context'
import { Header } from '../../components/header'
import i18next from 'i18next'
import { useAuth } from '../../stores'

const UserProfileScreen = ({ navigation, route }) => {
  const { Refresh, myRefresh } = useGlobalState()

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { user, signOut } = useAuth()
  const source = CancelSource()

  const goToNews = useCallback(() => {
    navigation.navigate('News')
  }, [navigation])

  const onLogOut = useCallback(async () => {
    await signOut()
    goToNews()
  }, [goToNews, signOut])

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
            cancelToken: source.token,
            data: {
              avatar_new: `data:image/png;base64,${result.assets[0].base64}`,
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

  return (
    <>
      <>
        <Header withoutNavigation />
        <TouchableOpacity style={styles.close} onPress={goToNews}>
          <Icon iconName={'CloseBlack'} stroke={'#F2F2F2'} strokeWidth={32} />
        </TouchableOpacity>
        <KeyboardAvoidingView style={styles.container}>
          <View style={styles.content}>
            <ScrollView keyboardShouldPersistTaps="handled">
              {/*<TextInput*/}
              {/*  placeholder={i18next.t('Email')}*/}
              {/*  onChangeText={(text) => setEmail(text)}*/}
              {/*  value={email}*/}
              {/*/>*/}
              {/*<View style={styles.divider} />*/}
              {/*<TextInput*/}
              {/*  placeholder={i18next.t('Username')}*/}
              {/*  onChangeText={setUsername}*/}
              {/*  value={username}*/}
              {/*/>*/}
              {/*<View style={styles.divider} />*/}
              {/*<TextInput*/}
              {/*  isPassword={true}*/}
              {/*  placeholder={i18next.t('Password')}*/}
              {/*  onChangeText={setPassword}*/}
              {/*  value={password}*/}
              {/*/>*/}
              {/*<View style={styles.divider} />*/}
              {/*<TextInput*/}
              {/*  isPassword={true}*/}
              {/*  placeholder={i18next.t('Repeat Password')}*/}
              {/*  onChangeText={setConfirmPassword}*/}
              {/*  value={'confirmPassword'}*/}
              {/*/>*/}
              <View style={styles.divider} />
              <View style={styles.divider} />
              <Button
                color={'pink'}
                title={i18next.t('LOG OUT')}
                onPress={onLogOut}
              />
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
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
  userName: {
    color: '#000000',
    fontSize: 16,
    marginBottom: 26,
  },
  editIcon: {
    width: 39,
    height: 39,
    borderRadius: 19.5,
    backgroundColor: '#E53C48',
    position: 'absolute',
    right: 0,
    top: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
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
    top: 60,
    right: 15,
    position: 'absolute',
    zIndex: 1000,
  },
})
