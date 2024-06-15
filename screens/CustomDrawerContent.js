import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Text, Switch, StyleSheet } from 'react-native';

const CustomDrawerContent = (props) => {
  const [isNotificationsEnabled, setNotificationsEnabled] = React.useState(false);

  const toggleNotifications = () => setNotificationsEnabled(previousState => !previousState);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Meus eventos"
        onPress={() => props.navigation.navigate('Home')}
      />
      <DrawerItem
        label="Criar evento"
        onPress={() => props.navigation.navigate('CreateEvent')}
      />
      <DrawerItem
        label="Gerenciar eventos"
        onPress={() => props.navigation.navigate('ManageEvents')}
      />
      <View style={styles.drawerItem}>
        <Text style={styles.drawerItemText}>Notificações</Text>
        <Switch
          value={isNotificationsEnabled}
          onValueChange={toggleNotifications}
        />
      </View>
      <DrawerItem
        label="Configuração (Em desenvolvimento)"
        onPress={() => props.navigation.navigate('Settings')}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  drawerItemText: {
    fontSize: 16,
  },
});

export default CustomDrawerContent;
