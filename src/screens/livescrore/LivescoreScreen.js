import { Spinner } from "components/common";
import { Header } from "components/header";
import i18next from "i18next";
import moment from "moment";
import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import { styles } from "react-native-floating-label-input/src/styles";
import Entypo from "react-native-vector-icons/dist/Entypo";
// eslint-disable-next-line import/order
import { API } from "services";

import { useFavoriteMatch, useDevice } from "stores";
import { cxs, Colors } from "styles";
import { ArrowDownSvg, LiveStreamSvg } from "../../../assets/svgs/AllSvgs";
import { SvgICONSType } from '../../../assets/svgs/svgIcons'
import { Icon } from "../../components/common";


Entypo.loadFont();

const LivescoreScreen = ({ navigation }) => {
  const IDS = [1, 2, 3, 4, 5, 6]
  const [leagues, setLeagues] = useState({})
  const [loading, setLoading] = useState(true)

  const date = new Date().toISOString().slice(0, 10)

  const [year, month, day] = date.split('-')

  const Today = `${day}-${month}-${year}`;


  useEffect(() => {

    fetch(`https://cricket.bluechipsport.io/api/fixtures/date/${Today}`)
      .then(response => response.json())
      .then(data => setLeagues(data.results))
      .then(() => setLoading(false))

  }, [Today])

  const LiveStreamBtn = () => {
    return (
      <TouchableOpacity style={Styles.LiveStreamCont}>
        <LiveStreamSvg width={'11'} height={'11'} fill={'rgba(1, 175, 112, 1)'} />
        <Text style={Styles.LiveStreamTxt}>LIVE STREAM</Text>
      </TouchableOpacity>
    )
  }

  const LiveBtn = () => {
    return (
      <TouchableOpacity style={Styles.LiveCont}>
        <View style={Styles.LiveDot}></View>
        <Text style={Styles.LiveTxt}>LIVE</Text>
      </TouchableOpacity>
    )
  }

  const Cards = ({ data }) => {
    return (
      <>

        <View style={Styles.CardMainCont}>
          <View style={Styles.CardMainHeader}>
            <View style={Styles.HeaderLogo}></View>
            <Text style={Styles.HeaderTitle}>{data.league.name}</Text>
          </View>
          <View style={Styles.CardBodyCont}>
            <View style={Styles.TeamsCont}>

              <View style={Styles.LiveDateHead}>
                <View style={Styles.Flexible}>
                  <LiveBtn />
                  <LiveStreamBtn />
                </View>
                <Text style={Styles.MatchDtTxt}>2 INN, 6.0 OV</Text>
              </View>

              <TouchableOpacity onPress={() => navigation.navigate('MatchDetails')}>
                <View style={Styles.Team}>
                  <View style={Styles.Team}>
                    <View style={Styles.TeamLogo}></View>
                    <Text style={Styles.TeamName}>{data.home_team.name}</Text>
                  </View>

                  {data.scoreboards.map((val, idx) => {
                    if (val.type == 'total' && data.home_team.id == val.team_id)
                      return (

                        <Text style={Styles.TeamScores} key={idx}>{val.total}/{val.wickets}</Text>
                      )
                  })}
                </View>
                <View style={Styles.Team}>
                  <View style={Styles.Team}>
                    <View style={Styles.TeamLogo}></View>
                    <Text style={Styles.TeamName}>{data.away_team.name}</Text>
                  </View>
                  {data.scoreboards.map((val, idx) => {
                    if (val.type == 'total' && data.away_team.id == val.team_id)
                      return (

                        <Text style={Styles.TeamScores} key={idx}>{val.total}/{val.wickets}</Text>
                      )
                  })}
                </View>
              </TouchableOpacity>

            </View>

            {/* <View style={Styles.TeamsSecCont}>

              <View style={Styles.LiveDateHead}>
                {id % 2 == 0 ? (
                <Text style={Styles.TimeTxt}>18:00</Text>
              ) : (
                <>
                <View style={Styles.Flexible}>
                  <LiveBtn />
                </View>
                <Text style={Styles.MatchDtTxt}>Break</Text>
                </>
              )}

              </View>

              <TouchableOpacity onPress={() => navigation.navigate('MatchDetails')}>
                <View style={Styles.Team}>
                  <View style={Styles.Team}>
                    <View style={Styles.TeamLogo}></View>
                    <Text style={Styles.TeamName}>Gujarat Titaniki</Text>
                  </View>
                  <Text style={Styles.TeamScores}>-</Text>
                </View>
                <View style={Styles.Team}>
                  <View style={Styles.Team}>
                    <View style={Styles.TeamLogo}></View>
                    <Text style={Styles.TeamName}>Rajastan Royals</Text>
                  </View>
                  <Text style={Styles.TeamScores}>-</Text>
                </View>
              </TouchableOpacity>

            </View> */}


          </View>
        </View>

      </>
    )
  }


  const onSearchPress = React.useCallback(() => navigation.navigate("searchScreen"), []);
  const headerRightActions = useMemo(
    () => [
      {
        onPress: onSearchPress,
        iconName: "Search",
      },
      {
        onPress: navigation.openDrawer,
        iconName: "Menu",
      },
    ],
    [navigation.openDrawer, onSearchPress],
  );

  return (
    <View style={Styles.liveScoreScreenBackground}>
      <Header rightAction={headerRightActions} />
      <View style={Styles.tabsContainer}>
        <TouchableOpacity style={Styles.DropDownMenu} onPress={() => null}>
          <View style={Styles.SecCont}>

            <Icon iconName={'CricketWhite'} style={Styles.DrpIcon} />
            <Text style={Styles.DropDownTxt}>Cricket</Text>
          </View>
          <ArrowDownSvg width={15} height={8} />
        </TouchableOpacity>
        <TouchableOpacity style={Styles.DropDownMenuSec} onPress={() => null}>
          <Icon iconName={'Calendar'} style={Styles.DrpIcon} />
          <Text style={Styles.DropDownTxtSec}>{Today}</Text>
          <ArrowDownSvg width={15} height={8} />
        </TouchableOpacity>

      </View>
      <ScrollView contentContainerStyle={Styles.MainCont}>
        {loading == false ? (leagues.map((data, idx) => {

          return (
            <Cards data={data} key={idx} />
          )



        })) : (
          <Spinner />
        )
        }
      </ScrollView>
    </View>
  );
};

export default LivescoreScreen;

const Styles = StyleSheet.create({
  liveScoreScreenBackground: {
    backgroundColor: "#E5E5E5",
    flex: 1,
  },
  tabsContainer: {
    minWidth: '100%',
    height: 55,
    backgroundColor: Colors.darkBlue,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderTopColor: '#1A2631',
    borderTopWidth: 1,
  },
  MainCont: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  DropDownMenu: {
    width: '50%',
    height: 54,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 17,
  },
  DropDownMenuSec: {
    width: '50%',
    height: 54,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 19,
    borderLeftColor: '#1A2631',
    borderLeftWidth: 1,
  },
  SecCont: {
    flexDirection: 'row',
  },
  DropDownTxt: {
    color: '#FFFFFF',
    fontFamily: 'Jost',
    fontSize: 15,
    fontWeight: '500',
    paddingLeft: 12,
  },
  DropDownTxtSec: {
    color: '#FFFFFF',
    fontFamily: 'Jost',
    fontSize: 15,
    fontWeight: '500',
  },
  //Cards
  CardBodyCont: {
    width: 360,
    height: 224,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  HeaderLogo: {
    width: 24,
    height: 24,
    backgroundColor: 'blue',
    borderRadius: 50,
    marginRight: 10,
  },
  CardMainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  HeaderTitle: {
    color: '#111315',
    fontFamily: 'Jost',
    fontSize: 13,
    lineHeight: 18.2,
    fontWeight: '700',
  },
  TeamsCont: {
    width: '100%',
    height: '50%',
    paddingHorizontal: 15,
    paddingVertical: 14,
    borderBottomColor: '#EAEAEA',
    borderBottomWidth: 1,
  },
  TeamsSecCont: {
    paddingHorizontal: 15,
    paddingVertical: 14,
  },
  Team: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  TeamLogo: {
    width: 24,
    height: 24,
    borderRadius: 50,
    backgroundColor: 'black',
    marginBottom: 8,
    marginRight: 10,
  },
  TeamName: {
    fontFamily: 'Jost',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 21,
    color: '#111315',
  },
  TeamScores: {
    fontFamily: 'Jost',
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 21,
    color: '#111315',
  },
  MatchDtTxt: {
    fontFamily: 'Jost',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 16.8,
    color: 'rgba(255, 9, 96, 1)',
  },
  //Cards
  //LIVE
  LiveDateHead: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  LiveCont: {
    width: 46,
    height: 17,
    backgroundColor: 'rgba(255, 9, 96, 0.13)',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  LiveDot: {
    width: 5,
    height: 5,
    borderRadius: 50,
    backgroundColor: '#FF0960',
    marginRight: 5,
  },
  LiveTxt: {
    fontFamily: 'Jost',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16.8,
    color: 'rgba(255, 9, 96, 1)',
  },
  TimeTxt: {
    fontFamily: 'Jost',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 16.8,
    color: '#111315',

  },
  //LIVE
  //LIVE STREAM
  LiveStreamCont: {
    width: 107,
    height: 17,
    backgroundColor: 'rgba(1, 175, 112, 0.13)',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginLeft: 5,
  },
  LiveStreamIcon: {},
  LiveStreamTxt: {
    fontFamily: 'Jost',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16.8,
    color: 'rgba(1, 175, 112, 1)',
    marginLeft: 7.5,
  },
  Flexible: {
    flexDirection: 'row',
  }
  //LIVE STREAM

});
