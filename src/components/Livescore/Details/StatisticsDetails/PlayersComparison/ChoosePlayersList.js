import LongButton from "components/common/LongButton";
import i18next from "i18next";
import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text } from "components/common";

import ChoosePlayerComp from "./ChoosePlayerComp";

export default function ChoosePlayersList({ players, onPlayersSelected }) {
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  return (
    <View style={{ flex: 1 }}>
      <Text style={Styles.text}>{i18next.t("ChooseFootballersToCompare")}</Text>
      <ScrollView>
        {players?.map((item, index) => {
          return (
            <ChoosePlayerComp
              key={index}
              item={item}
              checked={selectedPlayers.includes(index)}
              onPress={() => {
                const _selectedPlayers = [...selectedPlayers];
                switch (_selectedPlayers.length) {
                  case 0:
                  case 1:
                    _selectedPlayers.push(index);
                    break;
                  default:
                    if (_selectedPlayers.includes(index)) {
                      _selectedPlayers.splice(
                        _selectedPlayers.findIndex((i) => i === index),
                        1,
                      );
                    }
                }
                setSelectedPlayers(_selectedPlayers);
              }}
            />
          );
        })}
      </ScrollView>

      <LongButton
        onPress={() => {
          onPlayersSelected(selectedPlayers);
        }}
        style={{
          backgroundColor: "#E53C48",
          marginHorizontal: 20,
          marginVertical: 22,
        }}
        textStyle={{ color: "white", fontSize: 16, fontWeight: "bold" }}
        tittle={i18next.t("ShowStatistic")}
      />
    </View>
  );
}

const Styles = StyleSheet.create({
  text: {
    fontSize: 17,
    paddingHorizontal: 20,
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 30,
  },
});
