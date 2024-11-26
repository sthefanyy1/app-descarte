import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {  Appbar, TextInput, IconButton, Button } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { Header } from 'react-native/Libraries/NewAppScreen';

const Cadastrar = () => {

    const [email, setEmail] = React.useState('');

    return (
            <View>
                <Appbar.Header style={styles.header}>
                    <Appbar.BackAction onPress={() => {router.back()}} color="#4CA04A" />
                </Appbar.Header> 
                <View style={styles.container1}> 
                    <View style={styles.container}>
                        <Text style={styles.texto}>Esqueceu sua senha?</Text>
                        <Text style={styles.subTexto}>Por favor, insira o e-mail vinculado a sua conta.</Text>
                    </View>

                <TextInput style={styles.inputEmail}
                    defaultValue={email}
                    onChangeText={setEmail}
                    textColor="#4CA04A"
                    autoCapitalize='none'
                    keyboardType='email-address'
                    activeUnderlineColor='#4CA04A'
                    label="Digite seu email"
                />

                <Link href='/' asChild> 
                    <Button mode='contained' style={styles.botaoAvance}>Avançar</Button>
                </Link> 

                </View>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#180909',
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        //marginTop:10,
        justifyContent: 'flex-start',
    },
    container1: {
        flex: 1,
        backgroundColor: '#817f7f',
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        //marginTop:10,
        justifyContent: 'space-around',
    },
    header:{
        backgroundColor: '#2e24c2',
    },
    texto:{
        marginLeft: 20,
        fontSize: 20,
        fontWeight: 'bold',
    },
    subTexto:{
        marginLeft: 20,
        fontSize: 13,
    },
    inputEmail:{
        backgroundColor: '#fff',
        color: '#4CA04A',
    },
    botaoAvance:{
        backgroundColor: '#4CA04A',
        borderRadius: 5,
        marginTop: 10,
        padding: 10,
    }
})

export default Cadastrar;