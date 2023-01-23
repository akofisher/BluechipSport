import ScrollViewHorizontal from "components/Livescore/Details/StatisticsDetails/ScrollViewHorizontal";
import i18next from "i18next";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";

import Scorers from "./ScorersDetails/Scorers";
import TeamOf from "./TeamOfDetails/TeamOf";

const details = [i18next.t("FootballersStatistics"), i18next.t("TeamStatistics")];

export default function Statistic({ id, leagues, navigation }) {
  const [visibleDetails, setVisibleDetails] = useState(details[0]);
  return (
    <ScrollView>
      <ScrollViewHorizontal
        details={details}
        visibleDetails={visibleDetails}
        setVisibleDetails={setVisibleDetails}
      />
      {visibleDetails === i18next.t("TeamStatistics") ? (
        <TeamOf id={id} leagues={leagues} />
      ) : visibleDetails === i18next.t("FootballersStatistics") ? (
        <Scorers id={id} navigation={navigation} />
      ) : (
        <View />
      )}
    </ScrollView>
  );
}
