import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { MasonryFlashList } from "@shopify/flash-list";
import ImageCard from './ImageCard';
import { getColumnCount, hp, wp } from '../helpers/common'

export default function ImageGrid({ images }) {

  const columns = getColumnCount()
  return (
    <View style={styles.container}>
        <MasonryFlashList
          data={images}
          numColumns={columns}
          initialNumToRender = {1000}
          renderItem={({ item, index }) => <ImageCard item={item} columns={columns} index={index} />}
          contentContainerStyle={styles.listContainerStyle}
          estimatedItemSize={200}
        />
    </View>
    
  );
}


const styles = StyleSheet.create({
  container: {
    minHeight: 3,
    width: wp(100)
  },
  listContainerStyle:{
    paddingHorizontal: wp(4)
  }
})