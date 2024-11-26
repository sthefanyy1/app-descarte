import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {  Appbar, TextInput, Button } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { Header } from 'react-native/Libraries/NewAppScreen';

const Entrar = () => {

    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = React.useState('');

    return (
            <View style={styles.container}>

                <View>
                    <Appbar.Header style={styles.header}>
                     <Appbar.BackAction onPress={() => {router.back()}} color="#4CA04A" />
                    </Appbar.Header> 

                    <Text style={styles.texto}>Bem-vindo(a) de volta! {'\n'}Faça seu login </Text>
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

                <TextInput  style={styles.inputSenha}
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

                <Link href='/esqueceu' style={styles.textoEsqueceu}>Esqueceu sua senha?</Link>

                <Link href='/' asChild> 
                    <Button mode='contained' style={styles.botaoEntre}>Entrar</Button>
                </Link> 

                <Text style={styles.textoCadastre}>Ainda não possui uma conta?{'\n'}
                    <Link href='/cadastrar' style={styles.fazerConta}>Faça sua conta</Link> 
                </Text>

                {/* <Link href='/cadastrar' style={styles.textoCadastre}>Ainda não possui uma conta?</Link> */}

                {/* <Link href='/' style={styles.fazerConta}>Faça sua conta</Link>  */}

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
        marginLeft: 20,
        fontSize: 20,
        fontWeight: 'bold',
    },
    inputEmail: {
        backgroundColor: '#fff',
        color: '#4CA04A',
    },
    inputSenha: {
        backgroundColor: '#fff',
        color: '#4CA04A',
    },
    textoEsqueceu: { 
        color: '#000000',
        fontSize: 15,
        textAlign: 'right',
        fontWeight: 'bold',
    },
    botaoEntre: {
        backgroundColor: '#4CA04A',
        borderRadius: 5,
        padding: 10,
    },
    textoCadastre: {
        color: '#000000',
        fontSize: 15,
        textAlign: 'center',
    },
    fazerConta: {
        color: '#4CA04A',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
    }
})

export default Entrar;