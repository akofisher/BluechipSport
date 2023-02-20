import React from 'react'
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

export default function AdBanner() {
    // 'ca-app-pub-2968554543353090/3991901071'

    const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2968554543353090/3991901071';


    return (

        <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.FULL_BANNER}
            requestOptions={{
                requestNonPersonalizedAdsOnly: true,
            }}
        />





    )
}

