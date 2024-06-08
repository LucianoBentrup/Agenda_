import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { verifyUser } from '../database/database';  // Updated path

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation();

    const handleLogin = () => {
        verifyUser(email, password, (isValid) => {
            if (isValid) {
                navigation.navigate('Calendario');
            } else {
                setError('Email ou senha incorretos');
            }
        });
    };

    const handleGoogleLogin = () => {
        // Adicionar funcionalidade de login com Google aqui
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>TASK HUB</Text>
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
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
                    <Icon name={showPassword ? "eye" : "eye-slash"} size={20} color="#000" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Esqueceu sua senha? <Text style={styles.forgotPasswordLink}>Clique aqui!</Text></Text>
            </TouchableOpacity>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.button}>
                <Text style={styles.buttonText}>Criar conta</Text>
            </TouchableOpacity>
            <Text style={styles.orText}>OU</Text>
            <TouchableOpacity onPress={handleGoogleLogin} style={styles.googleButton}>
                <Text style={styles.googleButtonText}>Logar com o Google</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 20,
        width: '100%',
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
        paddingHorizontal: 10,
        color: '#000',
    },
    eyeButton: {
        padding: 5,
    },
    forgotPassword: {
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: '#000',
    },
    forgotPasswordLink: {
        color: '#0000FF',
        textDecorationLine: 'underline',
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
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    orText: {
        marginVertical: 10,
        fontSize: 16,
        color: '#000',
    },
    googleButton: {
        backgroundColor: '#4285F4',
        padding: 15,
        alignItems: 'center',
        width: '100%',
    },
    googleButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default LoginScreen;
