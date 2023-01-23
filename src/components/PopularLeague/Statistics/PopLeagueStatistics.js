import ScrollViewHorizontal from "components/Livescore/Details/StatisticsDetails/ScrollViewHorizontal";
import ScrollViewHorizontalCommon from "components/Livescore/commonDetails/ScrollViewHorizontalCommon";
import i18next from "i18next";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import cxs from "styles/cxs";

import AverageStatistics from "./AverageStatistics/AverageStatistics";
import PopLeagueScores from "./Scorers/PopLeagueScores";

const details = [i18next.t("Bombardsmen"), i18next.t("AvarageStatistics")];

export default function PopLeagueStatistic({
  id,
  seasonID,
  navigation,
  scorers,
  playerAsist,
  playerCard,
  menuContainerStyle,
}) {
  const [visibleDetails, setVisibleDetails] = useState(details[0]);
  return (
    <ScrollView>
      <ScrollViewHorizontalCommon
        details={details}
        visibleDetail={visibleDetails}
        containerStyle={menuContainerStyle}
        setVisibleDetail={setVisibleDetails}
      />
      {visibleDetails === i18next.t("Bombardsmen") ? (
        <PopLeagueScores
          id={id}
          navigation={navigation}
          scorers={scorers}
          playerAsist={playerAsist}
          playerCard={playerCard}
        />
      ) : visibleDetails === i18next.t("AvarageStatistics") ? (
        <AverageStatistics seasonID={seasonID} />
      ) : (
        <View />
      )}
    </ScrollView>
  );
}
