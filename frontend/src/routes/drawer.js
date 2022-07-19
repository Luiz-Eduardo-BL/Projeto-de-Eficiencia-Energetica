import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { View, Button } from 'react-native'
import { ProcessingStack } from './stack';

const App = createDrawerNavigator();



function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                onPress={() => navigation.navigate('Notifications')}
                title="Go to notifications"
            />
        </View>
    );
}

function NotificationsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.goBack()} title="Go back home" />
        </View>
    );
}






export default function Drawer() {
    return (
        <App.Navigator
            screenOptions={{

                headerShown: false,
                swipeEnabled: false

            }}
        >
            <App.Screen name="ProcessingStack" component={ProcessingStack} />
            <App.Screen name="Notifications" component={NotificationsScreen} />
        </App.Navigator>

    )

}