import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { LocaleConfig, Calendar } from 'react-native-calendars';
import EventForm from './EventForm'; // Certifique-se de que o caminho está correto

const CalendarioScreen = () => {
  const [events, setEvents] = useState([
    { id: 1, title: 'Evento 1', date: '2023-06-01' },
    // outros eventos
  ]);
  const [showForm, setShowForm] = useState(false);

  const addEvent = (event) => {
    setEvents([...events, event]);
    setShowForm(false); // Esconde o formulário após adicionar o evento
  };

  const markedDates = events.reduce((acc, event) => {
    acc[event.date] = { marked: true, dotColor: 'blue', activeOpacity: 0 };
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendário</Text>
      <Button title="Adicionar Evento" onPress={() => setShowForm(true)} />
      {showForm && <EventForm addEvent={addEvent} />}
      <Calendar
        markedDates={markedDates}
        theme={{
          todayTextColor: 'red',
          arrowColor: 'orange',
        }}
      />
      <View style={styles.eventList}>
        {events.map((event) => (
          <View key={event.id} style={styles.eventItem}>
            <Text style={styles.eventDate}>{event.date}</Text>
            <Text style={styles.eventTitle}>{event.title}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ],
  monthNamesShort: [
    'Jan.', 'Fev.', 'Mar.', 'Abr.', 'Maio', 'Jun.', 'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.',
  ],
  dayNames: [
    'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado',
  ],
  dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.'],
  today: 'Hoje',
};

LocaleConfig.defaultLocale = 'pt-br';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  eventList: {
    marginTop: 20,
  },
  eventItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventDate: {
    fontSize: 16,
    color: '#666',
  },
});

export default CalendarioScreen;