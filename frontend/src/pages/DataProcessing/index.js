import { useRef, useEffect} from "react";
import { Text, SafeAreaView, TouchableOpacity, ImageBackground, View } from "react-native"
import LottieView from 'lottie-react-native';
import styles from "./styles"

export default function DataProcessing({ navigation }) {
    const animation = useRef(null);
    useEffect(() => {
        // You can control the ref programmatically, rather than using autoPlay
        // animation.current?.play();
    }, []);
    return (
        //<SafeAreaView style={styles.container}>
        <ImageBackground
            source={require('../../assets/predioFrente.jpg')}
            style={styles.image}

        >
            <>
                <SafeAreaView style={styles.titleBox}>
                    <Text style={styles.title}>
                        {`Projeto de\nEficiência Energética`}
                    </Text>
                    <LottieView
                        autoPlay
                        loop
                        //ref={animation}
                        style={{
                            width: 200,
                            height: 200,
                            //backgroundColor: '#eee',
                        }}
                        // Find more Lottie files at https://lottiefiles.com/featured
                        source={require('../../assets/search-empty.json')}
                    />
                </SafeAreaView>
                <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center', width: '100%', position: 'absolute' }}>
                    <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('QRCode')}>
                        <Text style={styles.textButton}> {`Iniciar\nProcessamento`}</Text>
                    </TouchableOpacity>
                </View>
            </>
        </ImageBackground>

        //</SafeAreaView>
    )
}