import Standing from "components/Livescore/Details/standingsDetails/Standing";
import ScrollViewHorizontalCommon from "components/Livescore/commonDetails/ScrollViewHorizontalCommon";
import { Spinner } from "components/common";
import i18next from "i18next";
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { API } from "services";
import cxs from "styles/cxs";

export default function PopLeagueStandings({ id, navigation, screenName }) {
  const [isLoading, setIsLoading] = useState(false);
  const [standings, setStandings] = useState([]);
  const [groups, setGroups] = useState();
  const [activeGroup, setActiveGroup] = useState("");

  const [err, setErr] = useState();
  useEffect(() => {
    setIsLoading(true);
    API.leaguesStandings({ kwds: { id } })
      .then(({ data }) => {
        setStandings(data[0]?.standings, { isLoading: false });
        setStandings(data);

        const groupNames = data.map((item) => item.name);
        setGroups(groupNames);
        setActiveGroup(groupNames[0]);
      })
      .catch((error) => {
        setErr(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <View style={{ margin: 20 }}>
        <Spinner />
      </View>
    );
  }

  const currentStanding = standings.find((item) => item.name === activeGroup)?.standings;

  return (
    <View style={cxs.my10}>
      {groups?.length > 1 ? (
        <ScrollViewHorizontalCommon
          details={groups}
          itemStyle={{ paddingHorizontal: 5 }}
          visibleDetail={activeGroup}
          setVisibleDetail={setActiveGroup}
        />
      ) : null}
      {currentStanding ? (
        <Standing
          standing={currentStanding}
          err={err}
          navigation={navigation}
          screenName={screenName}
          LeagueId={id}
        />
      ) : (
        <View>
          <Text style={{ textAlign: "center", marginTop: 40 }}>{i18next.t("NoTablesFound")}</Text>
        </View>
      )}
    </View>
  );
}
