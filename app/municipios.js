import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Image, StyleSheet, Text, Pressable } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { router, Link } from 'expo-router';
import auth from '../firebase.config';

const Municipios = () => {

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            
            {/* Contêiner para logo e avatar */}
            <View style={styles.header}>
                <Image source={require('./../assets/logo.jpeg')} style={styles.logotipo} />
                <Pressable onPress={() => router.navigate('/perfil')}>
                    <Avatar.Text size={50} label={auth.currentUser.displayName.charAt(0)} />
                </Pressable>
            </View>

            <Text style={styles.texto}>Olá, {auth.currentUser.displayName}{'\n'}</Text>
            <Text style={styles.texto}>Encontre pontos de coleta de acordo com seu Município:{'\n'}</Text>

            <View style={styles.buttonContainer1}>
                <Link href='/maceio' asChild>
                    <Button mode='contained' style={styles.botaoMaceio}>Maceió</Button>
                </Link>
            </View>

            <View style={styles.buttonContainer2}>
                <Link href='/home' asChild>
                    <Button mode='contained' style={styles.botaoVoltar}>Voltar</Button>
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
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'flex-start', // Isso vai alinhar os elementos no topo
    },
    header: {
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
    buttonContainer1: {
        marginTop: 20, // Ajuste mais flexível para o espaçamento entre o texto e o botão
        padding: 10,
        borderColor: 'green', // Definindo a borda como verde
        borderWidth: 1, // Espessura da borda
        borderRadius: 10,
    },
    botaoMaceio: {
        backgroundColor: 'green',
        borderRadius: 5,
        padding: 10,
        width: 250,
        borderColor: 'green',
        borderWidth: 1,
        marginBottom: 20,
    },
    buttonContainer2: {
        marginTop: 200, // Ajuste mais flexível para o espaçamento entre o texto e o botão
        padding: 10,
    },
    botaoVoltar: {
        backgroundColor: '#4CA04A',
        borderRadius: 5,
        padding: 10,
    }
});

export default Municipios;