import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import PlayerStatisticCard from "components/Livescore/Details/LineupDetails/PlayerStatisticCard";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, Dimensions, ImageBackground, StyleSheet } from "react-native";
import { Colors } from "styles";

import stadium from "../../../../../assets/icons/stadium.png";
import Formation from "./Formation";
import LineupStadiumRow from "./LineupStadiumRow";

const { height } = Dimensions.get("window");
const LineupStadium = ({ formation, lineUpInfo }) => {
  const [playerStats, setPlayerStats] = useState(null);
  const bottomSheetModalRef = useRef(null);
  const presentPlayerModal = () => bottomSheetModalRef.current.present();
  const close = () => bottomSheetModalRef.current.close();
  const snapPoints = useMemo(() => ["10%", "75%"], []);

  const goalKeeperLocal = lineUpInfo[0];
  const goalKeeperVisitor = lineUpInfo[11];

  let initialLocalPlayers = lineUpInfo.slice(1, 11);
  const playersLocal = formation?.local.reduce((acc, numberOfPlayers) => {
    const players = initialLocalPlayers.slice(0, Number(numberOfPlayers));
    initialLocalPlayers = initialLocalPlayers.slice(players.length);
    acc.push(players);
    return acc;
  }, []);

  let initialVisitorPlayers = lineUpInfo.slice(12, 22);
  const playersVisitor = formation?.visitor.reduce((acc, numberOfPlayers) => {
    const players = initialVisitorPlayers.slice(0, Number(numberOfPlayers));
    initialVisitorPlayers = initialVisitorPlayers.slice(players.length);
    acc.push(players);
    return acc;
  }, []);

  const onPlayerPress = useCallback((player) => {
    setPlayerStats(player);
    presentPlayerModal();
  }, []);

  return (
    <View style={styles.stadiumBgContainer}>
      <Formation formation={formation} />

      <View style={styles.stadiumContainer}>
        <ImageBackground style={styles.bgStadiumContainer} source={stadium}>
          <View style={styles.halfStadium}>
            <LineupStadiumRow
              onPlayerPress={onPlayerPress}
              goalKeeper={goalKeeperLocal}
              rowHeight={formation.local?.length}
            />
            {playersLocal.map((players, index) => {
              return (
                <LineupStadiumRow
                  key={index}
                  onPlayerPress={onPlayerPress}
                  items={players}
                  rowHeight={formation.local?.length}
                />
              );
            })}
          </View>
          <View style={styles.halfStadium}>
            {playersVisitor.reverse().map((players, index) => {
              return (
                <LineupStadiumRow
                  key={index}
                  items={players}
                  onPlayerPress={onPlayerPress}
                  reverse
                  rowHeight={formation.visitor?.length}
                />
              );
            })}
            <LineupStadiumRow
              onPlayerPress={onPlayerPress}
              goalKeeper={goalKeeperVisitor}
              rowHeight={formation.visitor?.length}
            />
          </View>
        </ImageBackground>
      </View>
      <BottomSheetModal
        enablePanDowntoClose={true}
        backdropComponent={BottomSheetBackdrop}
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
      >
        <PlayerStatisticCard playerStats={playerStats} />
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  stadiumBgContainer: {
    width: "100%",
    height,
    backgroundColor: "#E5E5E5",
    marginBottom: 15,
  },
  stadiumContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 30,
    padding: 10,
  },
  bgStadiumContainer: {
    flex: 1,
    resizeMode: "cover",
    paddingHorizontal: 10,
    borderRadius: 20,
    overflow: "hidden",
  },
  halfStadium: { height: "50%", width: "100%" },
});

export default LineupStadium;
