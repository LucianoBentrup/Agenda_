import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EventForm = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const navigation = useNavigation();

  const handleSubmit = () => {
    // Logica para salvar evento
    // Voltar para home page
    navigation.navigate('Home');
  };

  return (
    <View>
      <TextInput
        placeholder="Titulo do evento:"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Data do evento (DD-MM-AAAA):"
        value={date}
        onChangeText={setDate}
      />
      <Button title="Salvar evento" onPress={handleSubmit} />
    </View>
  );
};

export default EventForm;