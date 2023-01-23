import { Icon, Text } from "components/common";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "styles";

const hitSlop = { top: 12, bottom: 12, left: 12 };

const VerticalListItemFooter = ({ onCommentPress, commentsCount = 0, formattedDate, title }) => {
  return (
    <View style={styles.container}>
      <View style={styles.tag}>
        <Text style={styles.tagText}>International</Text>
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <View style={styles.footer}>
        <Text style={styles.text}>{formattedDate}</Text>
        <TouchableOpacity onPress={onCommentPress} style={styles.comment} hitSlop={hitSlop}>
          <Icon iconName="Comment" style={styles.commentIcon} />
          <Text style={styles.text}>{commentsCount}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
  },
  comment: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentIcon: {
    marginRight: 8,
  },
  text: {
    color: Colors.textGray,
    fontSize: 12,
  },
  title: {
    color: Colors.textBlack,
    fontWeight: "600",
    fontSize: 15,
  },
  tag: {
    alignSelf: "flex-start",
    padding: 3,
    backgroundColor: Colors.blurredGreen,
    marginBottom: 7,
  },
  tagText: {
    color: Colors.green,
    fontWeight: "600",
    fontSize: 15,
    textTransform: "uppercase",
  },
});

export default React.memo(VerticalListItemFooter);
