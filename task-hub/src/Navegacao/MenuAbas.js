import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import CalendarioScreen from '../Screens/CalendarioScreen';

const Tab = createBottomTabNavigator();

const MenuAbas = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Calendário" component={CalendarioScreen} />
        {/* Removido AtividadeScreen */}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MenuAbas;