import React, { useState, useEffect, useRef, useMemo } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
} from "react-native";
import { DawnStandingSvg, StarIconFilled, UpStandingSvg } from "../../../assets/svgs/AllSvgs";
import { ICONS } from "../../../assets/icons";
import { SvgICONS } from "../../../assets/svgs/svgIcons";
import { BackButton, Title, Header } from "../../components/header";




export default function PredictionScreen({ navigation, route }) {
    const [numForBar, setNumForBar] = useState({
        fir: '36',
        sec: '64',
    })





    const ProgressBar = {
        width: '100%',
        height: 10,
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
    }
    const FailBar = {
        width: `${numForBar.fir}%`,
        height: '100%',
        backgroundColor: '#FF0960',
    }

    const SuccessBar = {
        width: `${numForBar.sec}%`,
        height: '100%',
        backgroundColor: '#01AF70',
    }

    // const bottomSheetModalRef = useRef(null);
    // const presentLeagueModal = () => bottomSheetModalRef.current.present();
    // const close = () => bottomSheetModalRef.current.close();
    // const snapPoints = useMemo(() => ["10%", "75%"], []);


    // const onSearchPress = React.useCallback(() => navigation.navigate("searchScreen"), []);
    // const headerRightActions = useMemo(
    //     () => [
    //         {
    //             onPress: onSearchPress,
    //             iconName: "Search",
    //         },
    //         {
    //             onPress: navigation.openDrawer,
    //             iconName: "Menu",
    //         },
    //     ],
    //     [navigation.openDrawer, onSearchPress],
    // );

    const TeamCards = () => {
        return (
            <View style={styles.CardCont}>
                <View style={styles.CardHead}>
                    <View style={styles.LeftHead}>
                        <View style={styles.CupIconCont}>
                            <UpStandingSvg />
                            <DawnStandingSvg />
                        </View>
                        <Text style={styles.MatchHeadTxt}>IPL FINAL</Text>
                    </View>
                    <View style={styles.RightHead}>
                        <Text style={styles.TimeTxt}>12 AM UTC</Text>
                        <Text style={styles.DateTxt}>12;12;21</Text>
                    </View>
                </View>
                <View style={styles.SecTeamBigCont}>

                    <View style={styles.TeamsLogosCont}>
                        <View style={styles.TeamCont}>
                            <View style={styles.TeamLogoCont}></View>
                            <Text style={styles.TeamNameTxt}>Dinamo</Text>
                        </View>
                        <Text style={styles.TeamVs}>VS</Text>
                        <View style={styles.TeamCont}>
                            <View style={styles.TeamLogoCont}></View>
                            <Text style={styles.TeamNameTxt}>Torpedo</Text>
                        </View>
                    </View>

                </View>
                <View style={styles.ProgresBarCont}>
                    <View style={styles.ProgressBarTxt}>
                        <Text style={styles.ProgPerc}>{numForBar.fir}%</Text>
                        <Text style={styles.ProgTxt}>Chance of Winning</Text>
                        <Text style={styles.ProgPerc}>{numForBar.sec}%</Text>
                    </View>
                    <View style={ProgressBar}>
                        <View style={FailBar}></View>
                        <View style={SuccessBar}></View>
                    </View>

                </View>
            </View>
        )
    }

    const BetCards = () => {
        return (
            <View style={styles.BetCardCont}>
                <View style={styles.BetCardHead}>
                    <Text style={styles.BetTitle}>OUR PREDICTION</Text>
                </View>

                <View style={styles.SecBetBigCont}>

                    <View style={styles.TeamsBetLogosCont}>
                        <View style={styles.BetTeamCont}>
                            <View style={styles.TeamLogoCont}></View>
                            <Text style={styles.BetTeamNameTxt}>Dinamo</Text>
                            <View style={styles.BetCardGreenTxtCont}>
                                <StarIconFilled color={'#01AF70'} width={'10.55'} height={'10.15'} />
                                <Text style={styles.GreenBetTeamTxt}>Favorites to Win</Text>
                            </View>
                        </View>
                        <View style={styles.BetTeamCont}>
                            <View style={styles.BetUserImg}></View>
                            <Text style={styles.BetTeamNameTxt}>Torpedo</Text>
                            <Text style={styles.BetTeamTxt}>Torpedo</Text>
                        </View>
                    </View>


                    <TouchableOpacity style={styles.AddTeamBetBtn} onPress={() => {
                        if (numForBar.fir == '65') {
                            setNumForBar({ fir: '36', sec: '64' })
                        } else {
                            setNumForBar({ fir: '65', sec: '35' })
                        }
                    }
                    }>
                        <Text style={styles.AddBtnTxt}>BET NOW</Text>
                    </TouchableOpacity>


                </View>
            </View>
        )
    }




    const headerLeftAction = useMemo(
        () => ({
            onPress: navigation.goBack,
            iconName: "ArrowRight",
        }),
        [navigation.goBack],
    );






    return (
        <View style={styles.flex}>
            <Header title={'cricket betting tips'} leftAction={headerLeftAction} />
            <ScrollView contentContainerStyle={styles.Container}>
                <TeamCards />
                <BetCards />
                <View style={styles.BetScreenReviewCon}>
                    <Text style={styles.BetReaviewHead}>REVIEW</Text>
                    <Text style={styles.BetReaviewDescr}>
                        India is all geared up for the tour of Bangladesh and the second Test match on 22nd December 2022 at Shere Bangla National Stadium, Dhaka. India levelled up to the 2nd spot in the World Test Championship table after defeating Bangladesh in the first test, while Bangladesh still ranks 9th which is the last spot in the table. We expect an enthralling competition in both teams as the World Test Championship is ahead of them. Winning the second match can really benefit India as they have to win 5 of their 6 test matches to qualify for the Finals of the World Test Championship.
                    </Text>

                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    flex: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F2F2F2',
    },
    Container: {
        paddingVertical: 24,
        paddingHorizontal: 15,
        width: '100%',
    },
    CardCont: {
        width: 360,
        height: 202,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginBottom: 20,
        overflow: 'hidden',
    },
    BetCardCont: {
        width: 360,
        height: 246,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 15,
    },
    CardHead: {
        height: 46,
        borderBottomColor: '#EAEAEA',
        borderBottomWidth: 1,
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    LeftHead: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    RightHead: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    CupIconCont: {
        width: 26,
        height: 26,
        borderRadius: 50,
        borderColor: 'transparent',
        backgroundColor: '#FF0960',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    IconSvg: {
        color: 'white',
        width: 15,
        height: 15,
        tintColor: '#FFFFFF',
    },
    MatchHeadTxt: {
        fontFamily: 'Jost',
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 17,
        color: '#111315',
    },
    TimeTxt: {
        fontFamily: 'Jost',
        fontWeight: '600',
        fontSize: 11,
        lineHeight: 11,
        color: '#111315',
        marginBottom: 4,
    },
    DateTxt: {
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 11,
        lineHeight: 11,
        color: '#959595',
    },
    TeamsLogosCont: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    TeamsBetLogosCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    TeamCont: {
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    TeamLogoCont: {
        width: 50,
        height: 50,
        borderRadius: 20,
        backgroundColor: 'black',
    },
    BetUserImg: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'blue',
    },
    TeamNameTxt: {
        marginTop: 15.5,
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 13,
        lineHeight: 18.2,
        color: '#111315',
    },
    TeamVs: {
        fontFamily: 'Jost',
        fontWeight: '700',
        fontSize: 15,
        lineHeight: 21,
        color: '#111315',
    },
    SecTeamBigCont: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    SecBetBigCont: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    AddTeamBtn: {
        width: 330,
        height: 48,
        borderRadius: 6,
        backgroundColor: '#FF0960',
        alignItems: 'center',
        justifyContent: 'center',
    },
    AddTeamBetBtn: {
        width: 330,
        height: 48,
        borderRadius: 6,
        backgroundColor: '#FF0960',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    AddBtnTxt: {
        fontFamily: 'Jost',
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 19.6,
        textAlign: 'center',
        color: '#FFFFFF',
    },
    BetTitle: {
        fontFamily: 'Jost',
        fontWeight: '800',
        fontSize: 18,
        lineHeight: 19,
        textAlign: 'center',
        color: '#111315',
    },
    BetCardHead: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    BetTeamCont: {
        width: 160,
        height: 120,
        borderRadius: 6,
        borderColor: '#F0F0F0',
        borderWidth: 1,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    BetTeamNameTxt: {
        marginTop: 15.5,
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 13,
        lineHeight: 18.2,
        color: '#111315',
    },
    BetTeamTxt: {
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 13.2,
        color: '#959595',
    },
    GreenBetTeamTxt: {
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 13.2,
        color: '#01AF70',
        marginLeft: 4,
    },
    BetCardGreenTxtCont: {
        flexDirection: 'row',
    },
    BetScreenReviewCon: {
        justifyContent: 'flex-start',
        marginVertical: 16,
    },
    BetReaviewHead: {
        fontFamily: 'Jost',
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 25.2,
        color: '#111315',
    },
    BetReaviewDescr: {
        fontFamily: 'Jost',
        fontWeight: '400',
        fontSize: 15,
        lineHeight: 21,
        color: '#111315',
        marginVertical: 8,
    },
    ProgressBarTxt: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 22,
        paddingVertical: 12,
    },
    ProgPerc: {
        fontFamily: 'Jost',
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 19.6,
        color: '#111315',
    },
    ProgTxt: {
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 13,
        lineHeight: 18.2,
        color: '#111315',
    },







});
