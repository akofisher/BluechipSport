import { Header } from 'components/header'
import React, { useMemo, useState } from 'react'
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import { API } from 'services'
import { cxs } from 'styles'
import { NewsVerticalList } from '../../components/NewsVerticalList/NewsVerticalList'
import stadium from "../../../assets/icons/play.png";
import { ArrowDownSvg, PlayedTimeSvg } from '../../../assets/svgs/AllSvgs'


//https://www.npmjs.com/package/react-clamp-lines   თაითლებისთვის ...

const TeamScreen = ({ navigation }) => {
    const [activeC, setActiveC] = useState(0)
    const [failedTeam, setFailedTeam] = useState(0)
    const IDS = [1, 2, 3, 4, 5, 6]
    const SQ = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    const actClas = {
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 13,
        lineHeight: 15,
        color: '#FF0960',
    }

    const TeamScoresFail = {
        fontFamily: 'Jost',
        fontWeight: '600',
        fontSize: 15,
        lineHeight: 21,
        color: '#111315',
        opacity: 0.4,
    }

    const actBtn = {
        height: '100%',
        marginRight: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#FF0960',
    }

    const headerLeftAction = useMemo(
        () => ({
            onPress: navigation.goBack,
            iconName: "ArrowRight",
        }),
        [navigation.goBack],
    );

    const Results = ({ id }) => {
        return (
            <View style={styles.TeamResultsCont}>
                <Text style={styles.TeamResDate}>Sunday, May 29 2022</Text>
                <View style={styles.TeamResCont}>
                    <View style={styles.PStatsHeadCont}>

                        <Text style={styles.PStatsHead}>
                            {id} - Final, Indian Premier League, 2022
                        </Text>
                    </View>

                    <View style={styles.TeamRes}>
                        <View style={styles.Team}>
                            <View style={styles.Team}>
                                <View style={styles.TeamLogo}></View>
                                <Text style={styles.TeamName}>Gujarat Titaniki</Text>
                            </View>
                            <Text style={styles.TeamScores}>133/3 (18.1)</Text>
                        </View>
                        <View style={styles.Team}>
                            <View style={styles.Team}>
                                <View style={styles.TeamLogo}></View>
                                <Text style={styles.TeamName}>Rajastan Royals</Text>
                            </View>
                            <Text style={failedTeam == 0 ? TeamScoresFail : styles.TeamScores}>130/9 (20.0)</Text>
                        </View>

                    </View>
                    <View style={styles.PStatsBottomCont}>

                        <Text style={styles.PStatsBottom}>
                            Gujarat Titans beet Rajasthan Royals by 7 wickets
                        </Text>
                    </View>

                </View>
            </View>
        )
    }

    const Cards = ({ id }) => {
        return (
            <TouchableOpacity style={styles.NewsCards}>
                <View style={styles.NewsCardImg}></View>
                <View style={styles.NewsCardTxtCont}>
                    <Text style={styles.NewsCardTitle}>{id} - Infantino announces 32-team Club World Cup which will take place in 2025</Text>
                    <Text style={styles.NewsCardTxt}>19 Dec 2022, 15:31</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const Squad = ({ sq }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('PlayerScreen')} style={styles.TeamSquadCont}>
                <View style={styles.SquadImg}></View>
                <View style={styles.SquadTxtCont}>
                    <Text style={styles.SquadName}>Hilton Jogoriskuas</Text>
                    <Text style={styles.SquadSecTxt}>{sq} - Squad</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const Shedules = ({ id }) => {
        return (
            <View style={styles.TeamShedulesCont}>
                <Text style={styles.TeamResDate}>Sunday, May 29 2022</Text>
                <View style={styles.TeamScheduleResCont}>
                    <View style={styles.PStatsHeadContSch}>

                        <Text style={styles.PStatsHead}>
                            {id} - 3rd ODI, Sri Lanka in India, 3 ODI Series, 2023
                        </Text>
                    </View>

                    <View style={styles.TeamScheduleRes}>
                        <View style={styles.TeamSchedule}>

                            <View style={styles.TeamLogo}></View>
                            <Text style={styles.TeamName}>Gujarat Titaniki</Text>


                        </View>
                        <View style={styles.TeamSchedule}>

                            <View style={styles.TeamLogo}></View>
                            <Text style={styles.TeamName}>Rajastan Royals</Text>

                        </View>

                    </View>
                    <View style={styles.PStatsBottomContSch}>
                        <View style={styles.ScheduleTimeCont}>
                            <PlayedTimeSvg width={12} height={12} color={'#FF0960'} />
                            <Text style={styles.SchedulesBottomTime}>
                                01:30
                            </Text>
                        </View>
                        <Text style={styles.SchedulesBottomStadium}>
                            Greenfield International Stadium, Thiruvananthapuram
                        </Text>
                    </View>

                </View>
            </View>
        )
    }


    return (
        <View style={styles.flex}>
            <Header title={'TEAM'} leftAction={headerLeftAction} />
            <View style={styles.PScreenHead}>
                <View style={styles.PlayerImg}></View>
                <Text style={styles.PlayerName}>Gujarat Titans</Text>
                {/* <ImageBackground style={styles.bgStadiumContainer} source={stadium}></ImageBackground> */}
            </View>
            <View style={styles.PScreenNav}>
                <TouchableOpacity style={activeC == 0 ? actBtn : styles.NavBtn} onPress={() => {
                    setActiveC(0)
                }}>
                    <Text style={activeC == 0 ? actClas : styles.NavBtnTxt}>NEWS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={activeC == 1 ? actBtn : styles.NavBtn} onPress={() => {
                    setActiveC(1)
                }}>
                    <Text style={activeC == 1 ? actClas : styles.NavBtnTxt}>SQUAD</Text>
                </TouchableOpacity>
                <TouchableOpacity style={activeC == 2 ? actBtn : styles.NavBtn} onPress={() => {
                    setActiveC(2)
                }}>
                    <Text style={activeC == 2 ? actClas : styles.NavBtnTxt}>RESULTS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={activeC == 3 ? actBtn : styles.NavBtn} onPress={() => {
                    setActiveC(3)
                }}>
                    <Text style={activeC == 3 ? actClas : styles.NavBtnTxt}>SHEDULES</Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.PScreenContent}>
                {activeC == 0 ? IDS.map((id, idx) => {
                    return (
                        <Cards id={id} key={idx} />
                    )
                }) : null}
                {activeC == 1 ? (
                    SQ.map((val, idx) => {
                        return (

                            <Squad sq={val} key={idx} />
                        )
                    })
                ) : null}
                {activeC == 2 ? (
                    IDS.map((val, idx) => {
                        return (

                            <Results key={idx} id={val} />
                        )
                    })
                ) : (
                    null
                )}
                {activeC == 3 ? (
                    IDS.map((val, idx) => {
                        return (
                            <Shedules key={idx} id={val} />

                        )
                    })
                ) : (
                    null
                )}
            </ScrollView>

        </View>
    )
}

export default TeamScreen

const styles = StyleSheet.create({
    flex: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F2F2F2',
    },
    PScreenHead: {
        width: '100%',
        height: 139,
        backgroundColor: 'rgba(16, 25, 33, 0.77)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bgStadiumContainer: {
        flex: 1,
        resizeMode: "cover",
        paddingHorizontal: 10,
        borderRadius: 20,
        overflow: "hidden",
    },
    PlayerImg: {
        width: 70,
        height: 70,
        borderRadius: 50,
        backgroundColor: 'blue',
    },
    PlayerName: {
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 18,
        lineHeight: 25.2,
        color: '#FFFFFF',
    },
    PScreenNav: {
        width: '100%',
        height: 52,
        backgroundColor: '#101921',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 26,
    },
    NavBtn: {
        height: '100%',
        marginRight: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    NavBtnTxt: {
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 13,
        lineHeight: 14,
        color: '#FFFFFF',
    },
    PScreenContent: {
        padding: 15,
    },
    //New Content
    NewsCards: {
        width: 360,
        height: 81,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        marginBottom: 22,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    NewsCardImg: {
        width: 124,
        height: '100%',
        backgroundColor: 'gray',
    },
    NewsCardTxtCont: {
        paddingHorizontal: 5,
        paddingVertical: 7,
    },
    NewsCardTitle: {
        width: 219,
        height: 37,
        fontFamily: 'Jost',
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 16.8,
        color: '#111315',
        marginBottom: 16,
    },
    NewsCardTxt: {
        fontFamily: 'Jost',
        fontWeight: '400',
        fontSize: 10,
        lineHeight: 11,
        color: '#959595',
    },    //New Content
    //Squad
    TeamSquadCont: {
        width: 360,
        height: 66,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        marginBottom: 8,
        flexDirection: 'row',
        padding: 12,
    },
    SquadImg: {
        width: 42,
        height: 42,
        borderRadius: 50,
        backgroundColor: 'black',
        marginRight: 15,
    },
    SquadTxtCont: {

    },
    SquadName: {
        fontFamily: 'Jost',
        fontWeight: '600',
        fontSize: 15,
        lineHeight: 21,
        color: '#111315',
    },
    SquadSecTxt: {
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 16.8,
        color: '#959595',
    },
    //Squad
    //Shedules
    TeamShedulesCont: {
        borderRadius: 8,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 15,
    },
    TeamScheduleResCont: {
        width: 360,
        height: 191,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
    },
    PStatsHeadContSch: {
        width: '100%',
        height: 44,
        backgroundColor: '#3555FF',
        paddingVertical: 14,
        paddingHorizontal: 15,
        borderTopStartRadius: 8,
        borderTopRightRadius: 8,


    },
    PStatsBottomContSch: {
        width: '100%',
        height: 44,
        justifyContent: 'flex-start',
        paddingHorizontal: 13,
    },
    TeamScheduleRes: {
        margin: 15,
        borderBottomColor: '#EAEAEA',
        borderBottomWidth: 1,

    },
    TeamSchedule: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    ScheduleTimeCont: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    SchedulesBottomTime: {
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 13,
        lineHeight: 18.2,
        color: '#FF0960',
        marginLeft: 6,
    },
    SchedulesBottomStadium: {
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 13,
        lineHeight: 18.2,
        color: '#959595',
    },
    //Shedules
    //Results
    TeamResultsCont: {
        borderRadius: 8,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 15,
    },
    TeamResDate: {
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 13,
        lineHeight: 18.2,
        color: '#111315',
        marginBottom: 8,
    },
    PStatsHeadCont: {
        width: '100%',
        height: 54,
        backgroundColor: '#3555FF',
        paddingTop: 13,
        paddingHorizontal: 15,
        justifyContent: 'center',
    },
    PStatsHead: {
        width: '100%',
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 13,
        lineHeight: 18.2,
        color: '#FFFFFF',
    },
    PStatsBottom: {
        width: '100%',
        height: 44,
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 13,
        lineHeight: 18.2,
        color: '#FF0960',
    },
    PStatsBottomCont: {
        width: '100%',
        height: 44,
        justifyContent: 'flex-start',
        paddingHorizontal: 13,
    },

    TeamResCont: {
        width: 360,
        height: 167,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
    },
    TeamRes: {
        margin: 15,
        borderBottomColor: '#EAEAEA',
        borderBottomWidth: 1,
    },
    Team: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    TeamLogo: {
        width: 24,
        height: 24,
        borderRadius: 50,
        backgroundColor: 'black',
        marginBottom: 8,
        marginRight: 10,
    },
    TeamName: {
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 15,
        lineHeight: 21,
        color: '#111315',
    },
    TeamScores: {
        fontFamily: 'Jost',
        fontWeight: '600',
        fontSize: 15,
        lineHeight: 21,
        color: '#111315',
    },



    //Results

})
