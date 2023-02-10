import { Header } from 'components/header'
import React, { useMemo, useState } from 'react'
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import { API } from 'services'
import { cxs } from 'styles'
import { NewsVerticalList } from '../../components/NewsVerticalList/NewsVerticalList'
import stadium from "../../../assets/icons/play.png";

const VideosScreen = ({ navigation }) => {
  const [activeC, setActiveC] = useState(0)
  const IDS = [1, 2, 3, 4, 5, 6]
  const actClas = {
    fontFamily: 'Jost',
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 15,
    color: '#FF0960',
  }

  const actBtn = {
    height: '100%',
    marginRight: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#FF0960',
  }

  const headerLeftAction = useMemo(
    () => ({
      onPress: navigation.goBack,
      iconName: "ArrowRight",
    }),
    [navigation.goBack],
  );

  const Cards = ({ id }) => {
    return (
      <TouchableOpacity style={styles.NewsCards}>
        <View style={styles.NewsCardImg}></View>
        <View style={styles.NewsCardTxtCont}>
          <Text style={styles.NewsCardTitle}>{id} - Infantino announces 32-team Club World Cup which will take place in 2025</Text>
          <Text style={styles.NewsCardTxt}>19 Dec 2022, 15:31</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const PlayerBio = () => {
    return (
      <View style={styles.PlayerBioCont}>
        <View style={styles.BioConts}>
          <Text style={styles.BioDesc}>Full Name</Text>
          <Text style={styles.BioInfo}>Sachin Ramesh</Text>
        </View>
        <View style={styles.BioConts}>
          <Text style={styles.BioDesc}>Born</Text>
          <Text style={styles.BioInfo}>April 24 , 1973 Bombay ( now Mumbai),
            Maharashtra</Text>
        </View>
        <View style={styles.BioConts}>
          <Text style={styles.BioDesc}>Age</Text>
          <Text style={styles.BioInfo}>49 Years, 8 Month, 20 Days</Text>
        </View>
        <View style={styles.BioConts}>
          <Text style={styles.BioDesc}>National side</Text>
          <Text style={styles.BioInfo}>India</Text>
        </View>
        <View style={styles.BioConts}>
          <Text style={styles.BioDesc}>Batting Style</Text>
          <Text style={styles.BioInfo}>Right Hand</Text>
        </View>
        <View style={styles.BioConts}>
          <Text style={styles.BioDesc}>Bowling</Text>
          <Text style={styles.BioInfo}>Off Break</Text>
        </View>
        <View style={styles.BioConts}>
          <Text style={styles.BioDesc}>Sport</Text>
          <Text style={styles.BioInfo}>Cricket</Text>
        </View>
      </View>
    )
  }


  return (
    <View style={styles.flex}>
      <Header title={'PLAYERS'} leftAction={headerLeftAction} />
      <View style={styles.PScreenHead}>
        <View style={styles.PlayerImg}></View>
        <Text style={styles.PlayerName}>Sachin Tendulkar</Text>
        <Text style={styles.PlayerCountry}>INDIA</Text>
        {/* <ImageBackground style={styles.bgStadiumContainer} source={stadium}></ImageBackground> */}
      </View>
      <View style={styles.PScreenNav}>
        <TouchableOpacity style={activeC == 0 ? actBtn : styles.NavBtn} onPress={() => {
          setActiveC(0)
        }}>
          <Text style={activeC == 0 ? actClas : styles.NavBtnTxt}>NEWS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={activeC == 1 ? actBtn : styles.NavBtn} onPress={() => {
          setActiveC(1)
        }}>
          <Text style={activeC == 1 ? actClas : styles.NavBtnTxt}>PLAYER BIO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={activeC == 2 ? actBtn : styles.NavBtn} onPress={() => {
          setActiveC(2)
        }}>
          <Text style={activeC == 2 ? actClas : styles.NavBtnTxt}>CAREER STATS</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.PScreenContent}>
        {activeC == 0 ? IDS.map((id, idx) => {
          return (
            <Cards id={id} key={idx} />
          )
        }) : null}
        {activeC == 1 ? (
          <PlayerBio />
        ) : null}
      </ScrollView>

    </View>
  )
}

export default VideosScreen

const styles = StyleSheet.create({
  flex: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F2F2F2',
  },
  PScreenHead: {
    width: '100%',
    height: 139,
    backgroundColor: 'rgba(16, 25, 33, 0.77)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgStadiumContainer: {
    flex: 1,
    resizeMode: "cover",
    paddingHorizontal: 10,
    borderRadius: 20,
    overflow: "hidden",
  },
  PlayerImg: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: 'blue',
  },
  PlayerName: {
    fontFamily: 'Jost',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 25.2,
    color: '#FFFFFF',
  },
  PlayerCountry: {
    fontFamily: 'Jost',
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 18.2,
    color: '#959595',
  },
  PScreenNav: {
    width: '100%',
    height: 52,
    backgroundColor: '#101921',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 26,
  },
  NavBtn: {
    height: '100%',
    marginRight: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  NavBtnTxt: {
    fontFamily: 'Jost',
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 14,
    color: '#FFFFFF',
  },
  PScreenContent: {
    padding: 15,
  },
  //New Content
  NewsCards: {
    width: 360,
    height: 81,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginBottom: 22,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  NewsCardImg: {
    width: 124,
    height: '100%',
    backgroundColor: 'gray',
  },
  NewsCardTxtCont: {
    paddingHorizontal: 5,
    paddingVertical: 7,
  },
  NewsCardTitle: {
    width: 219,
    height: 37,
    fontFamily: 'Jost',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16.8,
    color: '#111315',
    marginBottom: 16,
  },
  NewsCardTxt: {
    fontFamily: 'Jost',
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 11,
    color: '#959595',
  },    //New Content
  //Player Bio
  PlayerBioCont: {
    width: 360,
    height: 466,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  BioConts: {
    flex: 1,
    padding: 15,
    borderBottomColor: '#EAEAEA',
    borderBottomWidth: 1,
  },
  BioDesc: {
    fontFamily: 'Jost',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 16.8,
    color: '#959595',
  },
  BioInfo: {
    fontFamily: 'Jost',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 21.68,
    color: '#111315',
  },


})
