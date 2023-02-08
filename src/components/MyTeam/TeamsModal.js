import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from 'react-native'
import React, { useCallback, useMemo, useState, useEffect } from 'react'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import { SearchIcon } from '../../../assets/svgs/AllSvgs'
import i18next from 'i18next'




export default function TeamsModal({ bottomSheetModalRef }) {
    const [classStyle, setClassStyle] = useState(false)
    const [searchRes, setSearchRes] = useState('')

    const IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]

    const snapPoints = useMemo(() => ['10%', '80%'], [])

    const closeModal = useCallback(
        // @ts-ignore
        () => bottomSheetModalRef?.current?.close(),
        [bottomSheetModalRef],
    )

    useEffect(() => {

    }, [classStyle])

    useEffect(() => {
        if (searchRes.length == 0) {
            setClassStyle(false)
        } else {
            setClassStyle(true)
        }
    }, [searchRes])



    return (
        <BottomSheetModal
            backdropComponent={BottomSheetBackdrop}
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
        >
            <SafeAreaView style={styles.ModalContainer}>

                <View style={classStyle == false ? styles.TeamSearchCont : styles.TeamSearchContSec}>
                    <SearchIcon color='#5E5E5E' />
                    <TextInput
                        autoCapitalize='none'
                        autoCorrect='false'
                        style={styles.teamsSearch}
                        value={searchRes}
                        defaultValue={''}
                        onChangeText={(text) => setSearchRes(text)}
                        onFocus={() => setClassStyle(true)}
                        onBlur={() => setClassStyle(false)}
                        placeholder={i18next.t("Search Cricket or Football team")}
                        placeholderTextColor='#5E5E5E'
                        onClear={() => setSearchRes('')}

                    // returnKeyType="done"
                    // onSubmitEditing={addNewComment}

                    />
                </View>
                <ScrollView contentContainerStyle={styles.TeamsCont}>
                    {IDS.map((id, idx) => {
                        return (
                            <TouchableOpacity style={styles.TeamCont} key={idx} onPress={() => closeModal()}>
                                <View style={styles.TeamLogo}></View>
                                <Text style={styles.TeamName}>{id}</Text>
                            </TouchableOpacity>
                        )
                    })}

                </ScrollView>
            </SafeAreaView>
        </BottomSheetModal>
    )
}

const styles = StyleSheet.create({
    ModalContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // minHeight: '100%',

    },
    TeamSearchCont: {
        width: 360,
        height: 44,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 7,
        borderColor: '#E3E3E3',
        borderWidth: 1,
        padding: 10,
        marginTop: 24,
        marginBottom: 15,
        backgroundColor: '#F2F2F2',
    },
    TeamSearchContSec: {
        width: 360,
        height: 44,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 7,
        borderColor: '#949494',
        borderWidth: 1,
        padding: 10,
        marginTop: 24,
        marginBottom: 15,
        backgroundColor: '#F2F2F2',
    },
    teamsSearch: {
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 15,
        marginLeft: 13,
        color: '#111315',
        width: '100%',
        height: '100%',
    },
    TeamsCont: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        backgroundColor: '#F2F2F2',
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 80,
    },
    TeamCont: {
        width: 110,
        height: 105,
        borderRadius: 7,
        marginTop: 15,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    TeamLogo: {
        width: 30,
        height: 30,
        borderRadius: 50,
        borderColor: 'transparent',
        backgroundColor: 'blue',
        marginBottom: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    TeamName: {
        fontFamily: 'Jost',
        fontWeight: '500',
        fontSize: 11,
        lineHeight: 15.5,
        color: '#111315',

    },


})