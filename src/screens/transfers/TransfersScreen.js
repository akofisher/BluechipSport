import { Header } from 'components/header'
import React, { useState, useRef, useMemo, useCallback } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'components/common'
import { StarIconFilled } from '../../../assets/svgs/AllSvgs'
import TeamsModal from '../../components/MyTeam/TeamsModal'

const TransfersScreen = ({ navigation }) => {



  const bottomSheetModalRef = useRef(null)
  const snapPoints = useMemo(() => ['10%', '75%'], [])

  const openTeamsModal = useCallback(
    // @ts-ignore
    () => bottomSheetModalRef.current.present(),
    [],
  )





  const onSearchPress = React.useCallback(
    () => navigation.navigate('searchScreen'),
    [],
  )
  const headerRightActions = useMemo(
    () => [
      {
        onPress: onSearchPress,
        iconName: 'Search',
      },
      {
        onPress: navigation.openDrawer,
        iconName: 'Menu',
      },
    ],
    [navigation.openDrawer, onSearchPress],
  )

  return (
    <View style={styles.flex}>
      <Header rightAction={headerRightActions} />
      {/* <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>UKAN</Text>
      </TouchableOpacity> */}
      <View style={styles.MyTeamContainer}>
        <View style={styles.IconCont}>
          <StarIconFilled color='#FFFFFF' />
          {/* <Image style={styles.MyTeamImg} source={ICONS.tabBar.myTeam} /> */}
        </View>
        <Text style={styles.MyTeamBoldTxt}>ADD YOUR FIRST FAVOURITE TEAM</Text>
        <Text style={styles.MyTeamLightTxt}>Have all matches and important news about
          your favourites team in one place</Text>
        <TouchableOpacity style={styles.AddTeamBtn} onPress={() => openTeamsModal()}>
          <Text style={styles.AddBtnTxt}>ADD TEAM</Text>
        </TouchableOpacity>
      </View>

      <TeamsModal bottomSheetModalRef={bottomSheetModalRef} />
    </View>
  )
}

const styles = StyleSheet.create({
  topMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  categoryText: {
    fontSize: 15,
    color: 'white',
    fontWeight: '500',
  },
  flex: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F2F2F2',
  },
  MyTeamContainer: {
    flex: 1,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  IconCont: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderColor: 'transparent',
    backgroundColor: '#FF0960',
    marginBottom: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  MyTeamBoldTxt: {
    fontFamily: 'Jost',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 25.2,
    color: '#111315',
    marginBottom: 8,
  },
  MyTeamLightTxt: {
    fontFamily: 'Jost',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
    color: '#111315',
  },
  AddTeamBtn: {
    width: 260,
    height: 48,
    borderRadius: 6,
    backgroundColor: '#01AF70',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35,
  },
  AddBtnTxt: {
    fontFamily: 'Jost',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 19.6,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  MyTeamImg: {
    width: 26,
    height: 25,
    tintColor: '#FFFFFF',
    color: '#FFFFFF',
  }

})

export default TransfersScreen
