import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../components/HomeScreen';
import CalendarioScreen from '../components/CalendarioScreen';
import EventForm from '../components/EventForm';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const MenuAbas = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Calendar" component={CalendarioScreen} />
        <Tab.Screen name="EventForm" component={EventForm} options={{ tabBarButton: () => null }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MenuAbas;