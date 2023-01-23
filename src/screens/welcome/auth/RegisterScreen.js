import { Text, TextInput, Button, KeyboardShiftlessView } from "components/common";
import { Header, Footer, Pager } from "components/welcome";
import i18next from "i18next";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { useAuth, welcomeBackState } from "stores";
import { cxs } from "styles";

function RegisterScreen() {
  const { signUp, skipAuth } = useAuth();
  const { WelcomeBack } = welcomeBackState();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [confirmPasswordHidden, setConfirmPasswordHidden] = useState(true);

  const togglePasswordVisibility = () => setPasswordHidden(!passwordHidden);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordHidden(!confirmPasswordHidden);

  return (
    <KeyboardShiftlessView>
      <Header>
        <Text style={cxs.welcomeTextLead}>{i18next.t("Registration")}</Text>
        <Text style={cxs.welcomeTextSecondary}>{i18next.t("AuthBenefits")}</Text>
      </Header>
      <ScrollView style={[cxs.p25]} keyboardShouldPersistTaps="handled">
        <TextInput
          style={[cxs.my5]}
          placeholder={i18next.t("YourMail")}
          iconLeft={{ name: "envelope" }}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={[cxs.my5]}
          placeholder={i18next.t("YourNickname")}
          iconLeft={{ name: "user" }}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={[cxs.my5]}
          secureTextEntry={passwordHidden}
          placeholder={i18next.t("YourPass")}
          iconLeft={{ name: "lock" }}
          iconRight={{
            name: passwordHidden ? "eye" : "eye-slash",
            onPress: togglePasswordVisibility,
          }}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={[cxs.my5]}
          secureTextEntry={confirmPasswordHidden}
          placeholder={i18next.t("RepeatPass")}
          iconLeft={{ name: "lock" }}
          iconRight={{
            name: confirmPasswordHidden ? "eye" : "eye-slash",
            onPress: toggleConfirmPasswordVisibility,
          }}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <Button
          title={i18next.t("Registration")}
          style={cxs.my20}
          onPress={() => {
            signUp({
              email,
              username,
              password,
              confirm_password: confirmPassword,
            });
          }}
        />
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

export default RegisterScreen;
