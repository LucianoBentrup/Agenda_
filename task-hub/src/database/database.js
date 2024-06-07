import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('taskhub.db');

export const createTables = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT);',
      [],
      () => { console.log('Table created successfully'); },
      error => { console.log('Error creating table: ', error); }
    );
  });
};

export const registerUser = (name, email, password, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?);',
      [name, email, password],
      (tx, results) => { callback(results); },
      error => { console.log('Error registering user: ', error); }
    );
  });
};

export const loginUser = (email, password, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM users WHERE email = ? AND password = ?;',
      [email, password],
      (tx, results) => { callback(results); },
      error => { console.log('Error logging in: ', error); }
    );
  });
};
