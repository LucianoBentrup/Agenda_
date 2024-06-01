import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleAddEvent = () => {
    navigation.navigate('EventForm');
  };

  const handleDeleteEvent = () => {
    alert('Excluir compromisso');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Hub</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAddEvent}>
          <Text style={styles.buttonText}>Adicionar Compromisso</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Meus Calendários</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDeleteEvent}>
          <Text style={styles.buttonText}>Excluir Compromisso</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '80%',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});