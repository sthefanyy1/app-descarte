import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text } from 'react-native';
import {  Appbar, TextInput, Button } from 'react-native-paper';
import { router } from 'expo-router';
//import { Header } from 'react-native/Libraries/NewAppScreen';
import { auth } from '../firebase.config';
import { sendPasswordResetEmail } from "firebase/auth";

const Esqueceu = () => {

    const [email, setEmail] = React.useState('');
    const [redefinindo, setRedefinindo] = useState(false);

    const handleRedefinir = async () => {
        try {
            setRedefinindo(true);
            await sendPasswordResetEmail(auth, email)
            router.replace('/novaSenha');
            setRedefinindo(false);
        } catch (error) {
            console.error(error.code);
            console.error(error.message);
            setRedefinindo(false);
        }
    };

    return (
            <View style={styles.container}>
            <StatusBar style="auto" />

                <Appbar.Header style={styles.header}>
                        <Appbar.BackAction onPress={() => {router.back()}} color="#346E33" />
                </Appbar.Header>

                    <Text style={styles.texto}>
                        Esqueceu sua senha?{'\n'}
                        Por favor, insira o e-mail vinculado a sua conta.
                    </Text>

                    <TextInput style={styles.inputEmail}
                    defaultValue={email}
                    onChangeText={setEmail}
                    textColor="#346E33"
                    autoCapitalize='none'
                    keyboardType='email-address'
                    activeUnderlineColor='#346E33'
                    label="Digite seu email"
                    />

                    <Button mode='contained' onPress={() => handleRedefinir()} loading={redefinindo} style={styles.botaoAvance}>Avançar</Button>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'justify-content',
    },
    header:{
        backgroundColor: '#fff',
    },
    texto: {
        marginLeft: 20,
        fontSize: 20,
        fontWeight: 'bold',
    },
    inputEmail: {
        marginTop: 50,
        marginBottom: 50,
        backgroundColor: '#fff',
        color: '#346E33',
    },
    botaoAvance: {
        marginTop: 16,
        backgroundColor: '#346E33',
        borderRadius: 5,
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold',
    }
})

export default Esqueceu;