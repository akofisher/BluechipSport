import Avatar from 'components/common/Avatar'
import i18next from 'i18next'
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { IsCancel, CancelSource, API } from 'services'
import { useAuth, welcomeBackState, useGlobalState } from 'stores'

import setting from '../../../assets/icons/setting.png'
import Header from '../header/Header'
import { LanguageSelectModal } from 'screens/news/LanguageSelectModal'
import { Icon, Text } from 'components/common'
import { useSelector } from 'react-redux'
import { selectAppLanguageCodeAndIcon } from '../../store/selectors/appSelectors'

const SideBar = ({ navigation }) => {
  const { signOut } = useAuth()
  const { WelcomeBack, welcome } = welcomeBackState()
  const { Refresh, myRefresh } = useGlobalState()

  const selectedLanguage = useSelector(selectAppLanguageCodeAndIcon)

  const bottomSheetModalRef = useRef(null)
  const openLanguageModal = () => bottomSheetModalRef.current.present()

  const source = CancelSource()
  const [topLeagues, setTopLeagues] = useState()
  const [err, serErr] = useState()

  const [user, setUser] = useState()
  const [team, setTeam] = useState()
  const getUser = () => {
    API.checkToken({ cancelToken: source.token })
      .then((response) => {
        setUser(response.data)
      })
      .catch((error) => [serErr(error), setUser(null)])
  }

  useEffect(() => {
    getUser()
    API.all([API.getTopLeagues(), API.getTopTeams()])
      .then((responses) => {
        const [leaguesResponse, teamResponse] = responses
        setTopLeagues(leaguesResponse.data.data)
        setTeam(teamResponse.data.data)
      })
      .catch((error) => {
        IsCancel(error)
      })
  }, [myRefresh])

  const MenuItems = ({ text, image, onPress }) => {
    return (
      <TouchableOpacity style={styles.menuItem} onPress={onPress}>
        {image != 0 && (
          <View style={styles.itemImgContainer}>
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={{ uri: image }}
            />
          </View>
        )}
        <Text style={styles.ItemText}>{text}</Text>
      </TouchableOpacity>
    )
  }

  const headerRightAction = useMemo(() => {
    return {
      onPress: navigation.closeDrawer,
      iconName: 'CloseBlack',
    }
  }, [navigation.closeDrawer])

  const renderLanguageButton = useCallback(() => {
    return (
      <TouchableOpacity
        style={styles.languageSelector}
        onPress={openLanguageModal}
      >
        <Icon iconName={selectedLanguage.iconName} />
        <Text style={styles.languageSelectorTitle}>
          {selectedLanguage.code}
        </Text>
      </TouchableOpacity>
    )
  }, [selectedLanguage, openLanguageModal])

  return (
    <View>
      <Header
        mode="light"
        rightAction={headerRightAction}
        renderTitle={renderLanguageButton}
      />
      <ScrollView style={{ marginBottom: user ? 155 : 100 }}>
        {/* <View style={styles.category}>
               <Text style={styles.categoryText}>{i18next.t("Categories}</Text>
            </View>
            <MenuItems text={i18next.t("news} image={false} />
            <MenuItems text={i18next.t("Transfers} image={false} />
            <MenuItems text={i18next.t("Scandals} image={false} />
            <MenuItems text={i18next.t("Highlights} image={false} />
            <MenuItems text={i18next.t("Stories} image={false} /> */}
        {/*<FlatList*/}
        {/*  ListHeaderComponent={() => {*/}
        {/*    return (*/}
        {/*      <>*/}
        {/*        <View style={styles.category}>*/}
        {/*          <Text style={styles.categoryText}>{i18next.t("PopularLeagues")}</Text>*/}
        {/*        </View>*/}
        {/*        <FlatList*/}
        {/*          data={topLeagues}*/}
        {/*          keyExtractor={(item, index) => index.toString()}*/}
        {/*          renderItem={({ item }) => {*/}
        {/*            return (*/}
        {/*              <MenuItems*/}
        {/*                text={item.name}*/}
        {/*                image={item.logo_path}*/}
        {/*                onPress={() => {*/}
        {/*                  navigation.navigate("LeagueDrawer", {*/}
        {/*                    leagueId: item.league_id,*/}
        {/*                    seasonID: item.current_season_id,*/}
        {/*                  });*/}
        {/*                }}*/}
        {/*              />*/}
        {/*            );*/}
        {/*          }}*/}
        {/*        />*/}
        {/*      </>*/}
        {/*    );*/}
        {/*  }}*/}
        {/*  ListFooterComponent={() => {*/}
        {/*    return (*/}
        {/*      <>*/}
        {/*        <View style={styles.category}>*/}
        {/*          <Text style={styles.categoryText}>{i18next.t("PopularClubs")}</Text>*/}
        {/*        </View>*/}
        {/*        <FlatList*/}
        {/*          data={team}*/}
        {/*          keyExtractor={(item, index) => index.toString()}*/}
        {/*          renderItem={({ item }) => {*/}
        {/*            return (*/}
        {/*              <MenuItems*/}
        {/*                text={item.name}*/}
        {/*                image={item.logo_path}*/}
        {/*                onPress={() => {*/}
        {/*                  navigation.navigate("teamScoreDrawer", {*/}
        {/*                    TeamId: item.id,*/}
        {/*                    LeagueId: item.league_id,*/}
        {/*                    TeamName: item.name,*/}
        {/*                    teamLogo: item.logo_path,*/}
        {/*                  });*/}
        {/*                }}*/}
        {/*              />*/}
        {/*            );*/}
        {/*          }}*/}
        {/*        />*/}
        {/*      </>*/}
        {/*    );*/}
        {/*  }}*/}
        {/*/>*/}
        {!user ? (
          <TouchableOpacity
            style={styles.authorizeBtn}
            onPress={() => {
              WelcomeBack(true)
            }}
          >
            <Text>{i18next.t('Authenticate')}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.authorizeBtn}
            onPress={() => [signOut(), WelcomeBack(false), setUser(null)]}
          >
            <Text>{i18next.t('LogOut')}</Text>
          </TouchableOpacity>
        )}
        {user ? (
          <TouchableOpacity
            style={styles.userContainer}
            onPress={() => navigation.navigate('userProfile', { user })}
          >
            <View style={styles.userImgContainer}>
              <Avatar color="#878787" size={40} uri={user?.avatar} />
            </View>
            <View style={styles.userName}>
              <Text style={styles.welcome}>{i18next.t('Hello')}</Text>
              <Text style={styles.name}>{user?.username}</Text>
            </View>
            <View style={styles.settings}>
              <Image style={{ flex: 1 }} source={setting} />
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.userContainer} />
        )}
      </ScrollView>
      <LanguageSelectModal bottomSheetModalRef={bottomSheetModalRef} />
    </View>
  )
}

const styles = StyleSheet.create({
  imgContainer: {
    width: 100,
    height: 17,
  },
  userContainer: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userImgContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  userName: {
    flex: 1,
    flexDirection: 'column',
  },
  welcome: {
    fontSize: 12,
    color: '#ffffff',
  },
  name: {
    fontSize: 13,
    color: '#ffffff',
  },
  settings: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
  category: {
    height: 35,
    backgroundColor: '#ffffff',
    paddingHorizontal: 18,
    justifyContent: 'center',
  },
  categoryText: {
    fontSize: 11,
    color: '#7C7C7C',
  },
  menuItem: {
    height: 50,
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 18,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#E3E3E3',
    flexDirection: 'row',
  },
  ItemText: {
    color: '#464646',
    fontSize: 14,
  },
  itemImgContainer: {
    width: 20,
    height: 20,
    marginRight: 9,
  },
  authorizeBtn: {
    marginVertical: 20,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#E3E3E3',
  },
  languageSelector: {
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageSelectorTitle: {
    textTransform: 'uppercase',
    marginLeft: 8,
    fontWeight: '500',
  },
})

export default SideBar
