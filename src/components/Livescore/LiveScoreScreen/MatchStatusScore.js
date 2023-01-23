import i18next from "i18next";
import moment from "moment";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "styles";
import { Text } from "components/common";

export const getTimeStatusLabel = (timeStatus) => {
  if (timeStatus === TIME_STATUSES.FT_PEN) {
    return i18next.t("TIMESTATUS_FT_PEN");
  }

  if (timeStatus === TIME_STATUSES.ET) {
    return i18next.t("TIMESTATUS_ET");
  }

  if (timeStatus === TIME_STATUSES.AET) {
    return i18next.t("TIMESTATUS_AET");
  }

  return timeStatus;
};

export const TIME_STATUSES = {
  FT: "FT",
  ET: "ET",
  FT_PEN: "FT_PEN",
  HT: "HT",
  AET: "AET",
};

export default function MatchStatusScore({ item, status }) {
  if (status === "NS") {
    return (
      <View style={Styles.timeDashContainer}>
        <View style={Styles.beforeTimeContainer}>
          <View style={Styles.beforeTimeTextContainer}>
            <Text style={Styles.beforeTimeText}>
              {moment(item.starting_at, "YYYY-MM-D HH:mm:ss").format("HH:mm")}
            </Text>
          </View>
        </View>
        <View style={Styles.dashCont}>
          <Text style={Styles.dash}>-</Text>
        </View>
      </View>
    );
  } else if (status === "CANCL" || status === "TBA" || status === "POSTP") {
    return (
      <View style={Styles.timeDashContainer}>
        <View style={Styles.beforeTimeContainer}>
          <View style={Styles.beforeTimeTextContainer}>
            <Text style={Styles.beforeTimeText}>{item.time_status}</Text>
          </View>
        </View>
        <View style={Styles.dashCont}>
          <Text style={Styles.dash}>-</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={Styles.timeScoreContainer}>
        <View style={Styles.timeTextContainer}>
          {item.time_status === TIME_STATUSES.FT ||
          item.time_status === TIME_STATUSES.ET ||
          item.time_status === TIME_STATUSES.FT_PEN ||
          item.time_status === TIME_STATUSES.HT ||
          item.time_status === TIME_STATUSES.AET ? (
            <Text
              style={[
                Styles.timeText,
                {
                  color:
                    item.time_status === "HT" || item.time_status === "ET"
                      ? Colors.primary
                      : item.time_status === "FT" ||
                        item.time_status === "AET" ||
                        item.time_status === "FT_PEN"
                      ? Colors.black
                      : Colors.primary,
                },
              ]}
            >
              {getTimeStatusLabel(item.time_status)}
            </Text>
          ) : (
            <Text style={Styles.timeText}>{item.time_minute}'</Text>
          )}
        </View>
        <View style={Styles.scoreCont}>
          <Text
            style={[
              Styles.score,
              {
                color:
                  item.time_status === "FT" ||
                  item.time_status === "AET" ||
                  item.time_status === "FT_PEN"
                    ? Colors.black
                    : Colors.primary,
              },
              { marginBottom: 10 },
            ]}
          >
            {item.localteam_score}
          </Text>

          <Text
            style={[
              Styles.score,
              {
                color:
                  item.time_status === "FT" ||
                  item.time_status === "AET" ||
                  item.time_status === "FT_PEN"
                    ? Colors.black
                    : Colors.primary,
              },
            ]}
          >
            {item.visitorteam_score}
          </Text>
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  timeDashContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 22,
  },
  beforeTimeContainer: {
    flexDirection: "row",
    paddingRight: 22,
  },
  beforeTimeTextContainer: {
    borderWidth: 1,
    borderRadius: 30,
    width: 60,
    paddingVertical: 4,
    borderColor: "#F3F3F3",
    alignItems: "center",
  },
  beforeTimeText: {
    fontSize: 11,
    color: "#606060",
  },
  dashCont: {
    // height: 60,
    alignItems: "center",
    width: 13,
  },
  dash: {
    fontSize: 15,
    color: "#606060",
    fontWeight: "600",
  },
  timeTextContainer: {
    borderWidth: 1,
    // borderTopLeftRadius: 30,
    // borderBottomLeftRadius: 30,
    borderRadius: 30,
    paddingVertical: 4,
    borderColor: "#F3F3F3",
    marginRight: 23,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },

  timeText: {
    fontSize: 11,
    color: "#E53C48",
    marginLeft: 4,
  },
  timeScoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 22,
  },
  scoreCont: {
    // height: 60,
    alignItems: "center",
    width: 13,
  },
  score: {
    fontSize: 15,
    color: "#E53C48",
    fontWeight: "600",
  },
  iconPlay: {
    borderWidth: 1,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderColor: "#F3F3F3",
  },
  entypo: {
    color: "#5A5A5A",
    fontSize: 14,
  },
});
