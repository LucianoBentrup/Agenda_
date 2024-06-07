import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

const databaseFileName = 'Hub_task.db';

async function openDatabase() {
  if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + databaseFileName)).exists) {
    await FileSystem.downloadAsync(
      Asset.fromModule(require('/src/assets/Hub_task.db')).uri,
      FileSystem.documentDirectory + databaseFileName
    );
  }
  return SQLite.openDatabase(databaseFileName);
}

const dbPromise = openDatabase();

export const createTables = async () => {
  const db = await dbPromise;
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT);',
      [],
      () => { console.log('Table created successfully'); },
      error => { console.log('Error creating table: ', error); }
    );
  });
};

export const registerUser = async (name, email, password, callback) => {
  const db = await dbPromise;
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?);',
      [name, email, password],
      (tx, results) => { callback(results); },
      error => { console.log('Error registering user: ', error); }
    );
  });
};

export const loginUser = async (email, password, callback) => {
  const db = await dbPromise;
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM users WHERE email = ? AND password = ?;',
      [email, password],
      (tx, results) => { callback(results); },
      error => { console.log('Error logging in: ', error); }
    );
  });
};
