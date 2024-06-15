import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const ManageEventsScreen = () => {
  const [events, setEvents] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    if (isFocused) {
      fetchEvents();
    }
  }, [isFocused]);

  const fetchEvents = async () => {
    try {
      const storedEvents = await AsyncStorage.getItem('events');
      const events = storedEvents ? JSON.parse(storedEvents) : [];
      setEvents(events);
    } catch (e) {
      console.error("Error fetching events: ", e);
    }
  };

  const handleEditEvent = (event) => {
    navigation.navigate('EditEvent', { event });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Gerenciar Eventos</Text>
      {events.map((event, index) => (
        <TouchableOpacity key={index} style={styles.eventItem} onPress={() => handleEditEvent(event)}>
          <Text style={styles.eventName}>{event.name}</Text>
          <Text style={styles.eventTime}>{event.startTime} - {event.endTime}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
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
  eventItem: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    borderRadius: 5,
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventTime: {
    fontSize: 14,
    color: '#555',
  },
});

export default ManageEventsScreen;
