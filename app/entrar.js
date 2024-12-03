import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';
import { Link, router, useRouter } from 'expo-router';
import auth from '../firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Entrar = () => {
    const router = useRouter();
    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = React.useState('');
    const [senhaVisivel, setSenhaVisivel] = React.useState(false); // Estado para controlar a visibilidade da senha

    const handleLogin = () => {
        console.log('handleLogin');
        signInWithEmailAndPassword(auth, email , senha)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log('logado com sucesso');
          console.log(user.uid);
          router.replace('/home');
          // ...
        })
        .catch((error) => {
        //   const errorCode = error.code;
        //   const errorMessage = error.message;
        //   console.error(errorCode);
        //   console.error(errorMessage);
          Alert.alert('Deu erro', 'Algo errado no seu login', [
            {
                text: 'Cancelar',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
        });
      }

    return (
        <View style={styles.container}>
            <View>
            <StatusBar style="auto" />
                <Appbar.Header style={styles.header}>
                    <Appbar.BackAction onPress={() => { router.back() }} color="#4CA04A" />
                </Appbar.Header>

                <Text style={styles.texto}>Bem-vindo(a) de volta! {'\n'}Faça seu login </Text>
            </View>

            <TextInput
                style={styles.inputEmail}
                value={email}
                onChangeText={setEmail}
                textColor="#4CA04A"
                autoCapitalize='none'
                keyboardType='email-address'
                activeUnderlineColor='#4CA04A'
                label="Digite seu email"
            />

            <TextInput
                style={styles.inputSenha}
                value={senha}
                onChangeText={setSenha}
                textColor="#4CA04A"
                autoCapitalize='none'
                secureTextEntry={!senhaVisivel} // Controla se a senha está oculta
                right={
                    <TextInput.Icon
                        icon={senhaVisivel ? "eye" : "eye-off"} // Alterna o ícone
                        onPress={() => setSenhaVisivel(!senhaVisivel)} // Alterna o estado
                    />
                }
                maxLength={6} // Limite de 6 digitos
                activeUnderlineColor='#4CA04A'
                label="Digite sua senha"
            />

            <Link href='/esqueceu1' style={styles.textoEsqueceu}>Esqueceu sua senha?</Link>

            <Button mode='contained' onPress={() => handleLogin()} style={styles.botaoEntre}>Entrar</Button>
      
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
        justifyContent: 'space-around',
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
    },
});

export default Entrar;
