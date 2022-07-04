import {StyleSheet, StatusBar,Platform} from 'react-native'

export default StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
      },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
      },
    containerSecondary:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems:'center',
        backgroundColor:'transparent'
    },
    button:{
        width:'100%',
        paddingTop:10,
        paddingLeft:40
    },
    text:{
        paddingBottom:20,
        textAlign:'center',
        color:'#FFF',
        fontSize:17,
    }
})
