import { Text, TextInput, Button, KeyboardShiftlessView } from "components/common";
import { Header, Footer, Pager } from "components/welcome";
import i18next from "i18next";
import React, { useState } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity, Platform } from "react-native";
import AppleLogin from "screens/welcome/auth/appleLogin";
import { useAuth, welcomeBackState } from "stores";
import { cxs, Colors } from "styles";

function LoginScreen({ navigation }) {
  const { signIn, skipAuth } = useAuth();
  const { WelcomeBack } = welcomeBackState();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(true);

  const toggleVisibility = () => setPasswordHidden(!passwordHidden);

  return (
    <KeyboardShiftlessView>
      <Header>
        <Text style={cxs.welcomeTextLead}>{i18next.t("AuthHeader")}</Text>
        <Text style={cxs.welcomeTextSecondary}>{i18next.t("AuthBenefits")}</Text>
      </Header>
      <ScrollView style={[cxs.p35]} keyboardShouldPersistTaps="handled">
        <TextInput
          style={[cxs.my5]}
          placeholder={i18next.t("YourMail")}
          keyboardType="email-address"
          autoCapitalize="none"
          iconLeft={{ name: "envelope" }}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={[cxs.my5]}
          secureTextEntry={passwordHidden}
          placeholder={i18next.t("YourPass")}
          autoCapitalize="none"
          iconLeft={{ name: "lock" }}
          iconRight={{
            name: passwordHidden ? "eye" : "eye-slash",
            onPress: toggleVisibility,
          }}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={[cxs.row, cxs.alignCenter, cxs.justifyBetween, cxs.my10, cxs.px5]}>
          <TouchableOpacity onPress={() => navigation.navigate("Reset")}>
            <Text style={styles.textPass}>{i18next.t("PassRecovery")}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.textRegister}>{i18next.t("Registration")}</Text>
          </TouchableOpacity>
        </View>
        <Button
          title={i18next.t("AuthHeader")}
          style={cxs.my20}
          onPress={() => {
            signIn({ email, password });
          }}
        />
        <Text style={styles.socText}>{i18next.t("SignInWithSocialPlatforms")}</Text>
        {/* <View style={[cxs.alignCenter, cxs.my15]}>
          <FbLogin navigation={navigation} />
        </View>*/}
        {Platform.OS === "ios" ? (
          <View style={[cxs.alignCenter, cxs.my15]}>
            <AppleLogin />
          </View>
        ) : null}
      </ScrollView>
      <Footer style={{ paddingBottom: 40 }}>
        <Button
          title={i18next.t("ContinueWithoutAuthentication")}
          color=""
          textColor="textSecondary"
          onPress={() => {
            skipAuth();
            WelcomeBack(false);
          }}
        />
        <Pager active={3} />
      </Footer>
    </KeyboardShiftlessView>
  );
}

const styles = StyleSheet.create({
  textPass: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.textSecondary,
    textDecorationLine: "underline",
  },
  textRegister: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.primary,
    textDecorationLine: "underline",
  },
  socText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4E4E4E",
    textAlign: "center",
  },
  icon: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 30,
    marginLeft: 20,
  },
});

export default LoginScreen;
