import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, Alert } from 'react-native';
import {  Appbar, TextInput, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { auth } from '../firebase.config';
import { updateProfile, signOut } from "firebase/auth";

const Perfil = () => {

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            router.replace('/');
        } catch (error) {
            console.error(error.code);
            console.error(error.message);
        }
    };

    const [nome, setNome] = React.useState(auth.currentUser.displayName); //aparecer o nome cadastrado
    const [atualizando, setAtualizando] = useState(false);

    const handleName = async () => { 
        setAtualizando(true);
        try {
            await updateProfile(auth.currentUser, {displayName: nome});
            setAtualizando(false);
            router.replace('/home');
            Alert.alert('Sucesso', 'Nome atualizado com sucesso!');
        }
        catch (error) {
            Alert.error('Erro ao alterar seu nome.');
        }
    };

    return (
            <View style={styles.container}>
            <StatusBar style="auto" />

                <Appbar.Header style={styles.header}>
                        <Appbar.BackAction onPress={() => {router.back()}} color="#346E33" />
                </Appbar.Header>

                    <Text style={styles.texto}>
                        Mude seu perfil:{'\n'}
                    </Text>

                    <TextInput
                        style={styles.inputNome}
                        value={nome}
                        onChangeText={setNome}
                        textColor="#346E33"
                        autoCapitalize='none'
                        keyboardType='name'
                        activeUnderlineColor='#346E33'
                        label="Digite seu nome"
                    />

                    <Button mode='contained' onPress={() => handleName()} loading={atualizando} style={styles.botaoPronto}>Pronto!</Button>

                    <Button mode='contained' textColor='#346E33' onPress={() => handleSignOut()} style={styles.sair}>Sair</Button>
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
    inputNome: {
        marginTop: 50,
        marginBottom: 50,
        backgroundColor: '#fff',
        color: '#346E33',
    },
    botaoPronto: {
        backgroundColor: '#346E33',
        borderRadius: 5,
        marginTop: 50,
        padding: 10,
    },
    sair: {
        backgroundColor: '#fff',
        borderRadius: 20,
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
})

export default Perfil;