import { Header } from "components/header";
import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { DawnStandingSvg, UpStandingSvg } from "../../../assets/svgs/AllSvgs";
import { ICONS } from "../../../assets/icons";
import { SvgICONS } from "../../../assets/svgs/svgIcons";




export default function StandingScreen({ navigation, route }) {
  const IDS = [1, 2, 3, 4, 5, 6]


  const TeamCards = ({ id }) => {
    return (
      <View style={styles.CardCont}>
        <View style={styles.CardHead}>
          <View style={styles.LeftHead}>
            <View style={styles.CupIconCont}>
              <UpStandingSvg />
              <DawnStandingSvg />
            </View>
            <Text style={styles.MatchHeadTxt}>IPL FINAL - {id}</Text>
          </View>
          <View style={styles.RightHead}>
            <Text style={styles.TimeTxt}>12 AM UTC</Text>
            <Text style={styles.DateTxt}>12;12;21</Text>
          </View>
        </View>
        <View style={styles.SecTeamBigCont}>

          <View style={styles.TeamsLogosCont}>
            <View style={styles.TeamCont}>
              <View style={styles.TeamLogoCont}></View>
              <Text style={styles.TeamNameTxt}>Dinamo</Text>
            </View>
            <Text style={styles.TeamVs}>VS</Text>
            <View style={styles.TeamCont}>
              <View style={styles.TeamLogoCont}></View>
              <Text style={styles.TeamNameTxt}>Torpedo</Text>
            </View>
          </View>
          <View style={styles.TeamsBets}>
            <TouchableOpacity style={styles.BetsBtn}>
              <Text style={styles.BetsText}>1.16</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.BetsBtn} >
              <Text style={styles.BetsText}>1.89</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ButtonCont}>
            <TouchableOpacity style={styles.AddTeamBtn} onPress={() => navigation.navigate("prediction")}>
              <Text style={styles.AddBtnTxt}>VIEW PREDICTION</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  // const bottomSheetModalRef = useRef(null);
  // const presentLeagueModal = () => bottomSheetModalRef.current.present();
  // const close = () => bottomSheetModalRef.current.close();
  // const snapPoints = useMemo(() => ["10%", "75%"], []);


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
    <View style={{ flex: 1, backgroundColor: "#E5E5E5" }}>
      <Header rightAction={headerRightActions} />
      <ScrollView contentContainerStyle={styles.Container}>

        {IDS.map((id, idx) => {
          return (
            <TeamCards id={id} key={idx} />
          )
        })}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    paddingVertical: 24,
    paddingHorizontal: 15,
    width: '100%',
  },
  CardCont: {
    width: 360,
    height: 276,
    backgroundColor: '#FFFFFF',
    borderRadius: 7,
    marginBottom: 15,
  },
  CardHead: {
    height: 46,
    borderBottomColor: '#EAEAEA',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  LeftHead: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  RightHead: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  CupIconCont: {
    width: 26,
    height: 26,
    borderRadius: 50,
    borderColor: 'transparent',
    backgroundColor: '#FF0960',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  IconSvg: {
    color: 'white',
    width: 15,
    height: 15,
    tintColor: '#FFFFFF',
  },
  MatchHeadTxt: {
    fontFamily: 'Jost',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 17,
    color: '#111315',
  },
  TimeTxt: {
    fontFamily: 'Jost',
    fontWeight: '600',
    fontSize: 11,
    lineHeight: 12,
    color: '#111315',
    marginBottom: 4,
  },
  DateTxt: {
    fontFamily: 'Jost',
    fontWeight: '500',
    fontSize: 11,
    lineHeight: 12,
    color: '#959595',
  },
  TeamsLogosCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TeamCont: {
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TeamLogoCont: {
    width: 50,
    height: 50,
    borderRadius: 20,
    backgroundColor: 'black',
  },
  TeamNameTxt: {
    marginTop: 15.5,
    fontFamily: 'Jost',
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 18.2,
    color: '#111315',
  },
  TeamVs: {
    fontFamily: 'Jost',
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 21,
    color: '#111315',
  },
  SecTeamBigCont: {
    padding: 15,
  },
  TeamsBets: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 13,
  },
  BetsBtn: {
    width: 158,
    height: 38,
    backgroundColor: '#F0F0F0',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BetsText: {
    fontFamily: 'Jost',
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 18.2,
    color: '#111315',
  },
  AddTeamBtn: {
    width: 330,
    height: 48,
    borderRadius: 6,
    backgroundColor: '#01AF70',
    alignItems: 'center',
    justifyContent: 'center',
  },
  AddBtnTxt: {
    fontFamily: 'Jost',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 19.6,
    textAlign: 'center',
    color: '#FFFFFF',
  },



});
