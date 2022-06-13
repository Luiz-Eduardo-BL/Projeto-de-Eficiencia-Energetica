import {StyleSheet} from 'react-native'
import { theme } from '../../global/styles/theme'


export default StyleSheet.create({
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
        color:'#FFF'
    }
})
