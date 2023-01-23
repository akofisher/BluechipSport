import { Spinner, Text } from "components/common";
import i18next from "i18next";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { API } from "services";

import LocalTeamStatistic from "./LocalTeamStatistic";
import VisitorTeamStatistic from "./VisitorTeamStatistic";

export default function MatchCenterDetails({ match_id, item }) {
  const [info, setInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    API.getLiveMatchesMobile({ kwds: { match_id } })
      .then(({ data }) => {
        setInfo(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [match_id]);

  return (
    <ScrollView>
      {info && item.time_status !== "NS" ? (
        <View>
          <View>
            <View style={Styles.firstHalfTimeCont}>
              <Text style={Styles.firstTime}>{i18next.t("FirstHalf")}</Text>
              <Text style={Styles.firstTime}>{info.scores["1st_time"]}</Text>
            </View>

            <View style={Styles.container}>
              <LocalTeamStatistic
                localCard={info.cards.local}
                localGoal={info.goals.local}
                localSubstitutions={info.substitutions.local}
              />

              <VisitorTeamStatistic
                visitorCard={info.cards.visitor}
                visitorGoal={info.goals.visitor}
                visitorSubstitutions={info.substitutions.visitor}
              />
            </View>
          </View>
          <View>
            <View style={Styles.firstHalfTimeCont}>
              <Text style={Styles.firstTime}>{i18next.t("SecondHalf")}</Text>
              <Text style={Styles.firstTime}>{info.scores["2nd_time"]}</Text>
            </View>

            <View style={Styles.container}>
              <LocalTeamStatistic
                time
                localCard={info.cards.local}
                localGoal={info.goals.local}
                localSubstitutions={info.substitutions.local}
              />

              <VisitorTeamStatistic
                time
                visitorCard={info.cards.visitor}
                visitorGoal={info.goals.visitor}
                visitorSubstitutions={info.substitutions.visitor}
              />
            </View>
          </View>
        </View>
      ) : isLoading ? (
        <Spinner style={{ marginVertical: 20 }} />
      ) : (
        <View style={{ marginTop: 30 }}>
          <Text style={{ textAlign: "center" }}>{i18next.t("MatchNotStarted")}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const Styles = StyleSheet.create({
  firstTime: {
    fontSize: 12,
    color: "#888888",
  },
  firstHalfTimeCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 18,
  },
  container: {
    backgroundColor: "white",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "100%",
  },
});
