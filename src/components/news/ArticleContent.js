import dateD from "assets/icons/datee.png";
import { AutoHeightWebView, Text } from "components/common";
import moment from "moment";
import React, { useCallback, useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";

const ArticleContent = React.memo(
  ({ onShouldStartLoadWithRequest, hasEmbed, content, date, plainContent }) => {
    const [fontSize, setFontSize] = useState(15);

    const onIncrease = useCallback(() => {
      fontSize != 25 && setFontSize((prev) => prev + 1);
    }, [fontSize]);

    const onDecrease = () => {
      fontSize != 9 && setFontSize((prev) => prev - 1);
    };

    return (
      <>
        <View style={st.newsDateIcons}>
          <View style={st.Icons}>
            <Image source={dateD} />
            <Text style={st.dateTxt}>{moment(date).format("MM.DD.YYYY")}</Text>
          </View>
          <View style={st.Icons}>
            <TouchableOpacity style={st.plusIcon} onPress={onIncrease}>
              <Text style={st.iocnTxt}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={st.plusIcon} onPress={onDecrease}>
              <Text style={st.iocnTxt}>-</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={st.paddingHorizontal}>
          {hasEmbed ? (
            <AutoHeightWebView
              originWhitelist={["*"]}
              source={{
                html: `${content}
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                         <style>
                              img { display: block; max-width: 100%; height: auto; }
                              body { font-size: ${fontSize}px; color: #494949; line-height: 25px; letter-spacing: 0.01px; }
                              iframe { display: block; max-height: 210px; }
                        </style>`,
              }}
              onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
            />
          ) : (
            <Text
              style={[
                st.content,
                {
                  fontSize,
                },
              ]}
            >
              {plainContent}
            </Text>
          )}
        </View>
      </>
    );
  },
);

export default ArticleContent;

const st = StyleSheet.create({
  paddingHorizontal: { paddingHorizontal: 10 },
  newsDateIcons: {
    height: 50,
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  Icons: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateTxt: {
    marginLeft: 10,
    fontSize: 12,
  },
  plusIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  iocnTxt: {
    fontSize: 22,
    color: "#000000",
    fontWeight: "bold",
  },
  content: {
    color: "#494949",
    lineHeight: 25,
    letterSpacing: 0.01,
    marginHorizontal: 10,
  },
});
