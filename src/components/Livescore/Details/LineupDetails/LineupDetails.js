import { Spinner, Text } from "components/common";
import i18next from "i18next";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { API } from "services";

import LineupStadium from "./LineupStadium";
import PlayerStatsInsideComp from "./PlayerStatsInsideComp";

export default function LineupDetails({ match_id }) {
  const [formation, setFormation] = useState({ local: null, visitor: null });
  const [lineUpInfo, setLineUpInfo] = useState();
  const [benchInfo, setBenchInfo] = useState();
  const [linupLoading, setLinupLoading] = useState(true);

  const fixedLineup = [];

  const arrayHandler = (lineup) => {
    const arr1 = [];
    for (let i = 0; i < 11; i++) {
      arr1.push(lineup[i]);
    }
    const arr2 = [];
    for (let g = 11; g < lineup.length; g++) {
      arr2.push(lineup[g]);
    }

    for (let j = 1; j <= arr1.length; j++) {
      const items = arr1.find((el) => el.formation_position === j);
      fixedLineup.push(items);
    }

    for (let j = 1; j <= arr2.length; j++) {
      const items = arr2.find((el) => el.formation_position === j);
      fixedLineup.push(items);
    }
    setLineUpInfo(fixedLineup);
  };

  const getLineUp = (id) => {
    setLinupLoading(true);

    API.getLineUp({ kwds: { id } })
      .then(({ data }) => {
        setLineUpInfo(data.lineup);
        setBenchInfo(data.bench);
        setFormation({
          local: formationArrays(data.formations.localteam_formation),
          visitor: formationArrays(data.formations.visitorteam_formation),
        });

        if (data.formations.localteam_formation && data.formations.visitorteam_formation) {
          arrayHandler(data?.lineup);
        }
      })
      .catch((error) => {
        console.warn(error);
      })
      .finally(() => {
        setLinupLoading(false);
      });
  };
  const formationArrays = (group) => {
    const localForm = group?.match(/[]{0,1}[\d]*[.]{0,1}[\d]+/g);
    return localForm;
  };
  useEffect(() => getLineUp(match_id), [match_id]);

  if (linupLoading) {
    return <Spinner />;
  } else if (!linupLoading) {
    return (
      <ScrollView>
        {lineUpInfo?.length > 0 && formation?.local && formation?.visitor && (
          <LineupStadium formation={formation} lineUpInfo={lineUpInfo} />
        )}
        {lineUpInfo?.length > 0 ? (
          <PlayerStatsInsideComp lineUpInfo={lineUpInfo} benchInfo={benchInfo} />
        ) : linupLoading ? (
          <Spinner />
        ) : (
          <View>
            <Text style={{ textAlign: "center", marginTop: 40 }}>
              {i18next.t("SquadWillAppear")}
            </Text>
          </View>
        )}
      </ScrollView>
    );
  }
}
