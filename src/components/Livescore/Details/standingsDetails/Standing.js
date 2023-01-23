import { Spinner, Text } from "components/common";
import i18next from "i18next";
import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Colors } from "styles";

import StandingComponent from "./StandingComponent";

function Standing({ standing, err, navigation, screenName, LeagueId, containerStyle }) {
  return (
    <ScrollView>
      {standing?.isLoading ? (
        <Spinner style={{ flex: 1 }} />
      ) : (
        <View>
          <View style={[styles.scrollView, containerStyle]}>
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
                LeagueId={LeagueId}
                err={err}
                standing={standing}
                navigation={navigation}
                standingTab
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
    color: Colors.textTitle,
    fontSize: 12,
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 25,
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

export default Standing;
