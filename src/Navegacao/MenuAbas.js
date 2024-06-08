import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import CalendarioScreen from '../Screens/CalendarioScreen';
import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';

const Tab = createBottomTabNavigator();

export default function MenuAbas() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Tab.Screen name="Login" component={LoginScreen} />
                <Tab.Screen name="Calendario" component={CalendarioScreen} />
                <Tab.Screen name="Register" component={RegisterScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
