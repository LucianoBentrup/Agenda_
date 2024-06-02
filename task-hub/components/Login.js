import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { auth } from '../config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handlelogin = async () => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        navigation.navigate(Home);//Navegação para home?/calendario?
    } catch(error) {
        console.error('Erro ao realizar o Login',error); //Retorno do erro ao logar
    }
};
//Return (Lembrete)




//Styles (Lembrete)


//Login google mail (Lembrete)
}

export default Login;