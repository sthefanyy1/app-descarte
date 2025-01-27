import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';
import { router } from 'expo-router';

const Admin = () => {
    const [nomePonto, setNomePonto] = useState('');
    const [endereco, setEndereco] = useState('');
    const [telefone, setTelefone] = useState('');

    const handleSave = () => {
        Alert.alert('Ponto salvo!', `Nome: ${nomePonto}`);
    };

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.header}>
                <Appbar.BackAction onPress={() => { router.back() }} color="#346E33" />
            </Appbar.Header>

            <Text style={styles.texto}>Adicionar Ponto de Coleta:{'\n'}{'\n'}</Text>

            <TextInput
                style={styles.input}
                value={nomePonto}
                onChangeText={setNomePonto}
                textColor="#346E33"
                autoCapitalize='none'
                keyboardType='default'
                activeUnderlineColor='#346E33'
                label="Nome do Ponto"
            />

            <TextInput
                style={styles.input}
                value={endereco}
                onChangeText={setEndereco}
                textColor="#346E33"
                autoCapitalize='none'
                keyboardType='default'
                activeUnderlineColor='#346E33'
                label="Endereço"
            />

            <TextInput
                style={styles.input}
                value={telefone}
                onChangeText={setTelefone}
                textColor="#346E33"
                autoCapitalize='none'
                keyboardType='phone-pad'
                activeUnderlineColor='#346E33'
                label="Telefone"
            />

            <Button 
                mode="contained" 
                onPress={handleSave} 
                style={styles.button}
            >
                Salvar
            </Button>

            <StatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'justify-content',
    },
    header: {
        backgroundColor: '#fff',
    },
    texto: {
        marginLeft: 20,
        fontSize: 20,
        fontWeight: 'bold',
    },
    input: {
        marginBottom: 50,
        backgroundColor: '#fff',
        color: '#346E33',
    },
    button: {
        marginTop: 16,
        backgroundColor: '#346E33',
        borderRadius: 5,
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Admin;
