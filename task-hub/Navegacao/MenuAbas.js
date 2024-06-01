import CalendarioScreen from '../components/CalendarioScreen';
import HomeScreen from '../components/HomeScreen';
import AtividadeScreen from '../components/AtividadeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function MenuAbas() {
  const Tab = createBottomTabNavigator();

  function Home(){
    return (
      <HomeScreen titulo='Task Hub'/>
      );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Calendário" component={CalendarioScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
