import React from 'react';
import { KeyboardAvoidingView, View, StyleSheet, Text } from 'react-native';
import {  Appbar, TextInput, IconButton, Button } from 'react-native-paper';
import { Link, router } from 'expo-router';

const Entrar = () => {

    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = React.useState('');

    return (
            <View style={styles.container}>
            
                {/* <Link style={styles.voltar} href='/'>
                    <IconButton icon="arrow-left" size={24} iconColor="#4CA04A"/>
                </Link> */}

                <Appbar.Header>
                    <Appbar.BackAction style={styles.voltar}  onPress={() => {router.back()}} />
                </Appbar.Header>

                <Text style={styles.texto}>Bem-vindo(a) de volta! {'\n'}Faça seu login </Text>

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
                    maxLength={5} //tamanho da senha - senha com 5 digitos
                    activeUnderlineColor='#4CA04A'
                    label="Digite sua senha"
                />

                <Text style={styles.textoEsqueceu}>Esqueceu sua senha?</Text>

                <Link href='/' asChild> 
                    <Button mode='contained' style={styles.botaoEntre}>Entrar</Button>
                </Link> 

                <Text style={styles.textoCadastre}>Ainda não possui uma conta?</Text>

                <Link href='/' style={styles.fazerConta}>Faça sua conta</Link> 

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
    voltar: {
        // top: 20,
        // left: 20,
        //backgroundColor: '#fff',
        //color: '#4CA04A',
    },
    texto: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    inputEmail: {
        backgroundColor: '#fff',
        color: '#4CA04A',
        borderRadius: 5,
    },
    inputSenha: {
        backgroundColor: '#fff',
        color: '#4CA04A',
        borderRadius: 5,
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