import Avatar from 'components/common/Avatar'
import React, { useState, useEffect, useCallback } from 'react'
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import { CancelSource, API } from 'services'
import { hideUserInfo, useGlobalState } from 'stores'

import { Icon, Text } from '../../components/common'
import { SafeAreaView } from 'react-native-safe-area-context'

const UserProfileScreen = ({ navigation, route }) => {
  const { Refresh, myRefresh } = useGlobalState()

  const { user } = route.params || { avatar: '' }
  const source = CancelSource()

  const goToNews = useCallback(() => {
    navigation.navigate('News')
  }, [navigation])

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
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <TouchableOpacity style={styles.close} onPress={goToNews}>
        <Icon iconName={'CloseBlack'} stroke={'#F2F2F2'} strokeWidth={32} />
      </TouchableOpacity>

      <View
        style={[
          userInfoOnInput
            ? styles.userDetailContainer
            : styles.userDetailContainerHide,
        ]}
      >
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity style={styles.userImg} onPress={pickImage}>
            <Avatar size={78} uri={user?.avatar} />
          </TouchableOpacity>
          <Text>PROFILE</Text>
        </View>
      </View>
    </SafeAreaView>
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
  content: {
    backgroundColor: '#F4F4F4',
    paddingBottom: 120,
  },
  close: {
    alignSelf: 'flex-end',
    paddingHorizontal: 15,
  },
})
