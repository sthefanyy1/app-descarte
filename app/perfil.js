import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text } from 'react-native';
import {  Appbar, TextInput, Button } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { Header } from 'react-native/Libraries/NewAppScreen';
import auth from '../firebase.config';
import { sendPasswordResetEmail } from "firebase/auth";

const Perfil = () => {

    const [nome, setNome] = React.useState('');
    const [atualizando, setAtualizando] = useState(false);

    // const handleAtualizando = async () => {
    //     try {
    //         setAtualizando(true);
    //         await sendPasswordResetEmail(auth, email)
    //         router.replace('/esqueceu2');
    //         setAtualizando(false);
    //     } catch (error) {
    //         console.error(error.code);
    //         console.error(error.message);
    //         setAtualizando(false);
    //     }
    // }


    return (
            <View style={styles.container}>
            <StatusBar style="auto" />

                <Appbar.Header style={styles.header}>
                        <Appbar.BackAction onPress={() => {router.back()}} color="#4CA04A" />
                </Appbar.Header>

                <View style={styles.content}>
                    <Text style={styles.texto}>
                        Mude seu perfil:{'\n'}
                    </Text>

                    <TextInput
                        style={styles.inputNome}
                        value={nome}
                        onChangeText={setNome}
                        textColor="#4CA04A"
                        autoCapitalize='none'
                        keyboardType='name'
                        activeUnderlineColor='#4CA04A'
                        label="Digite seu nome"
                    />

                    <Button mode='contained' onPress={() => handleAtualizando()} loading={atualizando} style={styles.botaoPronto}>Pronto!</Button>
                </View>

            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        margin: 30,
        marginLeft: 10,
        marginRight: 10,
        //marginTop:10,
        //justifyContent: 'space-around',
    },
    content: {
        flex: 1,
        padding: 2,
        justifyContent: 'space-around', 
    },
    header:{
        backgroundColor: '#fff',
    },
    texto: {
        //marginTop: -240,
        //margin: -15,
        marginLeft: 20,
        fontSize: 20,
        fontWeight: 'bold',
    },
    inputNome: {
        backgroundColor: '#fff',
        color: '#4CA04A',
        //marginTop: -150,
    },
    botaoPronto: {
        backgroundColor: '#4CA04A',
        borderRadius: 5,
        padding: 10,
    }
})

export default Perfil;
