import AboutPlayers from "components/Livescore/PlayerScoreDetails/AboutPlayersDetails/AboutPlayers";
import PlayerHeader from "components/Livescore/PlayerScoreDetails/CommonDetails/PlayerHeader";
import Statistic from "components/Livescore/PlayerScoreDetails/StatisticDetails/Statistic";
import ScrollViewHorizontalCommon from "components/Livescore/commonDetails/ScrollViewHorizontalCommon";
import { Separator } from "components/common";
import {
  BackButton,
  Header,
  ShareButton,
  StarButtonEmpty,
  Title,
  StarButtonFull,
} from "components/header";
import i18next from "i18next";
import React, { useState, useEffect } from "react";
import { ScrollView, View, Share, TouchableOpacity } from "react-native";
import { NewsVerticalList } from "screens/news/NewsVerticalList";
import { API } from "services";
import { useSubscribe } from "stores";
import Colors from "styles/colors";
const details = [i18next.t("Statistic"), i18next.t("Biography"), i18next.t("NewArticles")];

export default function PlayerScoreDetails({ navigation, route }) {
  const [visibleDetails, setVisibleDetail] = useState(details[0]);
  const { PlayerId } = route?.params;
  // alert(PlayerId);
  const [player, setPlayer] = useState();
  const [shareLink, setShareLink] = useState();
  const [isPlayerSubscribed, setIsPlayerSubscribed] = useState();

  const { updateSubscriptions, updateItem, subscriptions } = useSubscribe();

  const isTeamSubscribedHandler = (id, key, subscriptions) => {
    for (let i = 0; i < subscriptions[key].length; i++) {
      if (subscriptions[key][i]?.id === id) {
        setIsPlayerSubscribed(false);
        return;
      }
    }
    setIsPlayerSubscribed(true);
  };

  useEffect(() => {
    isTeamSubscribedHandler(PlayerId, "players", subscriptions);
  }, [subscriptions]);

  useEffect(() => {
    API.getLivescoreplayer({ kwds: { PlayerId } })
      .then(({ data }) => {
        setPlayer(data);
        setShareLink(data.share_link);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [PlayerId]);
  const subPlayer = () => {
    API.subscribePlayer({ kwds: { PlayerId } })
      .then((response) => {})
      .catch((error) => console.error(error));
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        url: shareLink,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const openNewsDetails = React.useCallback((id, title, mainVideoUrl) => {
    navigation.navigate("NewsDetails", {
      articleId: id,
      title,
      mainVideoUrl,
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#E5E5E5" }}>
      <Header>
        <BackButton />
        <Title title={player && player.fullname} />
        <View style={{ flexDirection: "row" }}>
          <ShareButton onPress={onShare} style={{ marginRight: -24 }} />
          <TouchableOpacity
            onPress={async () => {
              subPlayer();
              await updateItem("players", PlayerId, player.image_path, isPlayerSubscribed);
              await updateSubscriptions();
            }}
          >
            {isPlayerSubscribed ? <StarButtonEmpty disabled /> : <StarButtonFull disabled />}
          </TouchableOpacity>
        </View>
      </Header>
      <ScrollView>
        <View style={{ backgroundColor: "white" }}>
          <PlayerHeader player={player} />
          <Separator />
          <ScrollViewHorizontalCommon
            details={details}
            visibleDetail={visibleDetails}
            setVisibleDetail={setVisibleDetail}
          />
        </View>
        <View>
          {visibleDetails === i18next.t("Statistic") ? (
            <Statistic player={player} />
          ) : visibleDetails === i18next.t("Biography") ? (
            <AboutPlayers player={player} />
          ) : visibleDetails === i18next.t("NewArticles") ? (
            <View style={{ flex: 1, backgroundColor: Colors.white }}>
              <NewsVerticalList
                getAPI={API.getLivescorePlayerAtricles}
                apiParams={{ kwds: { id: PlayerId } }}
                listKey="player-news"
                openDetails={openNewsDetails}
              />
            </View>
          ) : (
            <View />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
