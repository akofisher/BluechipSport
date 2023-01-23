import { Spinner } from "components/common";
import i18next from "i18next";
import React, { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { API } from "services";

import PlayerStatistics from "./PlayerStatistics";
import Position from "./Position";

export default function LineupDetails({ navigation, id, screenName }) {
  const [lineup, setLineup] = useState({ isloading: true });
  const [err, setErr] = useState();
  useEffect(() => {
    API.getMatchsDetails({ kwds: { id } })
      .then(({ data }) => {
        setLineup(data.data, { isloading: false });
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [id]);

  return (
    <ScrollView>
      {lineup?.isloading ? (
        <Spinner />
      ) : (
        lineup && (
          <View>
            <Position tittle={i18next.t("Goalkeepers")} />
            <PlayerStatistics
              lineup={lineup}
              navigation={navigation}
              screenName={screenName}
              golk
            />
            <Position tittle={i18next.t("Defenders")} />
            <PlayerStatistics lineup={lineup} navigation={navigation} screenName={screenName} def />
            <Position tittle={i18next.t("Midfielders")} />
            <PlayerStatistics lineup={lineup} navigation={navigation} screenName={screenName} mid />
            <Position tittle={i18next.t("Attackers")} />
            <PlayerStatistics
              lineup={lineup}
              navigation={navigation}
              screenName={screenName}
              forw
            />
          </View>
        )
      )}
    </ScrollView>
  );
}
