import { Text, SafeAreaView, TouchableOpacity} from "react-native"
import styles from "./styles"

export default function DataProcessing({navigation }){
    
    return(
    <SafeAreaView style={styles.container}>
        <Text>
            Tela Inicial de Processamento de Dados
        </Text>
        <TouchableOpacity style={styles.startButton} onPress={()=>navigation.navigate('AmbientLight')}>
            <Text style={styles.textButton}> {`Iniciar\nProcessamento`}</Text>
        </TouchableOpacity>
    </SafeAreaView>
    )
}