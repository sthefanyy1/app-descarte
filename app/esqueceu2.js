import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {  Appbar, TextInput, Button } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { Header } from 'react-native/Libraries/NewAppScreen';

const Finalizar = () => {

    const [senha, setSenha] = React.useState('');
    const [confirmar, setConfirmar] = React.useState('');
    const [senhaVisivel, setSenhaVisivel] = React.useState(false); // Visibilidade da senha
    const [confirmarVisivel, setConfirmarVisivel] = React.useState(false); // Visibilidade da confirmação

    return (
            <View style={styles.container}>

                <Appbar.Header style={styles.header}>
                        <Appbar.BackAction onPress={() => {router.back()}} color="#4CA04A" />
                </Appbar.Header>

                <View style={styles.content}>
                    <Text style={styles.texto}>
                        Pronto!{'\n'}
                        Crie sua nova senha
                    </Text>

                    <TextInput style={styles.inputSenha}
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
                    label="Digite uma senha"
                />

                <TextInput style={styles.inputSenha}
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
                    label="Confirmar senha"
                />

                    <Link href='/esqueceu3' asChild>
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
    inputSenha: {
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

export default Finalizar;