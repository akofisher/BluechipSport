import { useNavigation } from "@react-navigation/native";
import greenArrowRightIcon from "assets/icons/greenArrowRight/greenArrowRight.png";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import TeamListItem from "screens/news/teamListItem";
import FastImage from "react-native-fast-image";
import { Text } from "components/common";

export const TransferItem = React.memo((props) => {
  const {
    playerImage,
    playerName,
    playerNationality,
    transferPrice,
    fromName,
    fromId,
    fromLogo,
    toName,
    toLogo,
    toId,
  } = props;

  const navigation = useNavigation();

  const onTeamPress = (id, logo, name) =>
    navigation.navigate("teamScore", {
      TeamId: id,
      TeamName: name,
      imageUrl: logo,
      teamLogo: logo,
    });

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <FastImage style={styles.playerImage} source={{ uri: playerImage }} resizeMode="cover" />
        <View style={styles.mainInfo}>
          <Text style={styles.playerName}>{playerName}</Text>
          <Text style={styles.nationality}>{playerNationality}</Text>
          <Text style={styles.price}>{Number(transferPrice)?.toFixed(3)} $</Text>
        </View>
      </View>
      <View style={styles.separator} />
      <View style={styles.row}>
        <TeamListItem imageURI={fromLogo} onPress={() => onTeamPress(fromId, fromLogo, fromName)} />
        <Text style={{ flex: 1, flexWrap: "wrap" }}>{fromName}</Text>
        <Image source={greenArrowRightIcon} resizeMode="cover" />
        <TeamListItem imageURI={toLogo} onPress={() => onTeamPress(toId, fromLogo, toName)} />
        <Text style={{ flex: 1, flexWrap: "wrap" }}>{toName}</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 15,
    backgroundColor: "white",
    marginVertical: 8,
    padding: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  mainInfo: {
    height: 60,
    justifyContent: "space-between",
  },
  playerImage: {
    padding: 20,
    width: 60,
    height: 60,
    marginRight: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#EBEBEB",
  },
  playerName: {
    fontWeight: "700",
  },
  nationality: {
    color: "#6B6B6B",
  },
  price: {
    fontWeight: "700",
    color: "#259F32",
  },
  separator: {
    height: 1,
    backgroundColor: "#EDEDED",
    marginVertical: 12,
  },
});
