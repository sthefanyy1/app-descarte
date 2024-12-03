import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text } from 'react-native';
import {  Appbar, TextInput, Button } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { Header } from 'react-native/Libraries/NewAppScreen';

const Esqueceu = () => {

    const [email, setEmail] = React.useState('');

    return (
            <View style={styles.container}>
            <StatusBar style="auto" />

                <Appbar.Header style={styles.header}>
                        <Appbar.BackAction onPress={() => {router.back()}} color="#4CA04A" />
                </Appbar.Header>

                <View style={styles.content}>
                    <Text style={styles.texto}>
                        Esqueceu sua senha?{'\n'}
                        Por favor, insira o e-mail vinculado a sua conta.
                    </Text>

                    <TextInput style={styles.inputEmail}
                    defaultValue={email}
                    onChangeText={setEmail}
                    textColor="#4CA04A"
                    autoCapitalize='none'
                    keyboardType='email-address'
                    activeUnderlineColor='#4CA04A'
                    label="Digite seu email"
                    />

                    <Link href='/esqueceu2' asChild>
                        <Button mode='contained' style={styles.botaoAvance}>Avançar</Button>
                    </Link>
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
        margin: -15,
        marginLeft: 20,
        fontSize: 20,
        fontWeight: 'bold',
    },
    inputEmail: {
        backgroundColor: '#fff',
        color: '#4CA04A',
        //marginTop: -150,
    },
    botaoAvance: {
        backgroundColor: '#4CA04A',
        borderRadius: 5,
        padding: 10,
    }
})

export default Esqueceu;