import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';

// Configure locale for the calendar
LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';

const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [selectedDay, setSelectedDay] = useState(null);
  const [events, setEvents] = useState([]);

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

  const handleDayPress = (day) => {
    setSelectedDay(day.dateString);
  };

  const eventsForSelectedDay = events.filter(event => event.date === selectedDay);

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleEventPress = (event) => {
    navigation.navigate('EventDetail', { event });
  };

  const handleLogout = () => {
    navigation.navigate('Login'); // Navigate back to Login screen
  };

  const markedDates = {
    [selectedDay]: { selected: true, selectedColor: 'blue' },
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
          <Icon name="bars" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Task Hub</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Icon name="sign-out" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Calendar 
        current={new Date().toISOString().split('T')[0]} 
        onDayPress={handleDayPress}
        monthFormat={'MMMM yyyy'}
        onMonthChange={(month) => { console.log('month changed', month) }}
        hideExtraDays={true}
        firstDay={1}
        showWeekNumbers={false}
        onPressArrowLeft={subtractMonth => subtractMonth()}
        onPressArrowRight={addMonth => addMonth()}
        disableAllTouchEventsForDisabledDays={true}
        markedDates={markedDates}
        theme={{
          backgroundColor: '#fff',
          calendarBackground: '#fff',
          textSectionTitleColor: '#000',
          dayTextColor: '#000',
          todayTextColor: '#00adf5',
          selectedDayTextColor: '#fff',
          monthTextColor: '#000',
          indicatorColor: '#000',
        }}
      />
      {selectedDay && (
        <View style={styles.eventBox}>
          <Text style={styles.selectedDayText}>{formatDate(selectedDay)}</Text>
          <ScrollView>
            {eventsForSelectedDay.map((event, index) => (
              <TouchableOpacity key={index} style={styles.eventItem} onPress={() => handleEventPress(event)}>
                <Text style={styles.eventName}>{event.name}</Text>
                <Text style={styles.eventTime}>{event.startTime} - {event.endTime}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f7f7f7',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuButton: {
    marginLeft: 10,
  },
  logoutButton: {
    marginRight: 10,
  },
  eventBox: {
    flex: 1,
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  selectedDayText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventItem: {
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
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

export default HomeScreen;
