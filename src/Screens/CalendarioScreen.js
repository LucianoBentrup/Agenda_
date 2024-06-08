import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { LocaleConfig, Calendar } from 'react-native-calendars';
import SQLite from 'react-native-sqlite-storage';
import EventForm from './EventForm';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const openDatabase = async () => {
  return SQLite.openDatabase(
    {
      name: 'events.db',
      location: 'default',
    }
  );
};

const CalendarioScreen = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [db, setDb] = useState(null);

  useEffect(() => {
    const initDb = async () => {
      const database = await openDatabase();
      setDb(database);
      createTable(database);
    };
    initDb();
  }, []);

  const createTable = (database) => {
    database.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, title TEXT)',
        [],
        () => {
          console.log('Table created successfully');
        },
        error => {
          console.log('Error creating table: ', error);
        }
      );
    });
  };

  const fetchEvents = (date) => {
    if (!db) return;
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM events WHERE date = ?',
        [date],
        (tx, results) => {
          const rows = results.rows.raw();
          setEvents(rows);
        }
      );
    });
  };

  const addEvent = (event) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO events (date, title) VALUES (?, ?)',
        [event.date, event.title],
        () => {
          console.log('Event added successfully');
          fetchEvents(event.date);
        },
        error => {
          console.log('Error adding event: ', error);
        }
      );
    });
    setShowForm(false);
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
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
          fetchEvents(day.dateString);
        }}
        markedDates={{
          ...markedDates,
          [selectedDate]: { selected: true, selectedColor: 'blue' },
        }}
        theme={{
          todayTextColor: 'red',
          arrowColor: 'orange',
        }}
      />
      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.eventItem}>
            <Text style={styles.eventDate}>{item.date}</Text>
            <Text style={styles.eventTitle}>{item.title}</Text>
          </View>
        )}
      />
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