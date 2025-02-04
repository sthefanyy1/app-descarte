import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase.config';

const Admin = () => {
    const [nomePonto, setNomePonto] = useState('Ecoponto');
    const [endereco, setEndereco] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [telefone, setTelefone] = useState('08000822600'); // Todos são os mesmos contatos de telefone
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        if (!nomePonto ||!endereco ||!latitude ||!longitude) {
            Alert.alert('Atenção', 'Todos os campos são obrigatórios.');
            return;
        }
        try{
            setLoading(true);
            await addDoc(collection(db, "pontos"), {
                nome: nomePonto,
                endereco: endereco,
                telefone: telefone,
                coordenadas: {
                    latitude: parseFloat(latitude), 
                    longitude: parseFloat(longitude)
                }
            });
            router.replace('/home');
            Alert.alert('Ponto salvo!', `Nome: ${nomePonto}`);
        } catch (error) {
            console.error(error.code);
            console.error(error.message);
        } finally {
            setLoading(false);
        }
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
                value={latitude}
                onChangeText={setLatitude}
                textColor="#346E33"
                autoCapitalize='none'
                keyboardType='phone-pad'
                activeUnderlineColor='#346E33'
                label="Latitude"
            />

            <TextInput
                style={styles.input}
                value={longitude}
                onChangeText={setLongitude}
                textColor="#346E33"
                autoCapitalize='none'
                keyboardType='phone-pad'
                activeUnderlineColor='#346E33'
                label="Longitude"
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
                loading={loading} 
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