import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { LineupSquadTabs } from "components/Livescore/Details/LineupDetails/LineupSquadTabs";
import React, { useState, useRef, useMemo, useCallback } from "react";

import PlayerStatisticCard from "./PlayerStatisticCard";

const groupBy = function (arr, key) {
  return arr.reduce((acc, x) => {
    x && (acc[x[key]] = acc[x[key]] || []).push(x);
    return acc;
  }, {});
};

const PlayerStatsInsideComp = ({ lineUpInfo, benchInfo }) => {
  const [playerStats, setPlayerStats] = useState(null);
  const bottomSheetModalRef = useRef(null);
  const presentPlayerModal = () => bottomSheetModalRef.current.present();
  const close = () => bottomSheetModalRef.current.close();

  const snapPoints = useMemo(() => ["10%", "75%"], []);

  const localTeamId = lineUpInfo[0].team_id;
  const visitorTeamId = lineUpInfo[12].team_id;

  const groupedMain = groupBy(lineUpInfo, "team_id");
  const localMain = groupedMain[localTeamId];
  const visitorMain = groupedMain[visitorTeamId];

  const groupedBench = groupBy(benchInfo, "team_id");
  const localBench = groupedBench[localTeamId];
  const visitorBench = groupedBench[visitorTeamId];

  const data = [
    {
      name: localMain[0].team_name,
      logo: localMain[0].team_logo_path,
      playersMain: localMain,
      playersBench: localBench,
    },
    {
      name: visitorMain[0].team_name,
      logo: visitorMain[0].team_logo_path,
      playersMain: visitorMain,
      playersBench: visitorBench,
    },
  ];

  const onPlayerPress = useCallback((player) => {
    setPlayerStats(player);
    presentPlayerModal();
  }, []);

  return (
    <>
      <LineupSquadTabs onPlayerPress={onPlayerPress} data={data} />
      <BottomSheetModal
        enablePanDowntoClose={true}
        backdropComponent={BottomSheetBackdrop}
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
      >
        <PlayerStatisticCard playerStats={playerStats} />
      </BottomSheetModal>
    </>
  );
};

export default PlayerStatsInsideComp;
