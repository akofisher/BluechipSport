import { StackActions, useNavigation } from "@react-navigation/native";
import { TextInput, Switch, Text } from "components/common";
import i18next from "i18next";
import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView } from "react-native";

import { useAuth, hideUserInfo, welcomeBackState, useGlobalState } from "stores";

const UserOptions = () => {
  const navigation = useNavigation();

  const { Refresh } = useGlobalState();
  const { signOut, changePassword } = useAuth();
  const { WelcomeBack } = welcomeBackState();

  const [isEnabled, setIsEnabled] = useState(false);
  const [current_password, setCurrentPassword] = useState();
  const [password, setPassword] = useState();
  const [confirm_password, setConfirmPassword] = useState();

  const [curPasswordHidden, setCurPasswordHidden] = useState(true);
  const [passwordHidden, setPasswordHidden] = useState(true);

  const { HideUserInfo, userInfoOnInput } = hideUserInfo();

  const togglePassVisibility = () => setCurPasswordHidden(!curPasswordHidden);
  const toggleVisibility = () => setPasswordHidden(!passwordHidden);

  const toggleSwitch = () => setIsEnabled(!isEnabled);

  const changeUserPassword = () => {
    if (password === confirm_password) {
      changePassword({ current_password, password, confirm_password });
    } else {
      alert(i18next.t("PasswordDoesNotMatch"));
    }
    setCurrentPassword("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "margin"}
      style={{ flex: 1 }}
    >
      <ScrollView bounces={false}>
        <Text style={Styles.title}>{i18next.t("ChangePassword")}</Text>
        <View style={Styles.inputContainer}>
          <TextInput
            onFocus={() => {
              HideUserInfo(false);
            }}
            onBlur={() => {
              HideUserInfo(true);
            }}
            placeholder={i18next.t("EnterCurrentPassword")}
            style={Styles.textInput}
            value={current_password}
            secureTextEntry={curPasswordHidden}
            iconRight={{
              name: curPasswordHidden ? "eye" : "eye-slash",
              onPress: togglePassVisibility,
            }}
            onChangeText={(text) => {
              setCurrentPassword(text);
            }}
          />
          <TextInput
            onFocus={() => {
              HideUserInfo(false);
            }}
            onBlur={() => {
              HideUserInfo(true);
            }}
            placeholder={i18next.t("EnterNewPassword")}
            style={Styles.textInput}
            value={password}
            secureTextEntry={passwordHidden}
            iconRight={{
              name: passwordHidden ? "eye" : "eye-slash",
              onPress: toggleVisibility,
            }}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
          <TextInput
            onFocus={() => {
              HideUserInfo(false);
            }}
            onBlur={() => {
              HideUserInfo(true);
            }}
            placeholder={i18next.t("RepeatNewPassword")}
            style={Styles.textInput}
            value={confirm_password}
            secureTextEntry={passwordHidden}
            iconRight={{
              name: passwordHidden ? "eye" : "eye-slash",
              onPress: toggleVisibility,
            }}
            onChangeText={(text) => {
              setConfirmPassword(text);
            }}
          />
          <TouchableOpacity style={Styles.saveButton} onPress={changeUserPassword}>
            <Text style={Styles.saveBtnText}>{i18next.t("Remember")}</Text>
          </TouchableOpacity>
        </View>
        <Text style={Styles.title}>{i18next.t("Messages")}</Text>
        <View
          style={[Styles.inputContainer, { flexDirection: "row", justifyContent: "space-between" }]}
        >
          <Text style={Styles.getNotif}>{i18next.t("ReceiveMessages")}</Text>

          <Switch
            width={80}
            height={50}
            backgroundInactive="#f8f8f8"
            backgroundActive="#F8F8F8"
            circleColorActive="#E53C48"
            circleColorInactive="#a3a3a3"
            onSyncPress={toggleSwitch}
            style={{ borderColor: "#efefef", borderWidth: 1 }}
          />
        </View>
        <TouchableOpacity
          style={Styles.logOutBtn}
          onPress={() => {
            signOut();
            WelcomeBack(false);
            navigation.navigate("Home");
            Refresh((prev) => !prev);
          }}
        >
          <Text style={Styles.saveBtnText}>{i18next.t("LogOut")}</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UserOptions;

const Styles = StyleSheet.create({
  title: {
    marginVertical: 24,
    marginLeft: 22,
    fontSize: 12,
    color: "#959595",
  },
  inputContainer: {
    paddingVertical: 28,
    paddingHorizontal: 22,
    backgroundColor: "#ffffff",
    borderRadius: 25,
  },
  textInput: {
    height: 50,
    borderRadius: 5,
    backgroundColor: "#F8F8F8",
    borderWidth: 1,
    borderColor: "#EFEFEF",
    paddingLeft: 18,
    marginBottom: 10,
  },
  saveButton: {
    height: 50,
    borderRadius: 5,
    backgroundColor: "#E53C48",
    justifyContent: "center",
    alignItems: "center",
  },
  saveBtnText: {
    fontSize: 14,
    color: "#ffffff",
  },
  logOutBtn: {
    height: 80,
    backgroundColor: "#E53C48",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 51,
  },
  getNotif: {
    fontSize: 14,
    color: "#555555",
    width: 170,
  },
});
