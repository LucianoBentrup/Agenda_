import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import CreateEventScreen from './screens/CreateEventScreen';
import EventDetailScreen from './screens/EventDetailScreen';
import SettingsScreen from './screens/SettingsScreen';
import ManageEventsScreen from './screens/ManageEventsScreen';
import EditEventScreen from './screens/EditEventScreen';
import CustomDrawerContent from './screens/CustomDrawerContent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MainDrawer = () => (
  <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="CreateEvent" component={CreateEventScreen} />
    <Drawer.Screen name="Settings" component={SettingsScreen} />
    <Drawer.Screen name="ManageEvents" component={ManageEventsScreen} />
  </Drawer.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={MainDrawer} options={{ headerShown: false }} />
        <Stack.Screen name="EventDetail" component={EventDetailScreen} />
        <Stack.Screen name="EditEvent" component={EditEventScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
