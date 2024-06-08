import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth, firestore } from './firebase';  // Import Firebase configuration

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigation = useNavigation();

    const handleRegister = () => {
        if (password === confirmPassword) {
            auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    user.updateProfile({ displayName: name });
                    firestore().collection('users').doc(user.uid).set({
                        name: name,
                        email: email
                    });
                    navigation.navigate('Login');
                })
                .catch(error => {
                    setError(error.message);
                });
        } else {
            setError('As senhas não conferem');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>CRIAR CONTA</Text>
            <Text style={styles.subtitle}>O segredo para o sucesso acadêmico começa aqui.</Text>
            <View style={styles.inputContainer}>
                <Icon name="user" size={20} color="#000" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    value={name}
                    onChangeText={setName}
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon name="envelope" size={20} color="#000" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#000" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#000" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Confirma senha"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />
            </View>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity onPress={handleRegister} style={styles.button}>
                <Text style={styles.buttonText}>Criar conta</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.backButton}>
                <Text style={styles.backButtonText}>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#000',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: '#000',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 20,
        padding: 10,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: '#000',
    },
    error: {
        color: 'red',
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#000',
        padding: 15,
        marginVertical: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    backButton: {
        backgroundColor: '#ccc',
        padding: 15,
        marginVertical: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    backButtonText: {
        color: '#000',
        fontSize: 16,
    },
});

export default RegisterScreen;
