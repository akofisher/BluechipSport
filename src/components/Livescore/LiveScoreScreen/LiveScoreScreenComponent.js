import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useDevice } from "stores";

import HeaderComponent from "./HeaderComponent";
import MatchComponent from "./MatchComponent";

export default function LiveScoreScreenComponent({
  match,
  navigation,
  style,
  isFavoriteTab = false,
  setTriggerrer,
  triggerrer,
}) {
  const [favoriteMatches, setFavoriteMatches] = useState();

  const { deviceId } = useDevice();

  useEffect(() => {}, [favoriteMatches]);

  return (
    <View>
      {match?.map((liga, index) => {
        return (
          <View style={[Styles.scrollViewContainar, style]} key={index}>
            <View>
              <HeaderComponent icon={liga.icon} ligueName={liga.league_name} />
              {liga.data.map((team, index) => {
                return (
                  <MatchComponent
                    key={index}
                    index={index}
                    team={team}
                    liga={liga}
                    navigation={navigation}
                    deviceId={deviceId}
                    isFav={team.is_favorite}
                    setTriggerrer={setTriggerrer}
                    triggerrer={triggerrer}
                  />
                );
              })}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const Styles = StyleSheet.create({
  scrollViewContainar: {
    backgroundColor: "white",
    borderRadius: 25,
    marginBottom: 20,
    paddingBottom: 4,
  },
});
