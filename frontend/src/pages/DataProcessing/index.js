import { useRef, useEffect, useState } from "react";
import { Text, SafeAreaView, TouchableWithoutFeedback, ImageBackground, View, TouchableOpacity, Platform } from "react-native"
import LottieView from 'lottie-react-native';

import { useRoute } from '@react-navigation/native';

import AnimatedLoader from "react-native-animated-loader";
import styles from "./styles"

export default function DataProcessing({ navigation }) {
    const animation = useRef(null);
    const [animationVisible, setanimationVisible] = useState(false);
    const route = useRoute();

    const gotoQRCode = () => {
        console.log(route.name);

        setanimationVisible(false)
        navigation.navigate('QRCode')
    }

    useEffect(() => {
        //console.log(animation.current)
        // You can control the ref programmatically, rather than using autoPlay
        //animation.current?.reset();
        animation.current?.play();
        setanimationVisible(true)
    }, []);
    return (
        //<SafeAreaView style={styles.container}>

        <ImageBackground
            source={require('../../assets/predioFrente.jpg')}
            style={[styles.image]}

        >
            <>
                <SafeAreaView style={[styles.AndroidSafeArea, styles.titleBox]}>
                    <Text style={styles.title}>
                        {`Projeto de\nEficiência Energética`}
                    </Text>

                    {Platform.OS === 'ios' ?
                        <AnimatedLoader
                            //ref={animation}
                            visible={animationVisible}
                            resizeMode="cover"
                            animationStyle={{
                                width: 500,
                                height: 500,
                                //backgroundColor: '#eee',
                            }}
                            source={require('../../assets/circleAnimation.json')}
                            loop={true}
                        >
                            <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center', width: '100%', position: 'absolute' }}>

                                <TouchableOpacity style={styles.startButton} onPress={gotoQRCode}>
                                    <Text style={styles.textButton}> {`Iniciar\nProcessamento`}</Text>
                                </TouchableOpacity>
                            </View>


                        </AnimatedLoader> :
                        <>
                        <LottieView
                            loop
                            autoPlay
                            ref={animation}
                            resizeMode="cover"
                            style={{
                                width: '100%',
                                height: 300,
                                backgroundColor: '#eee',
                                alignItems:'center',
                                justifyContent:'center'
                            }}
                            source={require('../../assets/circleAnimation.json')}
                        />
                        <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center', width: '100%', position: 'absolute' }}>

<TouchableOpacity style={styles.startButton} onPress={gotoQRCode}>
    <Text style={styles.textButton}> {`Iniciar\nProcessamento`}</Text>
</TouchableOpacity>
</View>
                        </>}


                </SafeAreaView>

            </>
        </ImageBackground>


    )
}