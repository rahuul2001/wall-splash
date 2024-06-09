import { View, Text, StyleSheet, Pressable, ScrollView, TextInput } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';
import { theme } from '../../constants/theme';
import { hp, wp } from '../../helpers/common';
import { EvilIcons } from '@expo/vector-icons';
import Categories from '../../components/categories';
import { apiCall } from '../../api';
import ImageGrid from '../../components/ImageGrid';
import { debounce } from 'lodash'


var page = 1

export default function HomeScreen() {

    const {top } = useSafeAreaInsets();
    const [search, setSearch] = useState('')
    const searchInputRef = useRef(null)
    const [activeCat, setActiveCat] = useState(null)
    const [images, setImages] = useState([])



    useEffect(()=>{
        fetchImages();
    }, [])

    const fetchImages = async (params = {page:1}, append=false) => { 
        
        console.log('params: ', params, append)

        let res = await apiCall(params)
        if(res.success && res?.data?.hits){
            if(append){
                setImages([...images, ...res.data.hits])
            }
            else{
                setImages([...res.data.hits])
            }
        }
        // console.log('Got results: ', res.data.hits)
    } 

    const paddingTop = top>0 ? top+10 : 30


    const handleCategoryChange = (cat) => {
        setActiveCat(cat)
    }

    const handleSearch = (text) => {
        // console.log('user searching for: ', text)
        setSearch(text)
        if(text.length>2){
            // search for text
            page = 1
            setImages([])
            fetchImages({ page, q: text })
        }
        if(text==""){
            // reset results
            page = 1
            searchInputRef?.current?.clear()
            setImages([])
            fetchImages({ page })
        }
    } 


    // const clearSearch = () => {
    //     setSearch("")
    //     searchInputRef?.current?.clear();
    // } 

    const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])

    console.log("Active Category: ", activeCat)


  return (
    <View style={[styles.container, {paddingTop}]}>
        {/* header */}
        <View style={styles.header}>
            <Pressable>
                <Text style={styles.title}>
                    WallSplash
                </Text>
            </Pressable>

            <Pressable>
                <Feather name="menu" size={30} color={theme.colors.neutral(0.7)} />
            </Pressable>
        </View>


        {/* scrollview for content below header */}
        <ScrollView
        contentContainerStyle={{gap: 15}}
        >
            {/* search bar */}
            <View style={styles.searchBar}>
                <View style={styles.searchIcon}>
                    <Feather name="search" size={24} color={theme.colors.neutral(0.4)} />
                </View>
                <TextInput 
                    placeholder="Search for wallpapers!"
                    style={styles.searchInput} 
                    onChangeText={handleTextDebounce} 
                    ref={searchInputRef}
                 />
                {
                    search && 
                    <Pressable style={styles.closeIcon} onPress={() => handleSearch("")}>
                        <EvilIcons name="close" size={24} color={theme.colors.neutral(0.6)} />
                    </Pressable>
                }
                
            </View>

            {/* components for categories */}
            <View style={styles.categories}>
                <Categories activeCat={activeCat} handleCategoryChange={handleCategoryChange}/>
            </View>


            {/* for showing wallpapers */}
            <View>
                {
                    images.length > 0 &&
                    <ImageGrid images={images} />
                }
            </View>

        </ScrollView>
    </View>
  )
}



const styles = StyleSheet.create({
    container: {
        flex:1,
        gap:15
    },
    header: {
        marginHorizontal: wp(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title:{
        fontSize: hp(4),
        fontWeight: theme.fontWeights.semibold,
        color: theme.colors.neutral(0.9)
    },
    searchBar:{
        marginHorizontal:wp(4),
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth:1,
        borderColor: theme.colors.grayBG,
        backgroundColor:theme.colors.white,
        padding: 6,
        paddingLeft: 10,
        borderRadius: theme.radius.lg
    },
    searchIcon:{
        padding:8
    },
    searchInput:{
        flex:1,
        borderRadius: theme.radius.sm,
        paddingVertical:10,
        fontSize: hp(1.8)
    },
    closeIcon:{
        padding: 8,
        borderRadius: theme.radius.sm
    }
})