import {StyleSheet,Platform,StatusBar} from 'react-native'
import { theme } from '../../global/styles/theme'

export default StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        //backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
      },
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
    },
    circle: {
        width: 300,
        borderRadius: 150,
        height: 300,
        position: 'absolute',
        borderColor: 'blue',
        borderWidth: 4,
        backgroundColor: theme.colors.primary,
      },
      innerCircle: {
        width: 160,
        borderRadius: 80,
        height: 160,
        zIndex: 100,
        justifyContent:'center',
        alignItems:'center',
        position: 'absolute',
        backgroundColor: theme.colors.primary,
      },
})
