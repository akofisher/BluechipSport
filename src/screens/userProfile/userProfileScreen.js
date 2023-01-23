import EditIcon from "assets/icons/editIcon.png";
import Avatar from "components/common/Avatar";
import { Header, BackButton, Title } from "components/header";
import { UserComments, UserOptions, UserSubscriptions } from "components/userProfile/index";
import i18next from "i18next";
import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { CancelSource, API } from "services";
import { hideUserInfo, useGlobalState } from "stores";
import { Text } from "components/common";

import ScrollViewHorizontalCommon from "../../components/Livescore/commonDetails/ScrollViewHorizontalCommon";

const details = [i18next.t("MyComments"), i18next.t("MySubscriptions"), i18next.t("Settings")];
const UserProfileScreen = ({ navigation, route }) => {
  const { Refresh, myRefresh } = useGlobalState();

  const [visibleDetail, setVisibleDetail] = useState(details[0]);
  const { user } = route.params;
  const source = CancelSource();

  const { userInfoOnInput } = hideUserInfo();
  const [base64Icon, setBase64Icon] = useState();

  const pickImage = async () => {
    launchImageLibrary(
      {
        mediaTypes: "photo",
        aspect: [1, 1],
        selectionLimit: 1,
        quality: 0.1,
        includeBase64: true,
      },
      (result) => {
        if (!result.didCancel) {
          API.updateUserInfo({
            cancelToken: source.token,
            data: { avatar_new: `data:image/png;base64,${result.assets[0].base64}` },
          })
            .then((response) => {
              setBase64Icon(response.data.avatar);
              Refresh(!myRefresh);
            })
            .catch((error) => alert(error));
        }
      },
    );
  };
  useEffect(() => {}, [user.avatar]);

  return (
    <View style={{ flex: 1, backgroundColor: "#E5E5E5" }}>
      <Header>
        <BackButton
          onPress={() => {
            navigation.goBack("News");
          }}
        />
        <Title title={user?.username} />
      </Header>

      <View style={[userInfoOnInput ? Styles.userDetailContainer : Styles.userDetailContainerHide]}>
        <View>
          <TouchableOpacity style={Styles.editIcon} onPress={pickImage}>
            <Image style={{ width: 16, height: 16 }} source={EditIcon} />
          </TouchableOpacity>
          <View style={Styles.userImg}>
            <Avatar size={100} uri={base64Icon ? base64Icon : user.avatar} />
          </View>
        </View>
        <Text style={Styles.userName}>{user?.username}</Text>
      </View>
      <View style={Styles.tabs}>
        <ScrollViewHorizontalCommon
          details={details}
          setVisibleDetail={setVisibleDetail}
          visibleDetail={visibleDetail}
        />
      </View>
      {visibleDetail === i18next.t("MyComments") ? (
        <UserComments />
      ) : visibleDetail === i18next.t("MySubscriptions") ? (
        <UserSubscriptions />
      ) : (
        visibleDetail === i18next.t("Settings") && <UserOptions />
      )}
    </View>
  );
};

export default UserProfileScreen;

const Styles = StyleSheet.create({
  userDetailContainer: {
    backgroundColor: "#ffffff",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#F6F6F6",
  },
  userDetailContainerHide: {
    backgroundColor: "#ffffff",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#F6F6F6",
    opacity: 0,
    height: 0,
  },
  userImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    marginTop: 31,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  userName: {
    color: "#000000",
    fontSize: 16,
    marginBottom: 26,
  },
  editIcon: {
    width: 39,
    height: 39,
    borderRadius: 19.5,
    backgroundColor: "#E53C48",
    position: "absolute",
    right: 0,
    top: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  tabs: {
    height: 67,
    backgroundColor: "#ffffff",
  },
  content: {
    backgroundColor: "#F4F4F4",
    paddingBottom: 120,
  },
});
