import AsyncStorage from '@react-native-async-storage/async-storage'
import { createStore } from 'aniuta'
import i18next from 'i18next'
import { useEffect, useState } from 'react'
import { API } from 'services'
import Strings from 'utils/localization/strings'

const useAuth = createStore({
  name: 'AuthService',
  Store: () => {
    const initialState = {
      user: null,
      token: null,
      authSkipped: false,
    }
    const [authState, setAuthState] = useState({ ...initialState })
    const [isAppLaunchedBefore, setIsAppLaunchedBefore] = useState(false)

    useEffect(async () => {
      const userData = await AsyncStorage.getItem('@user')
      if (userData) {
        const { token, user } = JSON.parse(userData)
        setAuthState({ user, token })
      }
    }, [])

    const skipAuth = () => {
      setAuthState({ ...authState, authSkipped: true })
    }

    const updateToken = (user, token) => {
      setAuthState({ user, token })
    }

    const checkToken = async () => {
      const userData = await AsyncStorage.getItem('@user')
      if (userData) {
        const { token } = JSON.parse(userData)
        return API.checkToken({
          params: { token },
        })
          .then((response) => {
            if (response.data.hasOwnProperty('id')) {
              const user = response.data
              setAuthState({ user, token })
              return AsyncStorage.setItem(
                '@user',
                JSON.stringify({ user, token }),
              )
            }
          })
          .catch((error) => {
            setAuthState({ ...initialState })
            return AsyncStorage.removeItem('@user')
          })
      }
    }

    const checkFirstLaunch = async () => {
      const isAppLaunchedBefore = await AsyncStorage.getItem(
        'isAppLaunchedBefore',
      )
      if (!isAppLaunchedBefore) {
        await AsyncStorage.setItem('isAppLaunchedBefore', 'true')
        setIsAppLaunchedBefore(false)
        return false
      } else {
        setIsAppLaunchedBefore(true)
        return true
      }
    }

    const signIn = async ({ email, password }) => {
      API.signIn({
        data: { email, password },
      })
        .then((response) => {
          if (response.data.hasOwnProperty('token')) {
            const { user, token } = response.data
            AsyncStorage.setItem('@user', JSON.stringify({ user, token }))
            setAuthState({ user, token })
          } else {
            alert('Something went wrong: ' + Object.values(response.data))
            setAuthState({ ...initialState })
          }
        })
        .catch((e) => {
          alert(e.response?.data?.error)
        })
    }

    const signUp = async ({ email, username, password, confirm_password }) => {
      API.signUp({
        data: { email, username, password, confirm_password },
      })
        .then((response) => {
          if (response.data.hasOwnProperty('message')) {
            signIn({ email, password })
          } else {
            alert('Something went wrong: ' + Object.values(response.data))
          }
        })
        .catch((error) =>
          alert(error.response?.data?.message || error.response?.data?.error),
        )
    }

    const signOut = () => {
      AsyncStorage.removeItem('@user')
      setAuthState({
        ...initialState,
      })
    }

    const resetPassword = async ({ email }) => {
      API.resetPassword({
        data: { email },
      })
        .then((response) => {
          if (response.data.hasOwnProperty('message')) {
            alert(response.data.message)
          } else {
            alert('Something went wrong: ' + Object.values(response.data))
          }
        })
        .catch((error) => {
          alert('Something went wrong:')
        })
    }

    const updateProfile = async (payload) => {
      return API.updateUserInfo({
        data: {
          ...payload,
        },
      })
        .then((result) => {
          const { data } = result
          let user = { ...authState.user }
          if (payload.avatarFile) {
            user.avatar = data.avatar
          }
          if (payload.username) {
            user.username = data.username
          }
          if (payload.email) {
            user.email = data.email
          }
          setAuthState({ user, token: authState.token })
          return AsyncStorage.setItem(
            '@user',
            JSON.stringify({ user, token: authState.token }),
          )
        })
        .catch((e) => alert(e.response?.data?.message))
    }

    const changePassword = async ({
      current_password,
      password,
      confirm_password,
    }) => {
      API.changePassword({
        data: { current_password, password, confirm_password },
      })
        .then((response) => {
          if (response.data.hasOwnProperty('message')) {
            alert(response.data.message)
          } else {
            alert('Something went wrong: ' + Object.values(response.data))
          }
        })
        .catch((error) => {
          alert(Strings.IncorrectData)
        })
    }

    return {
      ...authState,
      signIn,
      signUp,
      signOut,
      authState,
      isAppLaunchedBefore,
      checkToken,
      skipAuth,
      updateToken,
      resetPassword,
      changePassword,
      checkFirstLaunch,
      updateProfile,
    }
  },
})

export default useAuth
