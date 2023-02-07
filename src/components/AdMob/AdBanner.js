import React from 'react'
import { TestIds, BannerAd, BannerAdSize } from '@react-native-firebase/admob';

export default function AdBanner() {
    // 'ca-app-pub-2968554543353090/3991901071'
    return (


        <BannerAd
            unitId={TestIds.BANNER}
            size={BannerAdSize.SMART_BANNER}
            requestOptions={{
                requestNonPersonalizedAdsOnly: true,
            }}
            onAdLoaded={() => {
                console.log('Advert loaded');
            }}
            onAdFailedToLoad={(error) => {
                console.error('Advert failed to load: ', error);
            }}
        />


    )
}

