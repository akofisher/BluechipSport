import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AppleAuthentication from "expo-apple-authentication";
import i18next from "i18next";
import React from "react";
import { Alert, StyleSheet } from "react-native";
import { API } from "services";
import { useAuth } from "stores";

export default function AppleLogin({ navigation }) {
  const { updateToken } = useAuth();
  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
      cornerRadius={5}
      style={{ width: 230, height: 44 }}
      onPress={async () => {
        try {
          const {
            data: { token: appleToken },
          } = await API.getAppleToken();

          const credential = await AppleAuthentication.signInAsync({
            requestedScopes: [],
          });

          const signInResponse = await API.signInApple({
            data: { identity_token: credential.identityToken, token: appleToken },
          });

          const { user, token } = signInResponse.data;
          AsyncStorage.setItem("@user", JSON.stringify({ user, token }));
          updateToken(user, token);

          // signed in
        } catch (e) {
          console.warn("error", e);
          if (e.code === "ERR_CANCELED") {
            // handle that the user canceled the sign-in flow
          } else {
            Alert.alert(i18next.t("Error"));
            // handle other errors
          }
        }
      }}
    />
  );
}

const styles = StyleSheet.create({
  icon: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 30,
  },
});
