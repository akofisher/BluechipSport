import { Text, Spinner, Separator, VideoPlayer } from "components/common";
import { Header } from "components/header";
import { TagButton, CommentsButton, NewsDetialsFooter, Poll } from "components/news";
import ArticleContent from "components/news/ArticleContent";
import Quiz from "components/news/Quiz";
import i18next from "i18next";
import React, { useState, useEffect, useMemo } from "react";
import { View, FlatList, StyleSheet, Share, SectionList } from "react-native";
import FastImage from "react-native-fast-image";
import { API } from "services";
import { Colors, cxs } from "styles";
import { storageURL } from "services/endpoints";

const LINK_PREFIX = "https://m.goal.ge/news/";

const keyExtractor = (item, index) => {
  return item?.id + index.toString() + Math.random() * 100;
};

const NewsDetailsScreen = ({ route, navigation }) => {
  const { articleId } = route.params;
  const [id, setId] = useState();

  const [state, setState] = useState({
    article: null,
    id: null,
    comentCount: null,
  });
  const imageURI = `${storageURL}/size/timthumb.php?src=/uploads/posts/${state?.article?.img}&w=450`;

  const goToLeagueOrTeamScreen = (item, TeamName) => {
    if (item.type === "league") {
      navigation.navigate("Leaguee", { rame: true, leagueId: item.id });
    } else if (item.type === "team") {
      navigation.push("teamScore", {
        TeamId: item.id,
        TeamName,
        teamLogo: item.image,
      });
    }
  };

  useEffect(() => {
    const req = API.getArticle({ kwds: { id: articleId } })
      .then(({ data }) => {
        const article = {
          id: data.id.toString(),
          title: data.title.replace(/<br.*?>/gi, "\n").replace(/\\/g, ""),
          content: data.content.replace(/\\/g, "").replace(/\/news\//g, LINK_PREFIX),
          img: data.main_gallery_item.filename_webp,
          categories: data.categories,
          date: data.created_at,
          shareLink: data.share_link,
          tagged: data.tagged,
          video: data.main_video_url,
          hasEmbed: data.has_embed,
          plainContent: data.plain_content,
          poll: data.poll,
          quiz: data.quiz,
        };

        setState({ article, comentCount: data.comments_count, linkedNews: data.linked_news });
      })
      .catch((error) => {
        console.warn(error);
      });

    return req.cancelRequest;
  }, [id]);

  const onShare = async () => {
    try {
      const result = await Share.share({
        // message: 'React Native | A framework for building native apps using React',
        url: state.article.shareLink,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const DATA = state?.article
    ? [
        {
          title: i18next.t("Tags"),
          data: [state?.article?.tagged],
          renderItem: ({ item }) => {
            return (
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={item}
                keyExtractor={keyExtractor}
                contentContainerStyle={{ paddingHorizontal: 20 }}
                ItemSeparatorComponent={() => <View style={cxs.mx5} />}
                renderItem={({ item }) => (
                  <TagButton
                    title={item.name}
                    imgUri={item.image}
                    item={item}
                    onPress={() => goToLeagueOrTeamScreen(item, item.name)}
                  />
                )}
              />
            );
          },
        },
        {
          title: "",
          data: [state.comentCount],
          renderItem: ({ item }) => {
            return (
              <CommentsButton
                onPress={() =>
                  navigation.navigate("NewsComments", {
                    articleId,
                  })
                }
                comentCount={item}
              />
            );
          },
        },
      ]
    : [];

  const headerRightAction = useMemo(
    () => ({
      onPress: onShare,
      iconName: "Share",
    }),
    [onShare],
  );

  const headerLeftAction = useMemo(
    () => ({
      onPress: navigation.goBack,
      iconName: "ArrowRight",
    }),
    [navigation.goBack],
  );

  return (
    <View style={cxs.flex}>
      <Header leftAction={headerLeftAction} rightAction={headerRightAction} />
      {!state.article ? (
        <View style={st.spinnerContainer}>
          <Spinner />
        </View>
      ) : (
        <SectionList
          sections={DATA}
          keyExtractor={keyExtractor}
          renderItem={({ item }) => item?.renderItem(item)}
          stickySectionHeadersEnabled={false}
          renderSectionHeader={({ section: { title } }) => (
            <View style={{ marginTop: 15 }}>
              <Separator />
              <View style={[cxs.px15, cxs.pt15]}>
                {title ? (
                  <Text style={[cxs.mb15, cxs.textBold, cxs.f17, { color: Colors.textTitle }]}>
                    {title}
                  </Text>
                ) : null}
              </View>
            </View>
          )}
          ListHeaderComponent={() => (
            <>
              {!state?.article?.quiz && !state?.article?.poll && route.params?.mainVideoUrl ? (
                <View style={[st.image, st.video]}>
                  <VideoPlayer
                    uri={route.params.mainVideoUrl}
                    style={[st.image, st.video]}
                    posterUri={imageURI}
                  />
                </View>
              ) : !state?.article?.quiz && !state?.article?.poll ? (
                <FastImage
                  source={{
                    uri: imageURI,
                  }}
                  style={st.image}
                />
              ) : null}
              <Text style={[cxs.mx20, cxs.mt20, cxs.textBold, cxs.f20, { color: "black" }]}>
                {state?.article?.title}
              </Text>

              {state?.article?.quiz ? (
                <View style={[cxs.py10, cxs.pb0, cxs.mb10, { backgroundColor: "white" }]}>
                  <View style={[cxs.px20]}>
                    <Quiz
                      quiz={state.article.quiz}
                      image={imageURI}
                      shareLink={state?.article?.shareLink}
                    />
                  </View>
                </View>
              ) : state?.article?.poll ? (
                <View style={[cxs.py10, cxs.pb0, cxs.mb10, { backgroundColor: "white" }]}>
                  <View style={[cxs.px20]}>
                    <Poll poll={state.article.poll} />
                  </View>
                </View>
              ) : (
                <ArticleContent
                  onShouldStartLoadWithRequest={(event) => {
                    const linkedNews = state?.linkedNews;

                    for (let i = 0; i < linkedNews?.length; i++) {
                      linkedNews[i].link === event.url.replace(LINK_PREFIX, "/news/") &&
                        navigation.push("NewsDetails", {
                          title: linkedNews[i].text,
                          articleId: linkedNews[i].id,
                        });
                      setId(linkedNews[i].id);
                    }
                    return event.mainDocumentURL === "about:blank";
                  }}
                  hasEmbed={state?.article?.hasEmbed}
                  content={state?.article?.content}
                  date={state?.article?.date}
                  plainContent={state?.article?.plainContent}
                />
              )}
            </>
          )}
          ListFooterComponent={() => <NewsDetialsFooter />}
        />
      )}
    </View>
  );
};

export default NewsDetailsScreen;

const st = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  newsDateIcons: {
    height: 50,
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-between",
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

  Icons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iocnTxt: {
    fontSize: 22,
    color: "#000000",
    fontWeight: "bold",
  },
  image: { height: 220 },
  video: {
    width: "100%",
  },
  spinnerContainer: { justifyContent: "center", alignItems: "center", flex: 1 },
});
