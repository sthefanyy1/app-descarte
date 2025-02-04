import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { auth } from '../firebase.config';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';

const Cadastrar = () => {
    const [nome, setNome] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = React.useState('');
    const [confirmar, setConfirmar] = React.useState('');
    const [senhaVisivel, setSenhaVisivel] = React.useState(false); // Visibilidade da senha
    const [confirmarVisivel, setConfirmarVisivel] = React.useState(false); // Visibilidade da confirmação
    const [cadastrando, setCadastrando] = useState(false);
    const [erro, setErro] = useState('');

    const handleCadastrar = async () => {
        if (senha !== confirmar) {
            Alert.alert('Atenção', 'As senhas não coincidem', [{ text: 'OK' }]);
            return;
        }
        try {
            setCadastrando(true);
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
            await updateProfile(userCredential.user, { displayName: nome });
            await sendEmailVerification(userCredential.user);
            Alert.alert(
                'Verificação de E-mail',
                'Um e-mail de verificação foi enviado para o seu endereço de e-mail. Por favor, verifique sua caixa de entrada.',
                [{ text: 'OK' }]
            );
            console.log(userCredential.user);
            router.replace('/');
            setCadastrando(false);
        } catch (error) {
            //console.error(error.code);
            //console.error(error.message);
            setErro(error.message);
            setCadastrando(false);
        }
    }

    return (
        <View style={styles.container}>
            <View>
            <StatusBar style="auto" />
                <Appbar.Header style={styles.header}>
                    <Appbar.BackAction onPress={() => { router.back() }} color="#346E33" />
                </Appbar.Header>

                <Text style={styles.texto}>Olá! {'\n'}Vamos começar? </Text>
            </View>

            <TextInput
                style={styles.inputNome}
                value={nome}
                onChangeText={setNome}
                textColor="#346E33"
                autoCapitalize='none'
                keyboardType='name'
                activeUnderlineColor='#346E33'
                label="Digite seu nome"
            />

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
                secureTextEntry={!senhaVisivel} // Controla visibilidade da senha
                right={
                    <TextInput.Icon
                        icon={senhaVisivel ? "eye" : "eye-off"} // Alterna o ícone
                        onPress={() => setSenhaVisivel(!senhaVisivel)} // Alterna o estado
                    />
                }
                maxLength={6}
                activeUnderlineColor='#346E33'
                label="Digite sua senha"
            />

            <TextInput
                style={styles.inputSenha}
                value={confirmar}
                onChangeText={setConfirmar}
                textColor="#346E33"
                autoCapitalize='none'
                secureTextEntry={!confirmarVisivel} // Controla visibilidade da confirmação
                right={
                    <TextInput.Icon
                        icon={confirmarVisivel ? "eye" : "eye-off"} // Alterna o ícone
                        onPress={() => setConfirmarVisivel(!confirmarVisivel)} // Alterna o estado
                    />
                }
                maxLength={6} // Limite de 6 digitos
                activeUnderlineColor='#346E33'
                label="Confirme sua senha"
            />

            {erro && <Text style={{ color:'red', marginLeft: 10 }}>Preencha todos os campos.</Text>} 

            <Button mode='contained' onPress={() => handleCadastrar()} loading={cadastrando} style={styles.botaoEntre}>Cadastrar</Button>
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
    inputNome: {
        marginTop: 30,
        marginBottom: 50,
        backgroundColor: '#fff',
        color: '#346E33',
    },
    inputEmail: {
        marginTop: 10,
        marginBottom: 50,
        backgroundColor: '#fff',
        color: '#346E33',
    },
    inputSenha: {
        marginTop: 10,
        marginBottom: 50,
        backgroundColor: '#fff',
        color: '#346E33',
    },
    botaoEntre: {
        backgroundColor: '#346E33',
        borderRadius: 5,
        marginTop: 10,
        padding: 10,
    },
});

export default Cadastrar;