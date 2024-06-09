import { View, Text, StyleSheet, StatusBar, Image, Pressable } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react'
import { hp, wp } from "../helpers/common"
import { theme } from '../constants/theme';
import { useRouter } from 'expo-router'

export default function WelcomeScreen() {

    const router = useRouter()

  return (
    <View style={styles.container}>
      <StatusBar style="light"/>
      <Image 
      source={require('../assets/images/welcome.png')}
      style={styles.bgImage}
      resizeMode='cover'
      />

        {/* code for linear gradient */}
        <Animated.View entering={FadeInDown.duration(500)} style={{flex:1}}>
            <LinearGradient 
                colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.5)', 'white', 'white']}
                style={styles.gradient}
                start={{x: 0.5, y:0}}
                end={{x: 0.5, y: 0.8}}
            />

            <View style={styles.contentContainer}>
                <Animated.Text entering={FadeInDown.delay(400).springify()} style={styles.title}>WallSplash</Animated.Text>
                <Animated.Text entering={FadeInDown.delay(500).springify()} style={styles.punchline}>Transform your digital views</Animated.Text>
            </View>

            <Animated.View entering={FadeInDown.delay(600).springify()}>
                <Pressable style={styles.startButton} onPress={() => router.push('home')}>
                    <Text style={styles.startText}>Start Exploring</Text>
                </Pressable>
            </Animated.View>

        </Animated.View>

    </View>
  )
}



const styles = StyleSheet.create({
    container: {
        flex:1
    },
    bgImage:{
        width: wp(100),
        height: hp(100),
        position: 'absolute'
    },
    gradient: {
        width: wp(100),
        height: hp(65),
        bottom: 0,
        position: 'absolute'
    },
    contentContainer: {
        flex:1,
        alignItems:'center',
        justifyContent: 'flex-end',
        gap:15
    },
    title: {
        fontSize: hp(5),
        color: theme.colors.neutral(0.9),
        fontWeight: theme.fontWeights.bold
    },
    punchline: {
        fontSize: hp(2),
        letterSpacing:1,
        marginBottom:10,
        fontWeight: theme.fontWeights.medium
    },
    startButton: {
        margin: 50,
        backgroundColor: theme.colors.neutral(0.9),
        padding:30,
        paddingHorizontal:50,
        borderRadius:theme.radius.xl,
        borderCurve: 'continuous'
    },
    startText:{
        textAlign: 'center',
        color: theme.colors.white,
        fontSize: hp(3),
        fontWeight: theme.fontWeights.medium,
        letterSpacing:1
    }
})