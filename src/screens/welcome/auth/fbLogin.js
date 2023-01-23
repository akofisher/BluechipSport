import AsyncStorage from "@react-native-async-storage/async-storage";
import { FbSvg } from "assets/svgs/AllSvgs";
// To make it work there is a need to replace expo module because it is not working after expo eject
// import * as Facebook from "expo-facebook";
import * as firebase from "firebase";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useAuth } from "stores";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDD0ljNPz098w0BqmbU8MmI6MzmaUxlm0I",
  authDomain: "goal-ge.firebaseapp.com",
  projectId: "goal-ge",
  storageBucket: "goal-ge.appspot.com",
  databaseURL: "https://goal-ge-default-rtdb.firebaseio.com/",
};
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
if (firebase?.apps?.length === 0) {
  firebase?.initializeApp(firebaseConfig);
}
// Facebook.initializeAsync('885996412199472', 'goal- ge');

export default function FbLogin({ navigation }) {
  const { signIn, skipAuth, updateToken } = useAuth();

  async function logIn() {
    return;
    try {
      await Facebook.initializeAsync({
        appId: "885996412199472",
      });
      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ["public_profile"],
        });

      console.log(token);
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        // const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);

        await fetch(`https://graph.facebook.com/me?access_token=${token}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            const user = data;
            AsyncStorage.setItem("@user", JSON.stringify({ user, token }));
            updateToken(user, token);
            console.log("token fb--", token);
          })
          .catch((err) => {
            debugger;
            console.error(err);
          });
      } else {
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  return (
    <TouchableOpacity style={styles.icon} onPress={logIn}>
      <FbSvg height={14} />
      <Text style={{ fontSize: 16 }}>Sign in with Facebook</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    width: 230,
    height: 44,
  },
});
