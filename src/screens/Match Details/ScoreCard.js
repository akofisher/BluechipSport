import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getScoresForScoreCard } from '../../../api/livescore'
import { Spinner } from '../../components/common'

export default function ScoreCard({ navigation }) {
    const IDSS = ['4-166', '19.2']
    const IDS = [4, 0, 31, 3, 7.8, 0]
    const ID = [12, 15, 1, 3, 185]
    const SQL = ['OV', 'M', 'R', 'W', 'ECO', 'EXT']
    const SQ = ['R', 'B', '4s', '6s', 'SR']
    const SQLL = ['SCORE', 'OVER']
    const [activeTeam, setActiveTeam] = useState(0)
    const [bowlings, setBowlings] = useState()
    const [battings, setBattings] = useState()
    const [home, setHome] = useState()
    const [away, setAway] = useState()
    const [HomeScores, setHomeScores] = useState()
    const [AwayScores, setAwayScores] = useState()
    const [loading, setLoading] = useState(true)
    const [status, setStatus] = useState(false)

    function check(element) {
        if (Number.isInteger(element)) {
            return element;
        }
        return element.toFixed(2);
    }

    const activeCont = {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        height: 48,
        borderBottomColor: '#FF0960',
        borderBottomWidth: 2,
    }

    const activeName = {
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 16.8,
        color: '#FF0960',
        marginLeft: 10,
    }

    useEffect(() => {
        setLoading(true)
        getScoresForScoreCard(navigation.MatchId)
            .then(async data => {
                await setHome(data?.results?.home_team_id)
                await setAway(data?.results?.away_team_id)
                await setBowlings(data?.results?.bowlings)
                await setBattings(data?.results?.battings)
                data?.results?.scoreboards.map((val) => {
                    if (data?.results?.home_team_id == val.team_id && val.type == 'total')
                        setHomeScores({
                            total: val.total,
                            overs: val.overs,
                            wickets: val.wickets
                        })
                })
                data?.results?.scoreboards.map((val) => {
                    if (data?.results?.away_team_id == val.team_id && val.type == 'total')
                        setAwayScores({
                            total: val.total,
                            overs: val.overs,
                            wickets: val.wickets
                        })
                })
                if (data?.results?.status !== 'NOT_STARTED')
                    setStatus(true)

            })
            .then(() => {
                setLoading(false)
            })

    }, [])



    const TotalScores = () => {
        return (
            <>
                <View style={styles.FlexibleHeadCont}>
                    <Text style={styles.HeaderOfTables}>Total Score</Text>
                    <View style={styles.FlexibleHead}>
                        <Text style={styles.HeaderOfTables}>{activeTeam == 0 ? HomeScores?.total : AwayScores?.total}</Text>
                        <Text style={styles.HeaderPoint}>{activeTeam == 0 ? (`/${HomeScores?.wickets}(${HomeScores?.overs})`) : (`/${AwayScores?.wickets}(${AwayScores?.overs})`)}</Text>

                    </View>
                </View>
                <View style={styles.TablesMain}>
                    <View style={styles.TablesHeadCont}>
                        <Text style={styles.TablesMainHead}>
                            Batter
                        </Text>
                        <View style={styles.HeadsCont}>

                            {SQ.map((id, idx) => {
                                return (
                                    <Text key={idx} style={styles.TablesHead}>
                                        {id}
                                    </Text>
                                )
                            })}
                        </View>
                    </View>
                    {battings?.map((val, idx) => {
                        if (activeTeam == 0 && home == val.team_id || activeTeam == 1 && away == val.team_id)
                            return (
                                <TouchableOpacity key={idx + 1} onPress={() => navigation.navigate('TeamScreen')} style={styles.TablTeamCont}>
                                    {/* ID.length - 1 == idx ? styles.TotalTeamCont :  */}
                                    <View style={styles.PlayerContL} >
                                        <Text style={styles.PlayerLName}>{val.player.firstname} {val.player.lastname}</Text>
                                        {/* <Text style={ID.length - 1 == idx ? styles.PlayerRangLPink : styles.PlayerRangL}>Fanatikosi</Text> */}
                                    </View>
                                    <View style={styles.HeadsCont}>

                                        <Text style={styles.TablesCoinBold}>
                                            {val.rate}
                                        </Text>

                                        <Text style={styles.TablesCoin}>
                                            {val.ball}
                                        </Text>
                                        <Text style={styles.TablesCoin}>
                                            {check(val.four_x)}
                                        </Text>
                                        <Text style={styles.TablesCoin}>
                                            {check(val.six_x)}
                                        </Text>
                                        <Text style={styles.TablesCoin}>
                                            {check(val.score)}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                    })}
                    <View style={styles.TablTeamCont}>

                        <Text style={styles.Extras}>EXTRAS</Text>

                        <View style={styles.HeadsCont}>

                            <Text style={styles.TablesCoinBold}>
                                0
                            </Text>
                            <Text style={styles.ExtraLightTxt}>
                                (b 1, lb 1, nb 0, w 8)
                            </Text>

                        </View>
                    </View>

                    <View style={styles.GreenCont}>


                        <View style={styles.GreenTxtCont}>

                            <Text style={styles.Totals}>TOTALS</Text>
                            <Text style={styles.TotalsLightTxt}>
                                ({activeTeam == 0 ? HomeScores?.overs : AwayScores?.overs} OV)

                            </Text>

                        </View>

                        <View style={styles.GreenTxtCont}>

                            <Text style={styles.Totals}>
                                {activeTeam == 0 ? HomeScores?.total : AwayScores?.total}
                            </Text>
                            <Text style={styles.TotalsLightTxt}>
                                /{activeTeam == 0 ? HomeScores?.wickets : AwayScores?.wickets}
                            </Text>

                        </View>
                    </View>
                    {/* <View style={styles.BioConts} >
                        <Text style={styles.BioDesc}>Did not bat</Text>
                        <Text style={styles.BioInfo}>Joe Clarke, Nathan Coulter-Nile, Luke Wood </Text>
                    </View> */}


                </View>
            </>
        )
    }


    const FallOfWickets = () => {
        return (
            <>
                <Text style={styles.HeaderOfTables}>Fall of Wickets</Text>
                <View style={styles.TablesMain}>
                    <View style={styles.TablesHeadCont}>
                        <Text style={styles.TablesMainHead}>
                            NAME
                        </Text>
                        <View style={styles.HeadsCont}>

                            {SQLL.map((id, idx) => {
                                return (
                                    <Text key={idx} style={styles.TablesHeadWick}>
                                        {id}
                                    </Text>
                                )
                            })}
                        </View>
                    </View>
                    {IDSS.map((id, idx) => {
                        return (
                            <TouchableOpacity key={idx + 1} onPress={() => navigation.navigate('TeamScreen')} style={styles.TablTeamCont}>
                                <Text style={styles.TablesTeam}>
                                    John Clark
                                </Text>
                                <View style={styles.HeadsCont}>

                                    {IDSS.map((id, idx) => {
                                        return (
                                            <Text key={idx} style={styles.TablesCoinWick}>
                                                {id}
                                            </Text>
                                        )
                                    })}
                                </View>
                            </TouchableOpacity>
                        )
                    })}


                </View>
            </>
        )
    }

    const Bowlers = () => {
        return (
            <>
                <Text style={styles.HeaderOfTables}>Bowlers</Text>
                <View style={styles.TablesMain}>
                    <View style={styles.TablesHeadCont}>
                        <Text style={styles.TablesMainHead}>
                            Name
                        </Text>
                        <View style={styles.HeadsCont}>

                            {SQL.map((id, idx) => {
                                return (
                                    <Text key={idx} style={styles.TablesHead}>
                                        {id}
                                    </Text>
                                )
                            })}
                        </View>
                    </View>
                    {bowlings?.map((val, idx) => {
                        if (activeTeam == 0 && home == val.team_id || activeTeam == 1 && away == val.team_id)
                            return (
                                <TouchableOpacity key={idx + 1} onPress={() => navigation.navigate('TeamScreen')} style={styles.TablTeamCont}>
                                    <Text style={styles.TablesTeam}>
                                        {val.player.firstname} {val.player.lastname}
                                    </Text>
                                    <View style={styles.HeadsCont}>


                                        <Text key={idx} style={styles.TablesCoinBold}>
                                            {val.overs}
                                        </Text>
                                        <Text key={idx} style={styles.TablesCoin}>
                                            {check(val.medians)}
                                        </Text>
                                        <Text key={idx} style={styles.TablesCoin}>
                                            {check(val.runs)}
                                        </Text>
                                        <Text key={idx} style={styles.TablesCoin}>
                                            {check(val.wickets)}
                                        </Text>
                                        <Text key={idx} style={styles.TablesCoin}>
                                            {check(val.rate)}
                                        </Text>
                                        <Text key={idx} style={styles.TablesCoin}>
                                            {check(val.noball)}
                                        </Text>

                                    </View>
                                </TouchableOpacity>
                            )
                    })}




                </View>
            </>
        )
    }










    return (
        <>
            {loading ? (
                <Spinner />
            ) : (

                <>
                    {status ? (
                        <>
                            <View style={styles.TeamSwitchCont}>
                                <TouchableOpacity onPress={() => setActiveTeam(0)} style={activeTeam == 0 ? activeCont : styles.TeamCont}>
                                    <Image
                                        style={styles.TeamLogo}
                                        source={{
                                            uri: `${navigation?.matchInfo?.home_team?.image_path}`,
                                        }}
                                    />
                                    <Text style={activeTeam == 0 ? activeName : styles.TeamName}>{navigation?.matchInfo?.home_team?.name}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setActiveTeam(1)} style={activeTeam == 1 ? activeCont : styles.TeamCont}>
                                    <Image
                                        style={styles.TeamLogo}
                                        source={{
                                            uri: `${navigation?.matchInfo?.away_team?.image_path}`,
                                        }}
                                    />
                                    <Text style={activeTeam == 1 ? activeName : styles.TeamName}>{navigation?.matchInfo?.away_team?.name}</Text>
                                </TouchableOpacity>
                            </View>
                            <TotalScores />
                            <Bowlers />
                            {/* <FallOfWickets /> */}
                        </>
                    ) : (
                        <Text style={styles.NoRecords}>No records found</Text>
                    )}
                </>

            )}
        </>

    )
}

const styles = StyleSheet.create({
    NoRecords: {
        alignSelf: 'center',
        fontFamily: 'Jost',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 18,
        color: '#111315',
    },
    //Head
    TeamSwitchCont: {
        width: 360,
        height: 48,

        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        overflow: 'hidden',
    },
    TeamCont: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        height: 48,
    },
    TeamLogo: {
        width: 25,
        height: 25,
        borderRadius: 50,
    },
    TeamName: {
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 16.8,
        color: '#111315',
        marginLeft: 10,
    },
    //Head
    HeaderOfTables: {
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 15,
        lineHeight: 21,
        color: '#111315',
        paddingBottom: 10,
        paddingTop: 15,
    },
    TablesHeadCont: {
        height: 42,
        backgroundColor: '#3555FF',
        paddingTop: 13,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    TablTeamCont: {
        height: 48,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#EAEAEA',
        borderBottomWidth: 1,
        backgroundColor: '#FFFFFF',

    },
    TablesMainHead: {
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 16.8,
        color: '#FFFFFF',
    },
    TablesHead: {
        width: 33,
        textAlign: 'center',
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 16.8,
        color: '#FFFFFF',
    },
    HeadsCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    TablesTeam: {
        width: 114,
        fontFamily: 'Jost',
        fontWeight: '600',
        fontSize: 13,
        lineHeight: 18.2,
        color: '#111315',
        textDecorationStyle: 'solid',
        textDecorationColor: '#111315',
        textDecorationLine: 'underline',
    },
    TablesCoin: {
        width: 33,
        textAlign: 'center',
        fontFamily: 'Jost',
        fontWeight: '400',
        fontSize: 13,
        lineHeight: 18.2,
        color: '#111315',
    },
    TablesCoinBold: {
        width: 30,
        textAlign: 'center',
        fontFamily: 'Jost',
        fontWeight: '600',
        fontSize: 13,
        lineHeight: 18.2,
        color: '#111315',
    },
    TablesMain: {
        borderRadius: 8,
        overflow: 'hidden',
    },
    //FALLOFWICKETS
    TablesCoinWick: {
        width: 50,
        textAlign: 'center',
        fontFamily: 'Jost',
        fontWeight: '400',
        fontSize: 13,
        lineHeight: 18.2,
        color: '#111315',
    },
    TablesHeadWick: {
        width: 50,
        textAlign: 'center',
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 16.8,
        color: '#FFFFFF',
    },
    //FALLOFWICKETS
    //TOTAL SCORES
    FlexibleHeadCont: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    FlexibleHead: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    HeaderPoint: {
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 16.8,
        color: '#959595',
        paddingBottom: 10,
        paddingTop: 15,
    },
    PlayerContL: {
        alignSelf: 'center',
    },
    PlayerLName: {
        width: 114,
        fontFamily: 'Jost',
        fontWeight: '600',
        fontSize: 13,
        lineHeight: 18.2,
        color: '#111315',
        textDecorationStyle: 'solid',
        textDecorationColor: '#111315',
        textDecorationLine: 'underline',

    },
    PlayerRangL: {
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 16.8,
        color: '#959595',
    },
    PlayerRangLPink: {
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 16.8,
        color: '#FF0960',
    },
    TotalTeamCont: {
        height: 48,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#EAEAEA',
        borderBottomWidth: 1,
        borderLeftColor: '#FF0960',
        borderLeftWidth: 1,
        backgroundColor: '#FFFFFF',
    },
    Extras: {
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 15,
        lineHeight: 21,
        color: '#111315',
    },
    ExtraLightTxt: {
        fontFamily: 'Jost',
        fontWeight: '400',
        fontSize: 11,
        lineHeight: 15.4,
        color: '#959595',
        alignSelf: 'flex-end',
    },
    GreenCont: {
        height: 48,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#EAEAEA',
        borderBottomWidth: 1,
        backgroundColor: '#01AF70',
    },
    Totals: {
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 15,
        lineHeight: 21,
        color: '#FFFFFF',
        marginRight: 3,
    },
    TotalsLightTxt: {
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 16.8,
        color: '#FFFFFF',
        marginBottom: -5,
    },
    GreenTxtCont: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    BioConts: {
        padding: 15,
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
    },
    BioDesc: {
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 16.8,
        color: '#111315',
    },
    BioInfo: {
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 15,
        lineHeight: 21.68,
        color: '#111315',
        textDecorationStyle: 'solid',
        textDecorationColor: '#111315',
        textDecorationLine: 'underline',
    },
    //TOTAL SCORES
})