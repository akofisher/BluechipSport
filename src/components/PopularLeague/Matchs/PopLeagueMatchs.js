import Matchs from "components/Livescore/TeamScreenDetails/MatchsDetails/Matchs";
import { Spinner, Text } from "components/common";
import i18next from "i18next";
import React, { useState, useEffect } from "react";
import { ScrollView, View, TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/dist/MaterialIcons";
import { API } from "services";
import cxs from "styles/styles";

MaterialIcons.loadFont();

export default function PopLeagueMatchs({ id, navigation }) {
  const [match, setMatch] = useState({ isLoading: true });
  const [roundIDs, setRoundIDs] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [roundDropDown, setRoundDropdown] = useState(false);
  const [currentRound, setCurrentRound] = useState();
  const [isloading, setisloading] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [currentSeason, setCurrentSeason] = useState("");
  const [seasonDropDown, setSeasonDropDown] = useState(false);
  const [currentStage, setCurrentStage] = useState("");

  useEffect(() => {
    setisloading(true);
    setIsInitialLoading(true);
    API.getLeaguesInfo({ kwds: { leagueID: id } })
      .then(({ data: { data } }) => {
        setRoundIDs(data?.rounds);
        setSeasons(data?.seasons);
        setCurrentStage(data?.stages[data?.stages.length - 1]);

        const currentSeasonFromAPI =
          data?.seasons.find((el) => el.is_current_season) || data?.seasons[0];

        const currentRoundFromAPI =
          data?.rounds.find((el) => el.id === data.current_round_id) || data?.rounds[0];

        setCurrentRound(currentRoundFromAPI);
        setCurrentSeason(currentSeasonFromAPI);
      })
      .catch((error) => {
        console.warn(error);
      })
      .finally(() => {
        setisloading(false);
        setIsInitialLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (isInitialLoading || !currentSeason) {
      return;
    }

    setisloading(true);
    API.getRound({
      kwds: {
        id,
        seasonId: currentSeason?.id,
        roundId: currentRound?.id,
        stageId: currentStage?.id,
      },
    })
      .then(({ data: { data } }) => {
        setMatch(data, { isLoading: false });
      })
      .catch((error) => {
        console.warn(error);
      })
      .finally(() => {
        setisloading(false);
      });
  }, [currentSeason, currentRound, isInitialLoading]);

  const downArrow = "keyboard-arrow-down";
  const upArrow = "keyboard-arrow-up";

  return (
    <ScrollView>
      <View style={[cxs.row, cxs.flex, cxs.px15]}>
        <TouchableOpacity
          style={[styles.dropDownCon, roundDropDown ? styles.noBottomBorderRadius : {}]}
          onPress={() => {
            setRoundDropdown(!roundDropDown);
          }}
        >
          <View style={styles.dropDownCont}>
            <Text style={styles.dropDownText}>{i18next.t("Tour")}</Text>
            <Text style={[styles.dropDownText, { marginLeft: 6 }]}>{currentRound?.name}</Text>
          </View>

          <View style={styles.dropDownIconCont}>
            <MaterialIcons name={roundDropDown ? upArrow : downArrow} size={22} color="#424242" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.dropDownCon, seasonDropDown ? styles.noBottomBorderRadius : {}]}
          onPress={() => {
            setSeasonDropDown(!seasonDropDown);
          }}
        >
          <View style={styles.dropDownCont}>
            <Text style={styles.dropDownText} />
            <Text style={[styles.dropDownText, { marginLeft: 6 }]}>{currentSeason?.name}</Text>
          </View>
          <View style={styles.dropDownIconCont}>
            <MaterialIcons name={seasonDropDown ? upArrow : downArrow} size={22} color="#424242" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={[styles.chooseTab, { left: 0 }]}>
        {roundDropDown && (
          <ScrollView style={styles.dropDownMenu}>
            {roundIDs?.map((item, index) => {
              return (
                <TouchableOpacity
                  style={styles.dropDownItem}
                  key={index}
                  onPress={() => {
                    setisloading(true);
                    setRoundDropdown(false);
                    setCurrentRound(item);
                  }}
                >
                  <View style={[styles.dropDownCont, { marginLeft: 10 }]}>
                    <Text style={styles.dropDownTex}>{i18next.t("Tour")}</Text>
                    <Text style={[styles.dropDownTex, { marginLeft: 6 }]}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </View>
      <View style={[styles.chooseTab, { right: 0 }]}>
        {seasonDropDown && (
          <ScrollView style={styles.dropDownMenu}>
            {seasons?.map((item, index) => {
              return (
                <TouchableOpacity
                  style={styles.dropDownItem}
                  key={index}
                  onPress={() => {
                    setisloading(true);
                    setSeasonDropDown(false);
                    setCurrentSeason(item);
                  }}
                >
                  <View style={[styles.dropDownCont, { marginLeft: 10 }]}>
                    <Text style={[styles.dropDownTex, { marginLeft: 6 }]}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </View>
      {isloading ? (
        <View style={cxs.m20}>
          <Spinner />
        </View>
      ) : match?.length > 0 ? (
        <Matchs data={match} navigation={navigation} style={{ zIndex: 1 }} />
      ) : (
        <View style={cxs.h200}>
          <Text style={{ textAlign: "center", marginTop: 20 }}>{i18next.t("NoMatchesFound")}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  leagueHeader: {
    height: 44,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderColor: "#EBEBEB",
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropDownCon: {
    flex: 1,
    width: "45%",
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 25,
    alignItems: "center",
    borderColor: "#E5E5E5",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  dropDownText: {
    color: "#424242",
    fontSize: 12,
  },
  dropDownTex: {
    color: "#424242",
    fontSize: 12,
  },
  chooseTab: {
    backgroundColor: "#ffffff",
    position: "absolute",
    width: "44%",
    marginHorizontal: 20,
    zIndex: 100,
    top: 42,
  },
  dropDownIconCont: {
    width: 20,
    height: 20,
  },
  boxContainer: {
    height: 100,
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 18,
    paddingRight: 40,
    paddingVertical: 11,
    zIndex: 10,
  },
  box: {
    height: 97,
    width: 165,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EBEBEB",
  },
  topBox: {
    height: 66,
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#F2F2F2",
  },
  left: {
    flex: 1,
    paddingLeft: 14,
  },
  right: {
    width: 30,
    backgroundColor: "#EEEEEE",
    borderRadius: 7,
    justifyContent: "space-around",
    alignItems: "center",
    margin: 2,
  },
  num: {
    color: "#E53C48",
    fontSize: 12,
  },
  clubCont: {
    flex: 1 / 2,
    alignItems: "center",
    flexDirection: "row",
  },
  clubName: {
    color: "#000",
    fontSize: 10,
    marginRight: 28,
  },
  imgCont: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 8,
  },
  bottomContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconCont: {
    width: 14,
    height: 14,
    color: "#A1A1A1",
    marginLeft: 17,
  },
  textCont: {
    flexDirection: "row",
    marginRight: 14,
  },
  time: {
    fontSize: 12,
    color: "#A1A1A1",
    marginLeft: 9,
  },
  dropDownCont: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropDownMenu: {
    height: 150,
    marginTop: 0,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: "#EBEBEB",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  dropDownItem: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#EBEBEB",
  },
  noBottomBorderRadius: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
});
