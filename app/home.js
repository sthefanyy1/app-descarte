import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import { router } from 'expo-router';
import auth from '../firebase.config';
import { signOut } from "firebase/auth";

const Home = () => {

const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            router.replace('/');
            console.log('Saiu');
        }).catch((error) => {
            // An error happened.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode);
        console.error(errorMessage);
    });
}

    return (
        <View style={styles.container}>
            <View>
            <StatusBar style="auto" />
                <Appbar.Header style={styles.header}>
                    <Appbar.BackAction onPress={() => { router.back() }} color="#4CA04A" />
                </Appbar.Header>

                <Text style={styles.texto}>Olá! Você está logado.{'\n'} </Text>

                <Button onPress={() => handleSignOut()} style={styles.sair}>Sair</Button>
            </View>
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
        justifyContent: 'space-around',
    },
    header: {
        backgroundColor: '#fff',
    },
    texto: {
        marginLeft: 20,
        fontSize: 20,
        fontWeight: 'bold',
    },
    sair: {
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4CA04A',
        textDecorationLine: 'underline',
    },
});

export default Home;
