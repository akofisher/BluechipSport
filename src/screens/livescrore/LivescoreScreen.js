import { Spinner } from "components/common";
import { Header } from "components/header";
import i18next from "i18next";
import moment from "moment";
import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import Entypo from "react-native-vector-icons/dist/Entypo";
// eslint-disable-next-line import/order
import { API } from "services";

import { useFavoriteMatch, useDevice } from "stores";
import { cxs, Colors } from "styles";

import LiveScoreScreenComponent from "../../components/Livescore/LiveScoreScreen/LiveScoreScreenComponent";

// eslint-disable-next-line import/order
import { useIsFocused } from "@react-navigation/native";
const { width } = Dimensions.get("window");

Entypo.loadFont();

const LivescoreScreen = ({ navigation }) => {
  const [match, setMatch] = useState({ isLoading: true, data: null });
  const [player, setPlayer] = useState({ isLoading: true, data: null });
  const [loading, setLoading] = useState(true);
  const [tabs, setTabs] = useState("tab1");
  const [activeDay, setActiveDay] = useState(moment(new Date()).format("DD"));
  const [dayData, satDayData] = useState(moment(new Date()).format("YY-MM-DD"));
  const currentDate = moment().format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [triggerrer, setTriggerrer] = useState();
  const [favoriteMatches, setFavoriteMatches] = useState();

  const { matchid } = useFavoriteMatch();
  const { deviceId } = useDevice();
  // *calendar date*
  const dataL = [];
  const dataR = [];

  for (let i = 7; i > 0; i--) {
    dataL.push(moment(new Date()).subtract(i, "days"));
  }
  for (let i = 0; i < 8; i++) {
    dataR.push(moment(new Date()).add(i, "days"));
  }
  const CalendarData = dataL.concat(dataR);
  // --------------------

  const CalendarItem = ({ item, index, calendarFlatList }) => {
    return (
      <View style={{ justifyContent: "center" }}>
        <TouchableOpacity
          onPress={() => {
            calendarFlatList?.current?.scrollToOffset({
              offset: index > 3 ? (index - 4) * 50 + 40 : 0,
            });

            setActiveDay(moment(item).format("DD"));
            satDayData(moment(item).format("YY-MM-DD"));
            getMatchesData(moment(item).format("YY-MM-DD"));
            setLoading(true);
          }}
          style={
            activeDay == moment(item).format("DD") ? Styles.calendarActiveDay : Styles.calendarDay
          }
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 24,
              color: activeDay == moment(item).format("DD") ? "#E53C48" : "#868686",
            }}
          >
            {moment(item).format("DD")}
          </Text>
          <Text
            style={{
              fontSize: 11,
              color: activeDay == moment(item).format("DD") ? "#3E3E3E" : "#868686",
            }}
          >
            {moment(item).format("ddd")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const getFavoriteMatches = () => {
    API.getFavoriteMatches({ kwds: { deviceId } })
      .then(({ data }) => {
        setFavoriteMatches(data);
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const getLiveMatches = () => {
    API.getLivematches()
      .then(({ data }) => {
        setPlayer(data, { isLoading: false });
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const getMatchesData = (id) => {
    API.getMatchesData({ kwds: { id, deviceId } })
      .then(({ data }) => {
        setMatch(data, { isLoading: false });
        setLoading(false);
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const calendarFlatList = useRef(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    getMatchesData(dayData);
    getLiveMatches();
    getFavoriteMatches();
  }, [tabs, triggerrer, isFocused]);

  useEffect(() => {
    calendarFlatList.current.scrollToOffset({
      offset: width / 2 - 10,
    });
  }, []);

  const onSearchPress = React.useCallback(() => navigation.navigate("searchScreen"), []);
  const headerRightActions = useMemo(
    () => [
      {
        onPress: onSearchPress,
        iconName: "Search",
      },
      {
        onPress: navigation.openDrawer,
        iconName: "Menu",
      },
    ],
    [navigation.openDrawer, onSearchPress],
  );

  return (
    <View style={Styles.liveScoreScreenBackground}>
      <Header rightAction={headerRightActions} />
      <View style={Styles.tabsContainer}>
        <TouchableOpacity
          style={Styles.tabs}
          onPress={() => {
            setTabs("tab1");
          }}
        >
          <Text style={Styles.tabsText}>{i18next.t("Score")}</Text>
          {tabs === "tab1" && <Entypo name="triangle-up" size={22} color="#E5E5E5" />}
        </TouchableOpacity>
        <TouchableOpacity
          style={Styles.tabs}
          onPress={() => {
            setTabs("tab2");
          }}
        >
          <Text style={Styles.tabsText}>{i18next.t("Current")}</Text>
          {tabs === "tab2" && <Entypo name="triangle-up" size={22} color="#E5E5E5" />}
        </TouchableOpacity>
        <TouchableOpacity
          style={Styles.tabs}
          onPress={() => {
            setTabs("tab3");
          }}
        >
          <Text style={Styles.tabsText}>{i18next.t("Favorites")}</Text>
          {tabs === "tab3" && <Entypo name="triangle-up" size={22} color="#E5E5E5" />}
        </TouchableOpacity>
      </View>
      <ScrollView>
        {tabs === "tab1" && (
          <View style={{ height: 130 }}>
            <FlatList
              ref={calendarFlatList}
              style={{ flex: 1, height: 65 }}
              bounces={false}
              horizontal
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              extraData={CalendarData}
              data={CalendarData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <CalendarItem calendarFlatList={calendarFlatList} index={index} item={item} />
              )}
            />
          </View>
        )}

        {match.isLoading || loading ? (
          <Spinner style={{ flex: 1 }} />
        ) : tabs === "tab1" ? (
          <LiveScoreScreenComponent
            setTriggerrer={setTriggerrer}
            match={match}
            navigation={navigation}
            triggerrer={triggerrer}
          />
        ) : tabs === "tab2" ? (
          <View style={{ marginTop: 35 }}>
            <LiveScoreScreenComponent
              setTriggerrer={setTriggerrer}
              match={player}
              navigation={navigation}
              triggerrer={triggerrer}
            />
          </View>
        ) : tabs === "tab3" ? (
          <LiveScoreScreenComponent
            setTriggerrer={setTriggerrer}
            match={favoriteMatches}
            isFavoriteTab
            triggerrer={triggerrer}
            navigation={navigation}
          />
        ) : (
          <View />
        )}
      </ScrollView>
    </View>
  );
};

export default LivescoreScreen;

const Styles = StyleSheet.create({
  liveScoreScreenBackground: {
    backgroundColor: "#E5E5E5",
    flex: 1,
  },
  tabsContainer: {
    width: "100%",
    height: 55,
    backgroundColor: Colors.darkBlue,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  tabs: {
    height: "100%",
    marginTop: 18,
    alignItems: "center",
    justifyContent: "space-between",
  },
  tabsText: {
    color: "#fff",
    fontSize: 15,
  },
  calendarActiveDay: {
    borderWidth: 1,
    borderTopWidth: 5,
    borderBottomWidth: 5,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 10,
    height: 70,
    borderColor: "#E53C48",
    backgroundColor: "#ffffff",
    width: 51,
    justifyContent: "center",
    alignItems: "center",
  },
  calendarDay: {
    borderWidth: 1,
    borderColor: "#EFEFEF",
    height: 65,
    backgroundColor: "#ffffff",
    width: 51,
    justifyContent: "center",
    alignItems: "center",
  },
});
