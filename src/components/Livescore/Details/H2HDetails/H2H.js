import { Spinner } from "components/common";
import i18next from "i18next";
import React, { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { API } from "services";

import LastMatchsHeader from "./LastMatchsHeader";
import MutualMeetings from "./MutualMeetings";
import MutualMeetingsHeader from "./MutualMeetingsHeader";

export default function H2H({ match_id, item }) {
  const [h2h, setH2h] = useState({ isloading: true });

  useEffect(() => {
    API.getLiveMatchesMeetings({ kwds: { match_id } })
      .then(({ data }) => {
        setH2h(data, { isloading: false });
      })
      .catch((error) => {
        console.warn(error);
      });
  }, []);

  return (
    <ScrollView>
      {h2h?.isloading ? (
        <Spinner />
      ) : (
        h2h && (
          <View>
            <LastMatchsHeader
              tittle={
                h2h?.localteam_matches[0]?.is_home_match === 1
                  ? h2h?.localteam_matches[0]?.localteam_name
                  : h2h?.localteam_matches[0]?.is_home_match === 0 &&
                    h2h?.localteam_matches[0]?.visitorteam_name
              }
            />
            <MutualMeetings mutual={h2h?.localteam_matches} itemm={item} />
            <LastMatchsHeader
              tittle={
                h2h?.visitorteam_matches[1]?.is_home_match === 1
                  ? h2h?.visitorteam_matches[1]?.localteam_name
                  : h2h?.visitorteam_matches[1]?.is_home_match === 0 &&
                    h2h?.visitorteam_matches[1]?.visitorteam_name
              }
            />
            <MutualMeetings mutual={h2h?.visitorteam_matches} />
            <MutualMeetingsHeader tittle={i18next.t("Meetings")} />
            <MutualMeetings bus mutual={h2h?.h2h} />
          </View>
        )
      )}
    </ScrollView>
  );
}
