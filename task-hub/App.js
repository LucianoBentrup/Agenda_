import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import CalendarioScreen from './components/CalendarioScreen';
import HomeScreen from './components/HomeScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Calendario" component={CalendarioScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

//Opção de deslogar (Lembrete)