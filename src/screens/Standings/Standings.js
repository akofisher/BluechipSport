import { Header } from 'components/header'
import React, { useMemo, useState } from 'react'
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Image } from 'react-native'
import { API } from 'services'
import { cxs } from 'styles'
import { NewsVerticalList } from '../../components/NewsVerticalList/NewsVerticalList'
import stadium from "../../../assets/icons/play.png";
import { ArrowDownSvg, PlayedTimeSvg } from '../../../assets/svgs/AllSvgs'
import { SvgICONS } from '../../../assets/svgs/svgIcons'
import { SvgCssUri, SvgUri, SvgXml } from 'react-native-svg'
import { Icon } from '../../components/common'
import ArrowRight from '../../../assets/icons/ArrowRight.png'


//https://www.npmjs.com/package/react-clamp-lines   თაითლებისთვის ...

const StandingsScreen = ({ navigation }) => {
    const [activeC, setActiveC] = useState(0)
    const [failedTeam, setFailedTeam] = useState(0)
    const IDS = [1, 2, 3, 4]
    const Stand = ['POPULAR COMPETITIONS', 'A', 'B', 'C', 'D']


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


    const Card = ({ val }) => {
        return (
            <TouchableOpacity style={styles.CountryCard} onPress={() => navigation.navigate('Competition')}>
                <View style={styles.CardTxtCont}>
                    <View style={styles.CountryLogo}></View>
                    <View>

                        <Text style={styles.CntryName}>INDIA - {val}</Text>
                        <Text style={styles.LeagueName}>INDIAN PREMIER LEAGUE</Text>
                    </View>
                </View>
                <Image style={styles.arrRight} source={ArrowRight} />

            </TouchableOpacity>
        )
    }








    const onSearchPress = React.useCallback(() => navigation.navigate("searchScreen"), []);
    const headerRightActions = useMemo(
        () => [
            {
                onPress: onSearchPress,
                iconName: "Search",
            },
            {
                onPress: navigation.openDrawer,
                iconName: "Menu",
            },
        ],
        [navigation.openDrawer, onSearchPress],
    );


    return (
        <View style={styles.flex}>
            <Header rightAction={headerRightActions} />

            <View style={styles.PScreenNav}>
                <TouchableOpacity style={activeC == 0 ? actBtn : styles.NavBtn} onPress={() => {
                    setActiveC(0)
                }}>
                    <Text style={activeC == 0 ? actClas : styles.NavBtnTxt}>CRICKET</Text>
                </TouchableOpacity>
                <TouchableOpacity style={activeC == 1 ? actBtn : styles.NavBtn} onPress={() => {
                    setActiveC(1)
                }}>
                    <Text style={activeC == 1 ? actClas : styles.NavBtnTxt}>KABADDI</Text>
                </TouchableOpacity>
                <TouchableOpacity style={activeC == 2 ? actBtn : styles.NavBtn} onPress={() => {
                    setActiveC(2)
                }}>
                    <Text style={activeC == 2 ? actClas : styles.NavBtnTxt}>FOOTBALL</Text>
                </TouchableOpacity>
                <TouchableOpacity style={activeC == 3 ? actBtn : styles.NavBtn} onPress={() => {
                    setActiveC(3)
                }}>
                    <Text style={activeC == 3 ? actClas : styles.NavBtnTxt}>TENNIS</Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.PScreenContent}>
                {Stand.map((id, idx) => {
                    return (
                        <View style={styles.CompBlock} key={idx}>
                            <Text style={styles.CompTitle}>{id}</Text>
                            <>
                                {IDS.map((val) => {
                                    return (
                                        <Card key={val} val={val} />
                                    )
                                })}
                            </>
                        </View>
                    )
                })}

            </ScrollView>

        </View>
    )
}

export default StandingsScreen

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
    PScreenNav: {
        width: '100%',
        height: 52,
        backgroundColor: '#101921',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        paddingLeft: 26,
        borderTopColor: '#1A2631',
        borderTopWidth: 1,
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
    CompTitle: {
        fontFamily: 'Jost',
        fontWeight: '600',
        fontSize: 15,
        lineHeight: 21,
        color: '#111315',
        marginTop: 5,
        marginBottom: 10,
    },
    CountryCard: {
        width: 360,
        height: 56,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 10,
        marginBottom: 5,
    },
    CountryLogo: {
        width: 32,
        height: 32,
        borderRadius: 50,
        backgroundColor: 'black',
        marginRight: 10,
    },
    CardTxtCont: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    CntryName: {
        fontFamily: 'Jost',
        fontWeight: '400',
        fontSize: 11,
        lineHeight: 16,
        color: '#959595',
    },
    LeagueName: {
        fontFamily: 'Jost',
        fontWeight: '600',
        fontSize: 13,
        lineHeight: 18.5,
        color: '#111315',
    },
    arrRight: {
        marginRight: 6,
    },


})
