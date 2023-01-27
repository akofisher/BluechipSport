import React from 'react'
import { View, FlatList } from 'react-native'
import { HorizontalListItem } from '../../../../components/news'
import { Separator } from '../../../../components/common'

interface HorizontalSlidesProps {
  data: any
  openNewsDetails: (id: number, title: string, videoUrl: string) => void
}

export const HorizontalSlides = React.memo<HorizontalSlidesProps>(
  ({ data, openNewsDetails }) => {
    return (
      <View>
        <FlatList
          key="horizontalSlides"
          horizontal
          decelerationRate="normal"
          showsHorizontalScrollIndicator={false}
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <HorizontalListItem
              itemData={item}
              onPress={() =>
                openNewsDetails(item.id, item.title, item?.mainVideoUrl)
              }
            />
          )}
        />
        <Separator style={{}} />
      </View>
    )
  },
)
