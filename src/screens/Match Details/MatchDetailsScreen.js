import { Header } from 'components/header'
import React, { useMemo, useState } from 'react'
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import { API } from 'services'
import { cxs } from 'styles'
import { NewsVerticalList } from '../../components/NewsVerticalList/NewsVerticalList'
import stadium from "../../../assets/icons/play.png";
import { ArrowDownSvg, PlayedTimeSvg } from '../../../assets/svgs/AllSvgs'


//https://www.npmjs.com/package/react-clamp-lines   თაითლებისთვის ...

const MatchDetailsScreen = ({ navigation }) => {
    const [activeC, setActiveC] = useState(0)
    const IDS = [1, 2, 3, 4, 5, 6]
    const SQ = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    const Points = {
        first: '133/3',
        second: '130/9',
    }

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


    const LiveBtn = () => {
        return (
            <TouchableOpacity style={styles.LiveCont}>
                <View style={styles.LiveDot}></View>
                <Text style={styles.LiveTxt}>LIVE</Text>
            </TouchableOpacity>
        )
    }

    const MatchInfo = ({ id }) => {
        return (
            <View key={id}>
                <Text>MATCH INFO</Text>
            </View>
        )
    }

    const Live = ({ id }) => {
        return (
            <View key={id}>
                <Text>LIVE</Text>
            </View>
        )
    }

    const LineUps = ({ sq }) => {
        return (
            <View key={sq}>
                <Text>LineUps</Text>
            </View>
        )
    }

    const ScoreCard = ({ id }) => {
        return (
            <View key={id}>
                <Text>SCORE CARD</Text>
            </View>
        )
    }


    return (
        <View style={styles.flex}>
            <Header title={'MATCH DETAILS'} leftAction={headerLeftAction} />
            <View style={styles.HeaderCont}>

                <View style={styles.PScreenHead}>
                    <View style={styles.PlayerImg}></View>
                    <Text style={styles.PlayerName}>Gujarateli Titani</Text>
                    {/* <ImageBackground style={styles.bgStadiumContainer} source={stadium}></ImageBackground> */}
                </View>
                <View style={styles.PScreenHead}>
                    <LiveBtn />
                    <Text style={styles.MatchPoints}>{Points.first} : {Points.second}</Text>
                    <Text style={styles.MatchDetTxt}>2 INN, 6.0 OV</Text>
                </View>
                <View style={styles.PScreenHead}>
                    <View style={styles.PlayerImg}></View>
                    <Text style={styles.PlayerName}>Babangida Dev</Text>
                    {/* <ImageBackground style={styles.bgStadiumContainer} source={stadium}></ImageBackground> */}
                </View>
            </View>
            <View style={styles.PScreenNav}>
                <TouchableOpacity style={activeC == 0 ? actBtn : styles.NavBtn} onPress={() => {
                    setActiveC(0)
                }}>
                    <Text style={activeC == 0 ? actClas : styles.NavBtnTxt}>LIVE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={activeC == 1 ? actBtn : styles.NavBtn} onPress={() => {
                    setActiveC(1)
                }}>
                    <Text style={activeC == 1 ? actClas : styles.NavBtnTxt}>LINEUPS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={activeC == 2 ? actBtn : styles.NavBtn} onPress={() => {
                    setActiveC(2)
                }}>
                    <Text style={activeC == 2 ? actClas : styles.NavBtnTxt}>MATCH INFO</Text>
                </TouchableOpacity>
                <TouchableOpacity style={activeC == 3 ? actBtn : styles.NavBtn} onPress={() => {
                    setActiveC(3)
                }}>
                    <Text style={activeC == 3 ? actClas : styles.NavBtnTxt}>SCORECARD</Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.PScreenContent}>
                {activeC == 0 ? IDS.map((id, idx) => {
                    return (
                        <Live id={id} key={idx} />
                    )
                }) : null}
                {activeC == 1 ? (
                    SQ.map((val, idx) => {
                        return (

                            <LineUps sq={val} key={idx} />
                        )
                    })
                ) : null}
                {activeC == 2 ? (
                    IDS.map((val, idx) => {
                        return (

                            <MatchInfo key={idx} id={val} />
                        )
                    })
                ) : (
                    null
                )}
                {activeC == 3 ? (
                    IDS.map((val, idx) => {
                        return (
                            <ScoreCard key={idx} id={val} />

                        )
                    })
                ) : (
                    null
                )}
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
        backgroundColor: 'blue',
    },
    PlayerName: {
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 15,
        lineHeight: 21,
        color: '#FFFFFF',
        marginTop: 15,
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

})
