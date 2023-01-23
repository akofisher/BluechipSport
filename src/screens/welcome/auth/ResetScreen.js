import { Text, TextInput, Button, KeyboardShiftlessView } from "components/common";
import { Header, Footer, Pager } from "components/welcome";
import i18next from "i18next";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { useAuth, welcomeBackState } from "stores";
import { cxs } from "styles";

function ResetScreen({ route, navigation }) {
  const { skipAuth, resetPassword } = useAuth();
  const { WelcomeBack, welcome } = welcomeBackState();
  const [email, setEmail] = useState();

  return (
    <KeyboardShiftlessView>
      <Header>
        <Text style={cxs.welcomeTextLead}>{i18next.t("PassRecovery")}</Text>
        <Text style={cxs.welcomeTextSecondary}>
          {i18next.t("PleaseIndicateEmailForRegistration")}
        </Text>
      </Header>
      <ScrollView style={[cxs.p25]} keyboardShouldPersistTaps="handled">
        <TextInput
          style={[cxs.my5]}
          placeholder={i18next.t("YourMail")}
          iconLeft={{ name: "envelope" }}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />

        <Button
          onPress={() => {
            resetPassword({ email }) && navigation.navigate("Login");
          }}
          title={i18next.t("SendPassword")}
          width="100%"
          style={cxs.my20}
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

export default ResetScreen;
