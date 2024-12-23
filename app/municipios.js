import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Image, StyleSheet, Text, Pressable } from 'react-native';
import { Appbar, Avatar, Button } from 'react-native-paper';
import { router, Link } from 'expo-router';
import { auth } from '../firebase.config';

const Municipios = () => {

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <Appbar.Header style={styles.header}>
                <Appbar.BackAction onPress={() => {router.back()}} color="#4CA04A" />
            </Appbar.Header>
            
            {/* Contêiner para logo e avatar */}
            <View style={styles.header}>
                <Image source={require('./../assets/logo.jpeg')} style={styles.logotipo} />
                <Pressable onPress={() => router.navigate('/perfil')}>
                    <Avatar.Text size={50} label={auth.currentUser.displayName.charAt(0)} />
                </Pressable>
            </View>

            <Text style={styles.texto}>Olá, {auth.currentUser.displayName}{'\n'}</Text>
            <Text style={styles.texto}>Encontre pontos de coleta de acordo com seu Município:{'\n'}</Text>

            <Link href='/maceio' asChild>
                <Button mode='contained' textColor="green" style={styles.botaoMunicipio}>Maceió</Button>
            </Link>

            <Link href='/rioLargo' asChild>
                <Button mode='contained' textColor="green" style={styles.botaoMunicipio}>Rio Largo</Button>
            </Link>

            {/* <View style={styles.buttonContainer}>
                <Link href='/home' asChild>
                    <Button mode='contained' style={styles.botaoVoltar}>Voltar</Button>
                </Link>
            </View> */}

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
        justifyContent: 'flex-start', // Isso vai alinhar os elementos no topo
    },
    header: {
        backgroundColor: '#fff',
        flexDirection: 'row', // Alinha logo e avatar lado a lado
        justifyContent: 'space-between', // Dá um espaço entre os dois
        alignItems: 'center', // Alinha ambos verticalmente ao centro
        marginBottom: 20, // Espaçamento entre a parte superior e o conteúdo abaixo
    },
    logotipo: {
        width: 150,
        height: 150,
    },
    texto: {
        marginLeft: 20,
        fontSize: 20,
        fontWeight: 'bold',
    },
    botaoMunicipio: {
        backgroundColor: 'white',
        borderColor: 'green',
        borderRadius: 5,
        borderWidth: 1,
        padding: 10,
        width: 250,
        marginLeft: 50,
        marginTop: 40,
    },
    // buttonContainer: {
    //     marginTop: 150, // Ajuste mais flexível para o espaçamento entre o texto e o botão
    //     padding: 10,
    // },
    // botaoVoltar: {
    //     backgroundColor: '#4CA04A',
    //     borderRadius: 5,
    //     padding: 10,
    // }
});

export default Municipios;
