import StandingComponent from "components/Livescore/Details/standingsDetails/StandingComponent";
import { Spinner, Text } from "components/common";
import i18next from "i18next";
import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { API } from "services";
import { Colors } from "styles";

export default function Standing({ id, navigation, isOnStandingTab, screenName }) {
  const [standing, setStanding] = useState({ isLoading: true });
  const [err, setErr] = useState();

  useEffect(() => {
    API.getTeamsStanding({ kwds: { id } })
      .then(({ data }) => {
        const leaguesStandings = data.data;
        const mainLeagueStanding = leaguesStandings?.find((item) => !!item.league?.is_main_league);
        setStanding(
          mainLeagueStanding ? mainLeagueStanding.standings : leaguesStandings[0].standings,
          {
            isLoading: false,
          },
        );
      })
      .catch((error) => {
        setErr(error);
      });
  }, [id]);
  return (
    <ScrollView style={{ flex: 1 }}>
      {standing.isLoading ? (
        <Spinner style={{ flex: 1 }} />
      ) : (
        <View>
          <Text style={styles.firstText}>{i18next.t("Main")}</Text>
          <View style={styles.scrollView}>
            <View style={styles.inScrollHeader}>
              <View style={styles.inScrollHeaderView}>
                <Text style={styles.inScrollHeaderText}>#</Text>
                <Text style={[styles.inScrollHeaderText, { marginLeft: 23 }]}>
                  {i18next.t("Club")}
                </Text>
              </View>
              <View style={styles.inScrollHeaderView}>
                <Text style={styles.inScrollHeaderText}>{i18next.t("T")}</Text>
                <Text style={[styles.inScrollHeaderText, { marginLeft: 24 }]}>
                  {i18next.t("BSH")}
                </Text>
                <Text style={[styles.inScrollHeaderText, { marginLeft: 24 }]}>
                  {i18next.t("Q")}
                </Text>
              </View>
            </View>
            {err ? (
              <View style={{ flex: 1, paddingVertical: 50 }}>
                <Text style={{ textAlign: "center" }}>{i18next.t("SpreadsheetsAreNotnown")}</Text>
              </View>
            ) : (
              <StandingComponent
                err={err}
                standing={standing}
                id={id}
                navigation={navigation}
                screenName={screenName}
              />
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  firstText: {
    marginLeft: 24,
    marginTop: 20,
    color: Colors.textTitle,
    fontSize: 12,
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 25,
    marginTop: 13,
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  inScrollHeader: {
    flexDirection: "row",
    backgroundColor: Colors.inputBackround,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "space-between",
  },
  inScrollHeaderText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  inScrollHeaderView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
