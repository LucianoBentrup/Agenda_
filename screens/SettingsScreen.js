import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

const SettingsScreen = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <View style={isDarkMode ? styles.containerDark : styles.containerLight}>
      <Text style={isDarkMode ? styles.titleDark : styles.titleLight}>Configurações</Text>
      <View style={styles.settingItem}>
        <Text style={isDarkMode ? styles.settingTextDark : styles.settingTextLight}>Modo Escuro</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerLight: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  containerDark: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#333',
  },
  titleLight: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
  },
  titleDark: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingTextLight: {
    fontSize: 18,
    color: '#000',
  },
  settingTextDark: {
    fontSize: 18,
    color: '#fff',
  },
});

export default SettingsScreen;
