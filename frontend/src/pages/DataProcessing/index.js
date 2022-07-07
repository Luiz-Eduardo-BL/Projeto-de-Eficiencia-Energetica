import { useRef, useEffect, useState } from "react";
import { Text, SafeAreaView, TouchableWithoutFeedback, ImageBackground, View, TouchableOpacity, Pressable, Image } from "react-native"

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    withTiming,
    Extrapolate,
    withRepeat,
    withDelay,
    Easing
}
    from 'react-native-reanimated';

import { Entypo } from '@expo/vector-icons';

import styles from "./styles"

export default function DataProcessing({ navigation }) {

    const gotoQRCode = () => {
        navigation.navigate('QRCode')
    }


    const Pulse = ({ delay = 0, repeat }) => {
        const animation = useSharedValue(0);
        useEffect(() => {
            animation.value = withDelay(
                delay,
                withRepeat(
                    withTiming(1, {
                        duration: 2000,
                        easing: Easing.linear,
                    }),
                    repeat ? -1 : 1,
                    false
                )
            );
        }, []);
        const animatedStyles = useAnimatedStyle(() => {
            const opacity = interpolate(
                animation.value,
                [0, 1],
                [0.6, 0],
                Extrapolate.CLAMP
            );
            return {
                opacity: opacity,
                transform: [{ scale: animation.value }],
            };
        });
        return <Animated.View style={[styles.circle, animatedStyles]} />;
    };

    //const [pulse, setPulse] = useState([1]);


    return (
        //<SafeAreaView style={styles.container}>

        <ImageBackground
            source={require('../../assets/predioFrente.jpg')}
            style={[styles.image]}

        >
            <>
                <SafeAreaView style={[styles.AndroidSafeArea, styles.titleBox]}>
                <TouchableOpacity style={{position:'absolute', left:20,top:30}} onPress={()=>navigation.openDrawer()}>
                <Entypo name="menu" size={38} color="white"/>
                </TouchableOpacity>
                    <Text style={styles.title}>
                        {`Projeto de\nEficiência Energética`}
                    </Text>


                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <Pressable
                            style={styles.innerCircle}
                            onPress={gotoQRCode}>
                            <TouchableOpacity style={styles.innerCircle} onPress={gotoQRCode}>
                                <Text style={styles.textButton}> {`Iniciar\nProcessamento`}</Text>
                            </TouchableOpacity>
                        </Pressable>
                        <Pulse repeat={true} />
                    </View>

                </SafeAreaView>
            </>
        </ImageBackground>


    )
}