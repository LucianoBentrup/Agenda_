import React, { useState } from 'react';

// <- INCLUIR AQUI

// Formulário de Adição de Evento
const EventForm = ({ addEvent }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent({ id: Date.now(), title, date });
    setTitle('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título do Evento"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button type="submit">Adicionar Evento</button>
    </form>
  );
};

export default EventForm;