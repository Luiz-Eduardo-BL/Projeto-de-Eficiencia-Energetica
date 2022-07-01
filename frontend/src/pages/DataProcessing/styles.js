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
        height:200,
        width:200,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:100,
    },
    textButton:{
        color:'#FFF',
        textAlign:'center',
        fontWeight:'bold',
        fontSize:15,

    },
    image: {
        flex: 1,
        width:'100%',
        height:'100%',
        justifyContent: "center",
        alignItems:"center",
        flexDirection:"column",
        alignSelf:'center',
        borderBottomEndRadius:200,
        opacity:0.9
      },
    title:{
        textAlign:'center',
        fontWeight:'bold',
        color:'#FFF',
        paddingTop:10,
        fontSize:20
    },
    titleBox:{
        flex:1,
        justifyContent:'flex-start',
        //backgroundColor:'pink',
        alignItems:'center'
    }
})
