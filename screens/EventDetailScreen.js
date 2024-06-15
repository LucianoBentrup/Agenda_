import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EventDetailScreen = ({ route }) => {
  const { event } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.name}</Text>
      <Text style={styles.detail}>Início: {event.startTime}</Text>
      <Text style={styles.detail}>Término: {event.endTime}</Text>
      <Text style={styles.detail}>Local: {event.location}</Text>
      <Text style={styles.detail}>Organizador: {event.organizer}</Text>
      <Text style={styles.detail}>Descrição: {event.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default EventDetailScreen;
