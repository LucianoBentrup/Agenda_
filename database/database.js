import AsyncStorage from '@react-native-async-storage/async-storage';

// Função para armazenar dados de usuários
const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error("Error storing data: ", e);
  }
};

// Função para recuperar dados de usuários
const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Error retrieving data: ", e);
  }
};

// Função para criar um usuário
export const addUser = async (email, password, callback) => {
  try {
    let users = await getData('users');
    if (!users) {
      users = [];
    }
    users.push({ email, password });
    await storeData('users', users);
    callback(true);
  } catch (e) {
    console.error("Error adding user: ", e);
    callback(false);
  }
};

// Função para verificar um usuário
export const verifyUser = async (email, password, callback) => {
  try {
    const users = await getData('users');
    if (users) {
      const user = users.find(user => user.email === email && user.password === password);
      callback(!!user);
    } else {
      callback(false);
    }
  } catch (e) {
    console.error("Error verifying user: ", e);
    callback(false);
  }
};
