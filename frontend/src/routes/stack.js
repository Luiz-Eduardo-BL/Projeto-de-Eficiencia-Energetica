import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AmbientLight from '../pages/AmbientLight';
import DataProcessing from '../pages/DataProcessing';
import QRCode from '../pages/QRCode';

const AppStack = createNativeStackNavigator() //Stack para telas de processamento de dados

export function ProcessingStack() {


    return (
        <AppStack.Navigator screenOptions={{headerShown: false }}>
            <AppStack.Screen name="DataProcessing" component={DataProcessing}
                options={({ navigation, route }) => ({
                    title: 'Processamento de Dados'
                })
                }
            />

            <AppStack.Screen name="QRCode" component={QRCode}
                options={({ navigation, route }) => ({
                    title: 'QR-Code'
                })
                }
            />

            <AppStack.Screen name="AmbientLight" component={AmbientLight}
                options={({ navigation, route }) => ({
                    title: 'AmbientLight'
                })
                }
            />


        </AppStack.Navigator>
    )
}