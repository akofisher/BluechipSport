import { Spinner, Text } from "components/common";
import i18next from "i18next";
import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { API, CancelSource, IsCancel } from "services";
import { useAuth } from "stores";
import { Colors, cxs } from "styles";

const Poll = ({ poll: { id, question, user_id, created_at, updated_at, answers = [] } }) => {
  const { authState, signOut } = useAuth();

  const source = CancelSource();
  const isUserLoggedIn = !!authState?.user;

  const [state, setState] = useState({
    finalAnswerId: null,
    isLoading: false,
    totalAnswers: null,
    answers,
  });

  const onAnswerPress = (answerId) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    const req = API.answerPoll({
      cancelToken: source.token,
      data: {
        poll_id: id,
        answer_id: answerId,
      },
    })
      .then((res) => {
        setState((prev) => ({
          ...prev,
          finalAnswerId: answerId,
          totalAnswers: res.data.data.total_answers,
          answers: res.data.data.answers,
        }));
      })
      .catch((err) => {
        // if (!isUserLoggedIn) {
        //   Alert.alert("", "გაიარეთ ავტორიზაცია", [
        //     { text: "დახურვა", onPress: () => console.log("OK Pressed") },
        //     {
        //       text: "შესვლა",
        //       onPress: signOut,
        //     },
        //   ]);
        // }
        IsCancel(err);
      })
      .finally(() => setState((prev) => ({ ...prev, isLoading: false })));

    return req?.cancelRequest;
  };

  return (
    <View
      style={[
        cxs.flex,
        cxs.p20,
        st.shadow,
        {
          borderWidth: 0.5,
          borderColor: "#DADADA",
          borderRadius: 10,
          backgroundColor: "white",
        },
      ]}
    >
      <View style={[cxs.row, cxs.mb20]}>
        <View style={[cxs.mr21, cxs.w5, { borderRadius: 10, backgroundColor: Colors.primary }]} />
        <Text
          ellipsizeMode="tail"
          style={[
            cxs.flex,
            cxs.f18,
            cxs.py5,
            { lineHeight: 24, letterSpacing: 0.2, fontWeight: "700", color: "#000431" },
          ]}
        >
          {question}
        </Text>
      </View>
      {state.isLoading ? (
        <Spinner style={{ flex: 1 }} />
      ) : (
        state.answers.map(
          ({ id, poll_id, answer, created_at, updated_at, users_count, percentage }, i) => (
            <View>
              <TouchableOpacity
                onPress={() => onAnswerPress(id)}
                disabled={state.isLoading || state.finalAnswerId}
                style={[
                  cxs.h50,
                  cxs.mb8,
                  {
                    backgroundColor: id === state.finalAnswerId ? "#C8FCCE" : "#F4F4F4",
                    borderRadius: 6,
                    justifyContent: "center",
                  },
                ]}
              >
                {state.finalAnswerId ? (
                  <View
                    style={{
                      position: "absolute",
                      width: percentage + "%",
                      height: "100%",
                      backgroundColor: id === state.finalAnswerId ? "#A5EAAC" : "#E4E4E4",
                      borderRadius: 6,
                    }}
                  />
                ) : null}

                <View style={[cxs.row, cxs.justifyCenter, cxs.mx20]}>
                  <Text ellipsizeMode="tail" style={[cxs.flex, cxs.f18, st.answerTextStyle]}>
                    {answer}
                  </Text>
                  {state.finalAnswerId ? (
                    <Text style={[st.answerTextStyle, { textAlign: "right" }]}>
                      {(percentage ?? 0) + "%"}
                    </Text>
                  ) : null}
                </View>
              </TouchableOpacity>
            </View>
          ),
        )
      )}

      {state.totalAnswers && (
        <Text style={[cxs.mt18, cxs.f14]}>
          {state.totalAnswers} {i18next.t("Answer")}
        </Text>
      )}
    </View>
  );
};

export default Poll;

const st = StyleSheet.create({
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
    color: "#000431",
  },
});
