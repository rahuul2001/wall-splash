import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { data } from '../constants/data'
import { hp, wp } from '../helpers/common'
import { theme } from '../constants/theme'
import Animated, { FadeInRight } from 'react-native-reanimated';

export default function Categories({activeCat, handleCategoryChange}) {
  return (
    <FlatList
    horizontal
    contentContainerStyle={styles.flatlistContainer}
    showsHorizontalScrollIndicator={false}
    data={data.categories}
    keyExtractor={item=>item}
    renderItem={({ item, index }) => (
        <CategoryItem 
            title={item}
            index={index}
            isActive={activeCat==item}
            handleCategoryChange={handleCategoryChange}
        />
    )}
    
    />
  )
}


const CategoryItem = ({ title, index, isActive, handleCategoryChange }) => {
    let textColor = isActive ? theme.colors.white: 'gray';
    let backgroundColor = isActive ? 'gray': theme.colors.white
    return (
        <Animated.View entering={FadeInRight.delay(index*200).duration(1000).springify().damping(14)}>
            <Pressable  
            onPress={()=>handleCategoryChange(isActive? null: title)}
            style={[styles.category, {backgroundColor}]}>
                <Text style={[styles.title, {textColor}]}>{title}</Text>
            </Pressable>
        </Animated.View>
    )
} 


const styles = StyleSheet.create({
    flatlistContainer:{
        paddingHorizontal: wp(4),
        gap: 8
    },
    category:{
        padding: 12,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: theme.colors.grayBG,
        // backgroundColor: 'white' 
    },
    title:{
        fontSize: hp(1.8),
        fontWeight: theme.fontWeights.medium
    }
})