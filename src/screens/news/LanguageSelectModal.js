import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { RadioListItem, Text } from "components/common";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "styles";

import { useLanguage } from "stores";
import i18next from "i18next";

const LanguageSelectModal = ({ bottomSheetModalRef }) => {
  const { languages, language: appLanguage, changeLanguage } = useLanguage();
  const snapPoints = useMemo(() => [310, 310], []);

  return (
    <BottomSheetModal
      enablePanDowntoClose
      backdropComponent={BottomSheetBackdrop}
      ref={bottomSheetModalRef}
      index={1}
      snapPoints={snapPoints}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{i18next.t("ChooseLanguage")}</Text>
        {languages.map((language) => {
          return (
            <>
              <RadioListItem
                checked={language.code === appLanguage}
                title={language.title}
                iconName={language.iconName}
                onPress={() => changeLanguage(language.code)}
              />
              <View style={styles.space} />
            </>
          );
        })}
      </View>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 45,
    paddingHorizontal: 25,
  },
  title: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
    color: Colors.black,
    textTransform: "uppercase",
    marginBottom: 34,
  },
  space: {
    height: 18,
  },
});

export default LanguageSelectModal;
