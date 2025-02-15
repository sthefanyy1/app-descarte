import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';
import { Link, router, useRouter } from 'expo-router';
import { auth } from '../firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Entrar = () => {
    const router = useRouter();
    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = React.useState('');
    const [senhaVisivel, setSenhaVisivel] = React.useState(false); // Estado para controlar a visibilidade da senha
    const [logando, setLogando] = useState(false);

    const handleLogin = async () => {
        try {
            setLogando(true);
            const userCredential = await signInWithEmailAndPassword(auth, email, senha);
            const user = userCredential.user;
    
            // Verifique se o e-mail foi verificado
            if (!user.emailVerified) {
                setLogando(false);
                Alert.alert('Verifique seu e-mail', 'Por favor, verifique seu e-mail antes de continuar.');
                return; // Impede o login se o e-mail não for verificado
            }
    
            console.log(user.displayName);
            setLogando(false);
            router.replace('/home');
        } catch (error) {
            //const errorCode = error.code;
            //const errorMessage = error.message;
            //console.error(errorCode);
            //console.error(errorMessage);
            setLogando(false);
            Alert.alert('Deu erro', 'E-mail/Senha inválido ou não cadastrado', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        }
    };
    
    return (
        <View style={styles.container}>
            <View>
            <StatusBar style="auto" />
                <Appbar.Header style={styles.header}>
                    <Appbar.BackAction onPress={() => { router.back() }} color="#346E33" />
                </Appbar.Header>

                <Text style={styles.texto}>Bem-vindo(a) de volta! {'\n'}Faça seu login </Text>
            </View>

            <TextInput
                style={styles.inputEmail}
                value={email}
                onChangeText={setEmail}
                textColor="#346E33"
                autoCapitalize='none'
                keyboardType='email-address'
                activeUnderlineColor='#346E33'
                label="Digite seu e-mail"
            />

            <TextInput
                style={styles.inputSenha}
                value={senha}
                onChangeText={setSenha}
                textColor="#346E33"
                autoCapitalize='none'
                secureTextEntry={!senhaVisivel} // Controla se a senha está oculta
                right={
                    <TextInput.Icon
                        icon={senhaVisivel ? "eye" : "eye-off"} // Alterna o ícone
                        onPress={() => setSenhaVisivel(!senhaVisivel)} // Alterna o estado
                    />
                }
                maxLength={6} // Limite de 6 digitos
                activeUnderlineColor='#346E33'
                label="Digite sua senha"
            />

            <Link href='/redefinirSenha' style={styles.textoEsqueceu}>Esqueceu sua senha?</Link>

            <Button mode='contained' onPress={() => handleLogin()} loading={logando} style={styles.botaoEntre}>Entrar</Button>
      
            <Text style={styles.textoCadastre}>Ainda não possui uma conta?{'\n'}
                <Link href='/cadastrar' style={styles.fazerConta}>Faça sua conta</Link>
            </Text>
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
    header: {
        backgroundColor: '#fff',
    },
    texto: {
        marginLeft: 20,
        fontSize: 20,
        fontWeight: 'bold',
    },
    inputEmail: {
        marginTop: 50,
        marginBottom: 50,
        backgroundColor: '#fff',
        color: '#346E33',
    },
    inputSenha: {
        marginBottom: 50,
        backgroundColor: '#fff',
        color: '#346E33',
    },
    textoEsqueceu: {
        color: '#000000',
        fontSize: 15,
        textAlign: 'right',
        fontWeight: 'bold',
    },
    botaoEntre: {
        backgroundColor: '#346E33',
        borderRadius: 5,
        padding: 10,
        marginTop: 50,
    },
    textoCadastre: {
        color: '#000000',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 50,
    },
    fazerConta: {
        color: '#346E33',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
    },
});

export default Entrar;