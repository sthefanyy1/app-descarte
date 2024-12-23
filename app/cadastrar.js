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
            setErro('As senhas não coincidem');
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
            console.error(error.code);
            console.error(error.message);
            setErro(error.message);
            setCadastrando(false);
        }
    }

    return (
        <View style={styles.container}>
            <View>
            <StatusBar style="auto" />
                <Appbar.Header style={styles.header}>
                    <Appbar.BackAction onPress={() => { router.back() }} color="#4CA04A" />
                </Appbar.Header>

                <Text style={styles.texto}>Olá! {'\n'}Vamos começar? </Text>
            </View>

            <TextInput
                style={styles.inputNome}
                value={nome}
                onChangeText={setNome}
                textColor="#4CA04A"
                autoCapitalize='none'
                keyboardType='name'
                activeUnderlineColor='#4CA04A'
                label="Digite seu nome"
            />

            <TextInput
                style={styles.inputEmail}
                value={email}
                onChangeText={setEmail}
                textColor="#4CA04A"
                autoCapitalize='none'
                keyboardType='email-address'
                activeUnderlineColor='#4CA04A'
                label="Digite seu e-mail"
            />

            <TextInput
                style={styles.inputSenha}
                value={senha}
                onChangeText={setSenha}
                textColor="#4CA04A"
                autoCapitalize='none'
                secureTextEntry={!senhaVisivel} // Controla visibilidade da senha
                right={
                    <TextInput.Icon
                        icon={senhaVisivel ? "eye" : "eye-off"} // Alterna o ícone
                        onPress={() => setSenhaVisivel(!senhaVisivel)} // Alterna o estado
                    />
                }
                maxLength={6}
                activeUnderlineColor='#4CA04A'
                label="Digite sua senha"
            />

            <TextInput
                style={styles.inputSenha}
                value={confirmar}
                onChangeText={setConfirmar}
                textColor="#4CA04A"
                autoCapitalize='none'
                secureTextEntry={!confirmarVisivel} // Controla visibilidade da confirmação
                right={
                    <TextInput.Icon
                        icon={confirmarVisivel ? "eye" : "eye-off"} // Alterna o ícone
                        onPress={() => setConfirmarVisivel(!confirmarVisivel)} // Alterna o estado
                    />
                }
                maxLength={6} // Limite de 6 digitos
                activeUnderlineColor='#4CA04A'
                label="Confirme sua senha"
            />

            {erro && <Text style={{ color:'red', marginLeft: 20 }}>E-mail/Senha inválido.</Text>}

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
    inputNome: {
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
    botaoEntre: {
        backgroundColor: '#4CA04A',
        borderRadius: 5,
        marginTop: 10,
        padding: 10,
    },
});

export default Cadastrar;
