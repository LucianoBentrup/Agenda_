import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import CalendarioScreen from '../components/CalendarioScreen'; // Caminho atualizado
import HomeScreen from '../components/HomeScreen'; 

const Tab = createBottomTabNavigator();

const MenuAbas = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Calendário" component={CalendarioScreen} />
        {/* Adicione outras abas conforme necessário */}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MenuAbas;