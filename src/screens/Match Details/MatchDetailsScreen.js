import { Header } from 'components/header'
import React, { useMemo, useState, useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Image } from 'react-native'
import { API } from 'services'
import { cxs } from 'styles'
import { NewsVerticalList } from '../../components/NewsVerticalList/NewsVerticalList'
import stadium from "../../../assets/icons/play.png";
import { ArrowDownSvg, PlayedTimeSvg } from '../../../assets/svgs/AllSvgs'
import ScoreCard from './ScoreCard'
import { getMatchDetails, getMatchLineUps } from '../../../api/livescore'
import { Spinner } from '../../components/common'
import bg from '../../../assets/bg.png';


//https://www.npmjs.com/package/react-clamp-lines   თაითლებისთვის ...

const MatchDetailsScreen = ({ route, navigation }) => {
    const { MatchId, Scores } = route.params;
    const [activeC, setActiveC] = useState(1)
    const [matchInfo, setMatchInfo] = useState()
    const [loading, setLoading] = useState(true)
    const [lineUps, setLineUps] = useState()
    const [Home, setHome] = useState()
    const [Away, setAway] = useState()
    const [homeTeamScore, setHomeTeamScore] = useState()
    const [awayTeamScore, setAwayTeamScore] = useState()

    const removeAllSymbols = (string) => {
        const letters = string?.replace(/[^a-zA-Z0-9 ]/g, ' ');

        return letters
    };


    const HomeTeamScores = () => {
        Scores?.map((v, idx) => {
            if (
                v.type == 'total' &&
                matchInfo?.home_team?.id == v.team_id &&
                v.total > 0
            ) {
                return (
                    setHomeTeamScore(`${v?.total}/${v?.wickets}`)
                )
            }
        })
    }

    const AwayTeamScores = () => {
        Scores?.map((v, idx) => {
            if (
                v.type == 'total' &&
                matchInfo?.away_team?.id == v.team_id &&
                v.total > 0
            ) {
                return (
                    setAwayTeamScore(`${v?.total}/${v?.wickets}`)
                )
            }
        })
    }

    useEffect(() => {
        HomeTeamScores()
        AwayTeamScores()
    }, [MatchId, Scores, matchInfo])

    const Runs = [2, 2, 0, 1, '1w', 0, 6]
    const Player = [
        {
            name: 'Thomas Shelby',
            point: 20,
            number: 15
        },
        {
            name: 'John Shelby',
            point: 23,
            number: 11
        },
        {
            name: 'Erick Shelby',
            point: 27,
            number: 8
        },

    ]
    const LinesP = [
        {
            name: 'Thomas Shelby',
            mich: 'kuznetsa',
        },
        {
            name: 'Thomas asda',
            mich: 'fashata',
        },
        {
            name: 'Thomas trelo',
            mich: 'drakoni',
        },
        {
            name: 'Thomas maqmani',
            mich: 'trakoni',
        },
        {
            name: 'Thomas mechurchle',
            mich: 'elfi',
        },
        {
            name: 'Thomas gandegili',
            mich: 'goblini',
        },
        {
            name: 'Thomas mamao',
            mich: 'moroshkina',
        },
        {
            name: 'Thomas maqmani',
            mich: 'trakoni',
        },
        {
            name: 'Thomas mechurchle',
            mich: 'elfi',
        },
        {
            name: 'Thomas gandegili',
            mich: 'goblini',
        },
        {
            name: 'Thomas mamao',
            mich: 'moroshkina',
        },


    ]


    useEffect(() => {
        setLoading(true)
        getMatchDetails(MatchId)
            .then(data => {
                // console.log(data, 'MATCH DATA')
                setMatchInfo(data.results)
                setHome(data.results.home_team.id)
                setAway(data.results.away_team.id)
                // console.log(data.results.scoreboards[0], 'name')
            })
            .then(() => setLoading(false));
    }, [MatchId]);

    useEffect(() => {
        setLoading(true)
        getMatchLineUps(MatchId)
            .then(data => {

                setLineUps(data.results.lineups)

            })
            .then(() => setLoading(false));
    }, [MatchId]);

    console.log(matchInfo?.status, 'STATUS')

    const actClas = {
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 13,
        lineHeight: 15,
        color: '#FF0960',
    }
    const GreenRuns = {
        width: 18,
        height: 18,
        backgroundColor: '#01AF70',
        marginRight: 6,
        borderRadius: 50,
        justifyContent: 'center',
        alignContent: 'center',
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


    const LiveBtn = () => {
        return (
            <TouchableOpacity style={styles.LiveCont}>
                <View style={styles.LiveDot}></View>
                <Text style={styles.LiveTxt}>LIVE</Text>
            </TouchableOpacity>
        )
    }

    const MatchInfo = () => {
        return (
            <View style={styles.PlayerBioCont}>
                {LinesP.map((val, idx) => {
                    return (
                        <View style={styles.BioConts} key={idx}>
                            <Text style={styles.BioDesc}>{val.mich}</Text>
                            <Text style={styles.BioInfo}>{val.name}</Text>
                        </View>

                    )
                })}
            </View>
        )
    }

    const Live = () => {
        return (
            <View style={styles.LiveScreenCont}>
                <View style={styles.LiveVideoCont}>
                    <View style={styles.LiveVideo}></View>
                </View>
                <View style={styles.LiveDetailsCont}>
                    <View style={styles.LiveScoreTxtCont}>
                        <View style={styles.LiveScoreTxtContSec}>
                            <Text style={styles.OversTxt}>OVERS:</Text>
                            <Text style={styles.PointTxt}>7</Text>
                        </View>
                        <View style={styles.LiveScoreTxtContSec}>
                            <Text style={styles.OversTxt}>SCORE:</Text>
                            <Text style={styles.PointTxt}>60/1</Text>
                        </View>
                    </View>

                    <View style={styles.LiveRunCont}>
                        <View style={styles.RunsCont}>
                            {Runs.map((val, idx) => {
                                return (
                                    <TouchableOpacity style={Runs.length - 1 == idx ? GreenRuns : styles.Runs}>

                                        <Text style={styles.RunsTxt} key={idx}>{val}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                        <View style={styles.TotalRunsCont}>
                            <Text style={styles.PointTxt}>12</Text>
                            <Text style={styles.OversTxt}>RUNS</Text>
                        </View>
                    </View>

                    <View style={styles.PlayersPointCont}>
                        <View style={styles.PlayersLeftCont}>
                            {Player.map((val, idx) => {
                                if (idx % 2 == 0)
                                    return (
                                        <View key={idx} style={styles.PlayerCont}>
                                            <Text style={styles.PlayerName}>{val.name}</Text>
                                            <View style={styles.LiveScoreTxtContSec}>
                                                <Text style={styles.PlayerPoint}>{val.point}</Text>
                                                <Text style={styles.PlayerNumber}>({val.number})</Text>
                                            </View>
                                        </View>
                                    )
                            })}
                        </View>
                        <View style={styles.PlayersRightCont}>
                            {Player.map((val, idx) => {
                                if (idx % 2 == 1)
                                    return (
                                        <View key={idx} style={styles.PlayerCont}>
                                            <Text style={styles.PlayerName}>{val.name}</Text>
                                            <View style={styles.LiveScoreTxtContSec}>
                                                <Text style={styles.PlayerPoint}>{val.point}</Text>
                                                <Text style={styles.PlayerNumber}>({val.number})</Text>
                                            </View>
                                        </View>
                                    )
                            })}
                        </View>
                    </View>
                    <View style={styles.InformationCont}>
                        <View style={styles.InformationLeftCont}>
                            <Text style={styles.PointTxt}>6.6</Text>
                            <TouchableOpacity style={GreenRuns}>

                                <Text style={styles.RunsTxt} >6</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.InformationRightCont}>
                            <Text style={styles.DetailsBigTxt}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                molestiae quas vel sint commodi repudiandae consequuntur voluptatum Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                molestiae quas vel sint commodi repudiandae consequuntur voluptatum Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                molestiae quas vel sint commodi repudiandae consequuntur voluptatum</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    const LineUps = () => {
        return (
            <View style={styles.LineUpsCont}>
                <View style={styles.LineUpsTeamsCont}>
                    <View style={styles.LineUpsTeam}>
                        <Image
                            style={styles.LineUpsTeamLogo}
                            source={{
                                uri: `${matchInfo?.home_team?.image_path}`,
                            }}
                        />
                        <Text style={styles.LineUpsTeamName}>{matchInfo?.home_team?.name}</Text>
                    </View>
                    <Text style={styles.LineUpsVs}>VS</Text>
                    <View style={styles.LineUpsTeam}>
                        <Text style={styles.LineUpsTeamName}>{matchInfo?.away_team?.name}</Text>
                        <Image
                            style={styles.LineUpsTeamLogo}
                            source={{
                                uri: `${matchInfo?.away_team?.image_path}`,
                            }}
                        />
                    </View>
                </View>
                <View style={styles.PlayersListCont}>
                    <View style={styles.LeftPlayers}>
                        {loading == false && lineUps?.map((val, idx) => {
                            if (val.team_id == Home)
                                return (
                                    <TouchableOpacity onPress={() => navigation.navigate('PlayerScreen', {
                                        Id: val.player.id,
                                    })} style={styles.PlayerContL} key={idx}>
                                        <Text style={styles.PlayerLName}>{val.player.firstname} {val.player.lastname}</Text>
                                        <Text style={styles.PlayerRangL}>{val.position.name}</Text>
                                    </TouchableOpacity>
                                )
                        })}
                    </View>
                    <View style={styles.RightPlayers}>
                        {loading == false && lineUps?.map((val, idx) => {
                            if (val.team_id == Away)
                                return (
                                    <TouchableOpacity onPress={() => navigation.navigate('PlayerScreen', {
                                        Id: val.player.id,
                                    })} style={styles.PlayerContL} key={idx}>
                                        <Text style={styles.PlayerLName}>{val.player.firstname} {val.player.lastname}</Text>
                                        <Text style={styles.PlayerRang}>{val.position.name}</Text>
                                    </TouchableOpacity>
                                )
                        })}
                    </View>


                </View>
            </View>
        )
    }

    // const ScoreCard = ({ id }) => {
    //     return (
    //         <View style={styles.ScoreCardCont}>

    //         </View>
    //     )
    // }


    return (
        <View style={styles.flex}>
            <Header title={'MATCH DETAILS'} leftAction={headerLeftAction} />
            <ImageBackground source={bg} style={styles.HeaderCont}>
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        <View style={styles.PScreenHead}>
                            <Image
                                style={styles.PlayerImg}
                                source={{
                                    uri: `${matchInfo?.home_team?.image_path}`,
                                }}
                            />

                            <Text style={styles.TeamName}>{matchInfo?.home_team?.name}</Text>
                            {/* <ImageBackground style={styles.bgStadiumContainer} source={stadium}></ImageBackground> */}
                        </View>
                        <View style={styles.PScreenHead}>
                            <LiveBtn />
                            <Text style={styles.MatchPoints}>{Scores?.status == 'INNINGS_BREAK' ||
                                Scores?.status !== 'NOT_STARTED' ? (
                                homeTeamScore || '-'
                            ) : (null)
                            } : {Scores?.status == 'INNINGS_BREAK' ||
                                Scores?.status !== 'NOT_STARTED' ? (
                                awayTeamScore || '-'
                            ) : (null)
                                }</Text>
                            <Text style={styles.MatchDetTxt}>{removeAllSymbols(matchInfo?.status)}</Text>
                        </View>
                        <View style={styles.PScreenHead}>
                            <Image
                                style={styles.PlayerImg}
                                source={{
                                    uri: `${matchInfo?.away_team?.image_path}`,
                                }}
                            />
                            <Text style={styles.TeamName}>{matchInfo?.away_team?.name}</Text>
                            {/* <ImageBackground style={styles.bgStadiumContainer} source={stadium}></ImageBackground> */}
                        </View>
                    </>
                )}


            </ImageBackground>
            <View style={styles.PScreenNav}>
                {/* <TouchableOpacity style={activeC == 0 ? actBtn : styles.NavBtn} onPress={() => {
                    setActiveC(0)
                }}>
                    <Text style={activeC == 0 ? actClas : styles.NavBtnTxt}>LIVE</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={activeC == 1 ? actBtn : styles.NavBtn} onPress={() => {
                    setActiveC(1)
                }}>
                    <Text style={activeC == 1 ? actClas : styles.NavBtnTxt}>LINEUPS</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={activeC == 2 ? actBtn : styles.NavBtn} onPress={() => {
                    setActiveC(2)
                }}>
                    <Text style={activeC == 2 ? actClas : styles.NavBtnTxt}>MATCH INFO</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={activeC == 3 ? actBtn : styles.NavBtn} onPress={() => {
                    setActiveC(3)
                }}>
                    <Text style={activeC == 3 ? actClas : styles.NavBtnTxt}>SCORECARD</Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.PScreenContent}>
                {/* {activeC == 0 ? (
                    <Live />
                ) : null} */}
                {activeC == 1 ? (
                    <LineUps />
                ) : null}
                {/* {activeC == 2 ? (
                    <MatchInfo />
                ) : null} */}
                {activeC == 3 ? (
                    <ScoreCard navigation={{ route, navigation, matchInfo, MatchId }} />
                ) : null}
            </ScrollView>

        </View>
    )
}

export default MatchDetailsScreen

const styles = StyleSheet.create({
    flex: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F2F2F2',
    },
    PScreenHead: {
        width: '33.3%',
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
    },
    TeamName: {
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 15,
        lineHeight: 21,
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
    HeaderCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: 139,

    },
    MatchPoints: {
        fontFamily: 'Jost',
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 25.2,
        color: '#FFFFFF',
    },
    MatchDetTxt: {
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 16.8,
        color: '#FF0960',
    },
    //LIVE
    LiveCont: {
        width: 46,
        height: 17,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        marginBottom: 10,
    },
    LiveDot: {
        width: 5,
        height: 5,
        borderRadius: 50,
        backgroundColor: '#FF0960',
        marginRight: 5,
    },
    LiveTxt: {
        fontFamily: 'Jost',
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 16.8,
        color: 'rgba(255, 9, 96, 1)',
    },
    //LIVE
    //LIVE SCREEN
    LiveVideoCont: {
        width: 360,
        height: 200,
        borderRadius: 6,
        backgroundColor: 'gray',
        marginBottom: 21,
    },
    LiveDetailsCont: {
        width: 360,
        borderRadius: 6,
        backgroundColor: '#FFFFFF',
        paddingVertical: 14,
    },

    LiveScoreTxtCont: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
    },
    LiveScoreTxtContSec: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    OversTxt: {
        fontFamily: 'Jost',
        fontWeight: '600',
        fontSize: 11,
        lineHeight: 15.4,
        color: '#959595',
    },
    PointTxt: {
        fontFamily: 'Jost',
        fontWeight: '600',
        fontSize: 15,
        lineHeight: 21,
        color: '#111315',
        marginLeft: 5,
        marginRight: 8,
    },
    LiveRunCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 13,
        marginTop: 11,
        paddingHorizontal: 14,
    },
    RunsCont: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    Runs: {
        width: 18,
        height: 18,
        backgroundColor: '#EAEAEA',
        marginRight: 6,
        borderRadius: 50,
        justifyContent: 'center',
        alignContent: 'center',
    },
    RunsTxt: {
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 10,
        textAlign: 'center',
        color: '#111315',
    },
    TotalRunsCont: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    PlayersPointCont: {
        width: '100%',
        height: 54,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopColor: '#EAEAEA',
        borderTopWidth: 1,
        borderBottomColor: '#EAEAEA',
        borderBottomWidth: 1,
    },
    PlayersLeftCont: {
        width: '50%',
        height: '100%',
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    PlayersRightCont: {
        width: '50%',
        height: '100%',
        borderLeftColor: '#EAEAEA',
        borderLeftWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    PlayerCont: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        justifyContent: 'space-between',
    },
    PlayerName: {
        fontFamily: 'Jost',
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 17,
        color: '#111315',
    },
    PlayerPoint: {
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 17,
        color: '#111315',
        marginRight: 3,
    },
    PlayerNumber: {
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 10,
        lineHeight: 14,
        color: '#959595',
    },
    InformationCont: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 15,
    },
    DetailsBigTxt: {
        fontFamily: 'Jost',
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 14,
        color: '#111315',
        marginLeft: 15,
    },
    InformationLeftCont: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '15%',
    },
    InformationRightCont: {
        width: '85%',
    },
    //LIVE SCREEN
    //LINEUPS
    LineUpsCont: {
        width: 360,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingHorizontal: 15,
    },
    LineUpsTeamLogo: {
        width: 25,
        height: 25,
        borderRadius: 50,
    },
    LineUpsTeamsCont: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 22,
        width: '100%',
    },
    LineUpsTeam: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '42%',
        justifyContent: 'space-between',
    },
    LineUpsTeamName: {
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 13,
        lineHeight: 18.2,
        color: '#111315',
    },
    LineUpsVs: {
        fontFamily: 'Jost',
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 16.8,
        color: '#111315',
    },
    PlayersListCont: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    LeftPlayers: {
        width: '50%',
        alignItems: 'flex-start',
    },
    RightPlayers: {
        width: '50%',
        alignItems: 'flex-end',
        borderLeftColor: '#EAEAEA',
        borderLeftWidth: 1,
    },
    PlayerContL: {},
    PlayerLName: {
        fontFamily: 'Jost',
        fontWeight: '600',
        fontSize: 13,
        lineHeight: 18.2,
        color: '#111315',
        textDecorationStyle: 'solid',
        textDecorationColor: '#111315',
        textDecorationLine: 'underline',
        paddingTop: 10,

    },
    PlayerRangL: {
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 16.8,
        color: '#959595',
    },
    PlayerRang: {
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 16.8,
        color: '#959595',
        textAlign: 'right',
    },
    //LINEUPS
    //MATCH INFO
    PlayerBioCont: {
        width: 360,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
    },
    BioConts: {
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderBottomColor: '#EAEAEA',
        borderBottomWidth: 1,
    },
    BioDesc: {
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 16.8,
        color: '#959595',
    },
    BioInfo: {
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 15,
        lineHeight: 21.68,
        color: '#111315',
    },
    //MATCH INFO

})
