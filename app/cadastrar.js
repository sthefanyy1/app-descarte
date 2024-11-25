import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {  Appbar, TextInput, IconButton, Button } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { Header } from 'react-native/Libraries/NewAppScreen';

const Cadastrar = () => {

    const [nome, setNome] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = React.useState('');
    const [confirmar, setConfirmar] = React.useState('');

    return (
            <View style={styles.container}>

               <Appbar.Header style={styles.header}>
                    <Appbar.BackAction onPress={() => {router.back()}} color="#4CA04A" />
                </Appbar.Header> 

                <Text style={styles.texto}>    Olá! {'\n'}    Vamos começar? </Text>

                <TextInput style={styles.inputNome}
                    defaultValue={nome}
                    onChangeText={setNome}
                    textColor="#4CA04A"
                    autoCapitalize='none'
                    keyboardType='name'
                    activeUnderlineColor='#4CA04A'
                    label="Digite seu nome"
                />

                <TextInput style={styles.inputEmail}
                    defaultValue={email}
                    onChangeText={setEmail}
                    textColor="#4CA04A"
                    autoCapitalize='none'
                    keyboardType='email-address'
                    activeUnderlineColor='#4CA04A'
                    label="Digite seu email"
                />

                <TextInput style={styles.inputSenha}
                    defaultValue={senha}
                    onChangeText={setSenha}
                    textColor="#4CA04A"
                    autoCapitalize='words'
                    secureTextEntry={true} //esconde a senha
                    right={<TextInput.Icon icon="eye" />} //exibe o icone de olho
                    maxLength={6} //tamanho da senha - senha com 6 digitos
                    activeUnderlineColor='#4CA04A'
                    label="Digite sua senha"
                />

                <TextInput style={styles.inputSenha}
                    defaultValue={confirmar}
                    onChangeText={setConfirmar}
                    textColor="#4CA04A"
                    autoCapitalize='words'
                    secureTextEntry={true} //esconde a senha
                    right={<TextInput.Icon icon="eye" />} //exibe o icone de olho
                    maxLength={6} //tamanho da senha - senha com 6 digitos
                    activeUnderlineColor='#4CA04A'
                    label="Confrime sua senha"
                />

                <Link href='/' asChild> 
                    <Button mode='contained' style={styles.botaoEntre}>Entrar</Button>
                </Link> 

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
        //marginTop:10,
        justifyContent: 'space-around',
    },
    header:{
        backgroundColor: '#fff',
    },
    texto: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    inputNome:{
        backgroundColor: '#fff',
        color: '#4CA04A',
    },
    inputEmail: {
        backgroundColor: '#fff',
        color: '#4CA04A',
    },
    inputSenha: {
        backgroundColor: '#fff',
        color: '#4CA04A',
    },
    botaoEntre:{
        backgroundColor: '#4CA04A',
        borderRadius: 5,
        marginTop: 10,
        padding: 10,
    }
})

export default Cadastrar;