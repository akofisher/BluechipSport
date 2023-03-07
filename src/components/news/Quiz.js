import { FbSvg, IncorrectIcon, CorrectIcon, RestartIcon } from "assets/svgs/AllSvgs";
import { Spinner } from "components/common";
import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Share } from "react-native";
import FastImage from "react-native-fast-image";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { API, CancelSource, IsCancel } from "services";
import { useAuth, welcomeBackState } from "stores";
import { Colors, cxs } from "styles";

const Quiz = ({ quiz, image, shareLink, title }) => {
  const {
    id,
    is_challenge,
    has_random_questions,
    display_questions_count,
    has_random_answers,
    has_play_again_btn,
    has_start_quiz_btn,
    start_quiz_btn_text,
    progressbar,
    is_visible,
    created_at,
    updated_at,
    user_has_started,
  } = quiz;

  const { authState, signOut } = useAuth();
  const { WelcomeBack } = welcomeBackState();

  const source = CancelSource();
  const isUserLoggedIn = !!authState?.user;

  const [isLoading, setIsLoading] = useState(false);
  const [quizSessionData, setQuizSessionData] = useState(null);

  const onShare = useCallback(() => {
    Share.share({
      url: shareLink,
    });
  }, []);

  const onQuizStart = () => {
    setIsLoading(true);
    API.startQuiz({
      cancelToken: source.token,
      kwds: { id },
    })
      .then((res) => setQuizSessionData(res.data.data))
      .catch((err) => {
        if (!isUserLoggedIn && is_challenge) {
          Alert.alert("", "გაიარეთ ავტორიზაცია", [
            { text: "დახურვა", onPress: () => { } },
            {
              text: "შესვლა",
              onPress: () => WelcomeBack(true),
            },
          ]);
        }
        IsCancel(err);
      })
      .finally(() => setIsLoading(false));
  };

  const onAnswerPress = (answerId) => {
    setIsLoading(true);

    API.answerQuiz({
      cancelToken: source.token,
      kwds: { quizId: id, sessionId: quizSessionData?.session?.id },
      data: {
        question_id: quizSessionData?.question?.id,
        answer_id: answerId,
      },
    })
      .then((res) => {
        setQuizSessionData((prev) => ({
          ...prev,
          nextQuestion: res.data.data?.question,
          session: res.data.data.session,
          show_results: !prev?.show_results,
          user_answer_id: answerId,
          is_correct: res.data.data.is_correct,
        }));
      })
      .catch((err) => IsCancel(err))
      .finally(() => setIsLoading(false));
  };

  const onShowMeNextQuestion = () => {
    setQuizSessionData((prev) => ({
      ...prev,
      question: prev.nextQuestion,
      nextQuestion: null,
      show_results: false,
    }));
  };

  const renderQuizStarterComponent = () => {
    return (
      <TouchableOpacity
        onPress={onQuizStart}
        disabled={isLoading}
        style={[cxs.h50, cxs.mb8, st.starterComponentContainer]}
      >
        <View style={[cxs.my10, cxs.mx20, cxs.row, cxs.alignCenter, cxs.flex]}>
          <FontAwesome name="play" size={24} color="#145A1B" />
          <Text
            style={[
              cxs.f18,
              st.bblack,
              cxs.flex,
              cxs.mb5,
              { color: "#145A1B", textAlign: "center" },
            ]}
          >
            {user_has_started ? "განაგრძე" : "დაიწყე"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderQuizButtons = () => {
    return quizSessionData?.question?.answers?.map(({ id, text, image, explanation }, i) => {
      const isRightAnswer = quizSessionData.is_correct && quizSessionData.user_answer_id === id;
      const userChoiceDidNotMatch = quizSessionData.user_answer_id === id && !isRightAnswer;

      return (
        <TouchableOpacity
          key={id}
          onPress={() => onAnswerPress(id)}
          disabled={isLoading || quizSessionData?.show_results}
          style={[
            cxs.h50,
            cxs.mb8,
            {
              backgroundColor: quizSessionData?.show_results
                ? isRightAnswer
                  ? "#A5EAAC"
                  : userChoiceDidNotMatch
                    ? "rgba(229, 60, 72, 0.2)"
                    : "#F4F4F4"
                : "#F4F4F4",
              borderRadius: 6,
              justifyContent: "center",
            },
          ]}
        >
          <View style={[cxs.row, cxs.justifyCenter, cxs.mx20]}>
            <Text
              ellipsizeMode="tail"
              style={[
                cxs.flex,
                cxs.f18,
                st.answerTextStyle,
                userChoiceDidNotMatch && { color: Colors.primary },
              ]}
            >
              {text}
            </Text>
            {quizSessionData?.show_results && isRightAnswer ? (
              <CorrectIcon />
            ) : userChoiceDidNotMatch ? (
              <IncorrectIcon />
            ) : null}
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={[cxs.flex, st.shadow, st.topContainer]}>
      <AnswerCounter
        quizSessionData={quizSessionData}
        total_questions_count={quizSessionData?.session?.total_questions_count}
        answered_questions_count={quizSessionData?.session?.answered_questions_count}
      />

      <View style={[cxs.h186, { borderRadius: 10 }]}>
        <FastImage style={[cxs.h186, st.quizImage]} resizeMode="cover" source={{ uri: image }} />
      </View>

      <View style={[cxs.flex, cxs.p20]}>
        {!quizSessionData?.session?.is_finished ? (
          <View style={[cxs.row, cxs.mb20]}>
            {!!quizSessionData && (
              <View
                style={[cxs.mr21, cxs.w5, { borderRadius: 10, backgroundColor: Colors.primary }]}
              />
            )}
            <Text
              ellipsizeMode="tail"
              style={[
                cxs.flex,
                cxs.f18,
                cxs.py5,
                st.bblack,
                !quizSessionData && { textAlign: "center" },
              ]}
            >
              {quizSessionData ? quizSessionData?.question?.text : title}
            </Text>
          </View>
        ) : null}
        {isLoading ? (
          <Spinner style={st.flexOne} />
        ) : !quizSessionData ? (
          renderQuizStarterComponent()
        ) : quizSessionData?.session?.is_finished ? (
          <View style={[cxs.mt20]}>
            <TouchableOpacity
              onPress={onShare}
              disabled={isLoading}
              style={[cxs.h50, cxs.mb8, st.shareBtn]}
            >
              <View style={[cxs.my10, cxs.mx20, cxs.row]}>
                <FbSvg backgroundColor="#fff" foregroundColor="#3B5998" />
                <Text style={[cxs.f18, st.bblack, cxs.flex, st.share]}>გააზიარე</Text>
              </View>
            </TouchableOpacity>
            {!is_challenge && (
              <TouchableOpacity
                onPress={onQuizStart}
                disabled={isLoading}
                style={[cxs.h50, cxs.mb8, st.restartBtn]}
              >
                <View style={[cxs.my10, cxs.mx20, cxs.row]}>
                  <RestartIcon />
                  <Text
                    style={[
                      cxs.f18,
                      st.bblack,
                      cxs.flex,
                      { color: Colors.primary, textAlign: "center" },
                    ]}
                  >
                    ხელახლა
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          renderQuizButtons()
        )}
        {!!quizSessionData?.show_results && !quizSessionData?.session?.is_finished && (
          <>
            <View style={[cxs.row, cxs.flex, st.resultsContainer]}>
              <View
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor: quizSessionData?.is_correct ? "#145A1B" : Colors.primary,
                  flex: 1,
                }}
              />
              <View style={[cxs.py10, cxs.px20, cxs.row]}>
                {quizSessionData?.is_correct ? <CorrectIcon /> : <IncorrectIcon />}
                <Text
                  style={[
                    cxs.f14,
                    cxs.pl10,
                    st.isCorrect,
                    {
                      color: quizSessionData?.is_correct ? "#145A1B" : Colors.primary,
                    },
                  ]}
                >
                  {quizSessionData?.is_correct ? "სწორია" : "არასწორია"}
                </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor: quizSessionData?.is_correct ? "#145A1B" : Colors.primary,
                  flex: 1,
                }}
              />
            </View>
            <Text style={[cxs.f14, st.explanation]}>
              {
                quizSessionData?.question?.answers?.find(
                  (a) => a.id === quizSessionData?.user_answer_id,
                )?.explanation
              }
            </Text>
          </>
        )}
      </View>
      {!!quizSessionData?.show_results && !quizSessionData?.session?.is_finished && (
        <TouchableOpacity
          onPress={onShowMeNextQuestion}
          disabled={isLoading}
          style={st.resultsBtn}
          activeOpacity={0.7}
        >
          <Text style={[cxs.f15, st.next]}>შემდეგი შეკითხვა</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Quiz;

const AnswerCounter = ({ quizSessionData }) => {
  if (!quizSessionData) {
    return <></>;
  }

  const { total_questions_count, answered_questions_count, is_finished, correct_answers_count } =
    quizSessionData?.session;

  if (is_finished) {
    return (
      <>
        <View style={[cxs.py10, cxs.px20, st.resultTextContainer]}>
          <Text style={[cxs.f16, st.bwhite]}>თქვენი შედეგი</Text>
        </View>

        <View style={[cxs.py10, cxs.px20, st.from]}>
          <Text style={[cxs.f16, st.bwhite]}>
            {total_questions_count}-დან {correct_answers_count} სწორი პასუხი
          </Text>
        </View>
      </>
    );
  }

  return (
    <View style={[cxs.w60, cxs.h30, cxs.alignCenter, cxs.justifyCenter, cxs.row, st.totalQuestion]}>
      <Text style={[cxs.f16, st.bwhite]}>
        {answered_questions_count + 1} / {total_questions_count}
      </Text>
    </View>
  );
};

const st = StyleSheet.create({
  flexOne: { flex: 1 },
  topContainer: {
    borderWidth: 0.5,
    borderColor: "#DADADA",
    borderRadius: 10,
    backgroundColor: "white",
  },
  shadow: {
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  answerTextStyle: {
    lineHeight: 24,
    letterSpacing: 0.2,
    fontWeight: "700",
    color: "#000000",
  },
  bblack: {
    letterSpacing: 0.2,
    fontWeight: "700",
    color: "#000431",
  },
  bwhite: { lineHeight: 21, letterSpacing: 0.2, fontWeight: "700", color: Colors.white },
  quizImage: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  starterComponentContainer: {
    backgroundColor: Colors.buttonGreen,
    borderRadius: 6,
    maxWidth: 200,
    alignSelf: "center",
    alignItems: "center",
  },
  resultsBtn: {
    height: 55,
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
  },
  next: {
    lineHeight: 20,
    letterSpacing: 0.2,
    fontWeight: "700",
    color: Colors.white,
    textAlign: "center",
  },
  from: {
    backgroundColor: Colors.primary,
    position: "absolute",
    zIndex: 1,
    borderRadius: 10,
    alignSelf: "center",
    minHeight: 30,
    top: 186 - 15,
  },
  resultTextContainer: {
    backgroundColor: Colors.primary,
    position: "absolute",
    zIndex: 1,
    alignSelf: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    minHeight: 30,
  },
  explanation: {
    lineHeight: 20,
    letterSpacing: 0.2,
    fontWeight: "400",
    color: "#000000",
  },
  isCorrect: {
    lineHeight: 18,
    letterSpacing: 0.2,
    fontWeight: "700",
    textAlign: "center",
    alignSelf: "center",
  },
  restartBtn: {
    backgroundColor: "#FAC4C4",
    maxWidth: 200,
    borderRadius: 6,
    alignSelf: "center",
    alignItems: "center",
  },
  share: { color: Colors.white, textAlign: "center" },
  totalQuestion: {
    backgroundColor: Colors.primary,
    position: "absolute",
    zIndex: 1,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  resultsContainer: { alignItems: "center", justifyContent: "space-evenly" },
  shareBtn: {
    backgroundColor: "#475993",
    borderRadius: 6,
    maxWidth: 200,
    alignSelf: "center",
    alignItems: "center",
  },
});
