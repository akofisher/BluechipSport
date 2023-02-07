import { AutoHeightWebView, Text } from 'components/common'
import moment from 'moment'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Colors, cxs } from '../../styles'
import AdBanner from '../AdMob/AdBanner'

const ArticleContent = React.memo(
  ({
    onShouldStartLoadWithRequest,
    hasEmbed,
    content,
    date,
    plainContent,
    title,
  }) => {
    const fontSize = 15

    return (
      <>
        <View style={st.header}>
          <Text style={st.titleText}>{title || ''}</Text>
          <Text style={st.dateText}>
            {moment(date).format('DD MMM, yyyy, hh::mm')}
          </Text>
          <AdBanner />
        </View>
        <View style={st.paddingHorizontal}>
          {hasEmbed ? (
            <AutoHeightWebView
              originWhitelist={['*']}
              source={{
                html: `${content}
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                         <style>
                              img { display: block; max-width: 100%; height: auto; }
                              body { font-size: ${fontSize}px; color: #494949; line-height: 25px; letter-spacing: 0.01px; }
                              iframe { display: block; max-height: 210px; }
                        </style>`,
              }}
              onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
            />
          ) : (
            <Text
              style={[
                st.content,
                {
                  fontSize,
                },
              ]}
            >
              {plainContent}
            </Text>
          )}
        </View>
      </>
    )
  },
)

export default ArticleContent

const st = StyleSheet.create({
  header: {
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  titleText: {
    color: Colors.textBlack,
    fontSize: 24,
    fontWeight: '600',
  },
  dateText: {
    fontSize: 12,
    paddingTop: 10,
    fontWeight: '400',
    color: Colors.textGray,
  },
  paddingHorizontal: {
    paddingHorizontal: 5,
    paddingVertical: 20,
    backgroundColor: Colors.background,
  },
  content: {
    backgroundColor: Colors.background,
    color: '#111315',
    marginHorizontal: 10,
  },
})
