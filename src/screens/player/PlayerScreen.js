import { Header } from 'components/header'
import React, { useMemo, useState, useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Image } from 'react-native'
import { API } from 'services'
import { cxs } from 'styles'
import { NewsVerticalList } from '../../components/NewsVerticalList/NewsVerticalList'
import stadium from "../../../assets/icons/play.png";
import { ArrowDownSvg } from '../../../assets/svgs/AllSvgs'
import bg from '../../../assets/bg.png';
import { getPlayerInfo } from '../../../api/livescore'
import moment from 'moment'




const PlayerScreen = ({ route, navigation }) => {
  const { Id } = route.params;
  const [activeC, setActiveC] = useState(0)
  const [loading, setLoading] = useState(true)
  const [PlayerInfo, setPlayerInfo] = useState()
  const [birth, setBirth] = useState()
  const IDS = [1, 2, 3, 4, 5, 6]

  const removeAllSymbols = string => {
    const letters = string?.replace(/[^a-zA-Z0-9 ]/g, ' ');

    return letters;
  };



  useEffect(() => {
    setLoading(true)
    getPlayerInfo(Id)
      .then(data => {
        setPlayerInfo(data.results)
        setBirth(data.results.birthdate)
        console.log(data)

      })
      .then(() => setLoading(false));
  }, [Id]);

  const PCareerStats = [
    {
      Title: 'Full Name',
      Data: `${PlayerInfo?.firstname} ${PlayerInfo?.lastname}`,
    },
    {
      Title: 'Born',
      Data: moment(birth).format('MMMM D, YYYY'),
    },
    {
      Title: 'Age',
      Data: moment(`${birth}`, "YYYYMMDD").fromNow().replace('ago', ''),
    },
    {
      Title: 'National Side',
      Data: `${PlayerInfo?.country?.name}`,
    },
    {
      Title: 'Batting Style',
      Data: `${removeAllSymbols(PlayerInfo?.batting_style)}`,
    },
    {
      Title: 'Sport',
      Data: 'Cricket',
    },

  ]




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

  const CareerStats = () => {
    return (
      <View style={styles.CareerCont}>
        <View style={styles.CareerFirsCont}>
          <TouchableOpacity style={styles.CareerDrowDawn}>
            <View style={styles.CareerDropTitle}>
              <Text style={styles.DropDawnTitle}>Tournament</Text>
              <Text style={styles.DropDawnTxt}>T20I</Text>
            </View>
            <ArrowDownSvg width={15} height={8} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.CareerDrowDawn}>
            <View style={styles.CareerDropTitle}>
              <Text style={styles.DropDawnTitle}>Season</Text>
              <Text style={styles.DropDawnTxt}>2019</Text>
            </View>
            <ArrowDownSvg width={15} height={8} />
          </TouchableOpacity>
        </View>
        <View style={styles.CareerSecCont}>

          <Text style={styles.PStatsHead}>
            Batting & Fielding Performance
          </Text>
          {PCareerStats.map((val, idx) => {
            return (
              <View style={styles.PStatsCont} key={idx}>
                <Text style={styles.PStatsTitle}>{val.Title}</Text>
                <Text style={styles.PStatsScore}>{val.Score}</Text>
              </View>
            )
          })}


        </View>
      </View>
    )
  }

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
        {PCareerStats.map((val, idx) => {
          return (
            <View style={styles.BioConts} key={idx}>
              <Text style={styles.BioDesc}>{val.Title}</Text>
              <Text style={styles.BioInfo}>{val.Data}</Text>
            </View>
          )
        })}
      </View>
    )
  }


  return (
    <View style={styles.flex}>
      <Header title={'PLAYERS'} leftAction={headerLeftAction} />
      <ImageBackground source={bg} style={styles.PScreenHead}>
        <Image
          style={styles.PlayerImg}
          source={{
            uri: `${PlayerInfo?.image_path}`,
          }}
        />
        <Text style={styles.PlayerName}>{PlayerInfo?.firstname} {PlayerInfo?.lastname}</Text>
        <Text style={styles.PlayerCountry}>{PlayerInfo?.country?.name}</Text>
        {/* <ImageBackground style={styles.bgStadiumContainer} source={stadium}></ImageBackground> */}
      </ImageBackground>
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
        {activeC == 2 ? (
          <CareerStats />
        ) : (
          null
        )}
      </ScrollView>

    </View>
  )
}

export default PlayerScreen

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
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  BioConts: {
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
  }, //Player Bio
  //Career Stats
  CareerCont: {
    width: '100%',
    height: '100%',
  },
  CareerFirsCont: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  CareerDrowDawn: {
    width: 172,
    height: 46,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  DropDawnTitle: {
    fontFamily: 'Jost',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 13,
    color: '#959595',
    marginVertical: 3,
  },
  DropDawnTxt: {
    fontFamily: 'Jost',
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 16,
    color: '#111315',
  },
  CareerSecCont: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    flexWrap: 'wrap',
    marginVertical: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  PStatsHead: {
    width: '100%',
    height: 44,
    backgroundColor: '#3555FF',
    fontFamily: 'Jost',
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 18.2,
    color: '#FFFFFF',
    justifyContent: 'flex-start',
    padding: 13,
  },
  PStatsCont: {
    width: '50%',
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderColor: '#EAEAEA',
    borderBottomWidth: 1,
    borderRightWidth: 1,
  },
  PStatsTitle: {
    fontFamily: 'Jost',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16.8,
    color: '#111315',
  },
  PStatsScore: {
    fontFamily: 'Jost',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 21,
    color: '#111315',
  },

  //Career Stats

})
