import {StyleSheet} from 'react-native'
import { theme } from '../../global/styles/theme'

export default StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    startButton:{
        backgroundColor:theme.colors.primary,
        height:50,
        width:200,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20,
    },
    textButton:{
        color:'#FFF',
        textAlign:'center',
        fontWeight:'bold',
        fontSize:15,

    }
})
