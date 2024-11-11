import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { TextInput, IconButton } from 'react-native-paper';
import { Link } from 'expo-router';

const Entrar = () => {
    return (
        <View style={styles.container}>
            <Link style={styles.voltar} href='/'>
                <IconButton icon="home" size={24} iconColor="#4ca04a"/>
            </Link>
            <Text style={styles.texto}>Bem-vindo(a) de volta!</Text>
            <Text style={styles.texto}>Faça seu login</Text>

            <TextInput style={styles.inputEmail}
                defaultValue={email}
                onChangeText={setEmail}
                textColor="#fff"
                autoCapitalize='words'
                activeUnderlineColor='#4ca04a'
                label="Digite seu email"
            />
            <TextInput  style={styles.inputSenha}
                defaultValue={senha}
                onChangeText={setSenha}
                textColor="#fff"
                autoCapitalize='words'
                activeUnderlineColor='#4ca04a'
                label="Digite seu email"
            />

        </View>
    );
}

const styles = StyleSheet.create({})

export default Entrar;