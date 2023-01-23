import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import LongButton from "components/common/LongButton";
import i18next from "i18next";
import React, { useRef, useMemo, useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

import ChoosePlayersList from "./ChoosePlayersList";
import ListCompairCard from "./ListCompairCard";
import PlayerCompairCard from "./PlayerCompairCard";

export default function Comparison({ players }) {
  const bottomSheetModalRef = useRef(null);
  const present = () => bottomSheetModalRef.current.present();
  const close = () => bottomSheetModalRef.current.close();
  const snapPoints = useMemo(() => ["10%", "75%"], []);
  const [compare, setCompare] = useState({ playerOne: players[0], playerTwo: players[1] });

  useEffect(() => {}, [compare]);

  return (
    <View style={Styles.container}>
      <LongButton
        tittle={i18next.t("SelectPlayers")}
        onPress={present}
        textStyle={{ color: "white", fontSize: 12, fontWeight: "bold" }}
        style={{
          backgroundColor: "#E53C48",
          marginTop: 30,
          marginBottom: 20,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <PlayerCompairCard player={compare.playerOne} />
        <PlayerCompairCard player={compare.playerTwo} />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 25,
        }}
      />
      <ListCompairCard
        tittle={i18next.t("Rating")}
        left={compare && compare?.playerOne?.stats.rating}
        right={compare && compare?.playerTwo?.stats.rating}
      />

      <ListCompairCard tittle={i18next.t("Minute")} />
      <ListCompairCard
        tittle={i18next.t("TotalBlow")}
        left={compare && compare?.playerOne?.shots?.shots_total}
        right={compare && compare?.playerTwo?.shots?.shots_total}
      />
      <ListCompairCard
        tittle={i18next.t("AccurateShot")}
        left={compare && compare?.playerOne?.shots?.shots_on_goal}
        right={compare && compare?.playerTwo?.shots?.shots_on_goal}
      />
      <ListCompairCard
        tittle={i18next.t("Goal")}
        left={compare && compare?.playerOne?.stats.scored}
        right={compare && compare?.playerTwo?.stats.scored}
      />
      <ListCompairCard
        tittle={i18next.t("Assistant")}
        left={compare && compare?.playerOne?.stats.goals.assists}
        right={compare && compare?.playerTwo?.stats.goals.assists}
      />
      <ListCompairCard
        tittle={i18next.t("Fined")}
        left={compare && compare?.playerOne?.stats.fouls.drawn}
        right={compare && compare?.playerTwo?.stats.fouls.drawn}
      />
      <ListCompairCard
        tittle={i18next.t("FinedHim")}
        left={compare && compare?.playerOne?.stats.fouls.commited}
        right={compare && compare?.playerTwo?.stats.fouls.commited}
      />
      <ListCompairCard
        tittle={i18next.t("Pass")}
        left={compare && compare?.playerOne?.stats.passing.passes}
        right={compare && compare?.playerTwo?.stats.passing.passes}
      />
      <ListCompairCard
        tittle={i18next.t("AccuratePass")}
        percent
        left={compare && compare?.playerOne?.stats.passing.passes_accuracy}
        right={compare && compare?.playerTwo?.stats.passing.passes_accuracy}
      />
      <ListCompairCard
        tittle={i18next.t("Shot")}
        left={compare && compare?.playerOne?.stats.passing.total_crosses}
        right={compare && compare?.playerTwo?.stats.passing.total_crosses}
      />
      <ListCompairCard
        tittle={i18next.t("AccurateShooting")}
        left={compare && compare?.playerOne?.stats.passing.crosses_accuracy}
        right={compare && compare?.playerTwo?.stats.passing.crosses_accuracy}
      />
      <ListCompairCard
        tittle={i18next.t("KeyPass")}
        left={compare && compare?.playerOne?.stats.passing.key_passes}
        right={compare && compare?.playerTwo?.stats.passing.key_passes}
      />
      <ListCompairCard
        tittle={i18next.t("AttemptDribbling")}
        left={compare && compare?.playerOne?.stats.dribbles.attempts}
        right={compare && compare?.playerTwo?.stats.dribbles.attempts}
      />
      <ListCompairCard
        tittle={i18next.t("SuccessfulDribbling")}
        left={compare && compare?.playerOne?.stats.dribbles.success}
        right={compare && compare?.playerTwo?.stats.dribbles.success}
      />
      <ListCompairCard
        tittle={i18next.t("MissedDribbling")}
        left={compare && compare?.playerOne?.stats.dribbles.dribbled_past}
        right={compare && compare?.playerTwo?.stats.dribbles.dribbled_past}
      />
      <ListCompairCard
        tittle={i18next.t("Duel")}
        left={compare && compare?.playerOne?.stats.duels.total}
        right={compare && compare?.playerTwo?.stats.duels.total}
      />
      <ListCompairCard
        tittle={i18next.t("WonDuel")}
        left={compare && compare?.playerOne?.stats.duels.won}
        right={compare && compare?.playerTwo?.stats.duels.won}
      />
      <ListCompairCard
        tittle={i18next.t("WonAirDuel")}
        left={compare && compare?.playerOne?.stats.other.aerials_won}
        right={compare && compare?.playerTwo?.stats.other.aerials_won}
      />
      <ListCompairCard
        tittle={i18next.t("Offside")}
        left={compare && compare?.playerOne?.stats.other.offsides}
        right={compare && compare?.playerTwo?.stats.other.offsides}
      />
      <ListCompairCard
        tittle={i18next.t("HitThePost")}
        left={compare && compare?.playerOne?.stats.other.hit_woodwork}
        right={compare && compare?.playerTwo?.stats.other.hit_woodwork}
      />
      <ListCompairCard
        tittle={i18next.t("Deprivation")}
        left={compare && compare?.playerOne?.stats.other.tackles}
        right={compare && compare?.playerTwo?.stats.other.tackles}
      />
      <ListCompairCard
        tittle={i18next.t("block")}
        left={compare && compare?.playerOne?.stats.other.blocks}
        right={compare && compare?.playerTwo?.stats.other.blocks}
      />
      <ListCompairCard
        tittle={i18next.t("Intercept")}
        left={compare && compare?.playerOne?.stats.other.interceptions}
        right={compare && compare?.playerTwo?.stats.other.interceptions}
      />
      <ListCompairCard
        tittle={i18next.t("LostTheBall")}
        left={compare && compare?.playerOne?.stats.other.dispossesed}
        right={compare && compare?.playerTwo?.stats.other.dispossesed}
      />

      <BottomSheetModal
        backdropComponent={BottomSheetBackdrop}
        ref={bottomSheetModalRef}
        enablePanDownToClose
        index={1}
        snapPoints={snapPoints}
      >
        <ChoosePlayersList
          onSubmit={close}
          onPlayersSelected={(array) => {
            close();
            if (array.length) {
              setCompare({
                playerOne: players[array[0]],
                playerTwo: players[array[1]],
              });
            }
          }}
          players={players}
        />
      </BottomSheetModal>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    backgroundColor: "white",
    paddingHorizontal: 28,
  },
});
