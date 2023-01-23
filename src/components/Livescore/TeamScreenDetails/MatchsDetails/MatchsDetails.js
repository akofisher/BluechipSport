import { Spinner } from "components/common";
import i18next from "i18next";
import React, { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { Dropdown } from "screens/transfers/Dropdown";
import { API } from "services";

import Matchs from "./Matchs";

const MODES = [
  {
    value: 1,
    label: i18next.t("Next"),
  },
  {
    value: -1,
    label: i18next.t("Conducted"),
  },
];

export default function MatchsDetails({ id, navigation, screenName }) {
  const [matches, setMatches] = useState([]);
  const [lastPage, setLastPage] = useState(1);
  const [isloading, setisloading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const [mode, setMode] = useState(MODES[0]);

  useEffect(() => {
    setisloading();
    API.matchsDetails({
      kwds: { id, page: currentPage, order: mode.value },
    })
      .then(({ data }) => {
        setMatches(data.data);
        setLastPage(data.last_page);
      })
      .catch((error) => {
        console.warn(error);
      })
      .finally(() => {
        setisloading(false);
      });
  }, [id, mode, currentPage]);

  const onEndReached = () => {
    if (currentPage >= lastPage) {
      return;
    }
    API.matchsDetails({
      kwds: { id, page: currentPage + 1, order: mode.value },
    })
      .then(({ data }) => {
        setMatches([...matches, ...data]);
        setCurrentPage(currentPage + 1);
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  if (isloading) {
    return <Spinner />;
  }

  if (matches?.length === 0) {
    return (
      <View>
        <Text>{i18next.t("NoMatchesFound")}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ paddingVertical: 20 }} style={{ flex: 1 }}>
      <View
        style={{
          borderRadius: 25,
          marginBottom: 24,
        }}
      >
        <Dropdown
          inputLabel={mode.label}
          value={mode.value}
          onValueChange={(value) => {
            const item = MODES.find((item) => item.value === value);
            setCurrentPage(1);
            setMode(item);
          }}
          items={MODES}
        />
      </View>
      <Matchs
        data={matches}
        navigation={navigation}
        screenName={screenName}
        onEndReached={onEndReached}
      />
    </ScrollView>
  );
}
