import { Text, SafeAreaView, TouchableOpacity, ImageBackground,View } from "react-native"
import styles from "./styles"

export default function DataProcessing({navigation }){
    
    return(
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
        </SafeAreaView>
        <View style={{height:'100%',alignItems:'center',justifyContent:'center',width:'100%',position:'absolute'}}>
        <TouchableOpacity style={styles.startButton} onPress={()=>navigation.navigate('QRCode')}>
            <Text style={styles.textButton}> {`Iniciar\nProcessamento`}</Text>
        </TouchableOpacity>
        </View>
        </>
        </ImageBackground>
        
    //</SafeAreaView>
    )
}