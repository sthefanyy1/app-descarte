import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Image, StyleSheet, Text, Pressable } from 'react-native';
import { Button, Avatar } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { auth } from '../firebase.config';
import { MaterialCommunityIcons } from '@expo/vector-icons';  // Importando ícone

const Home = () => {

    const [usuario, setUsuario] = useState(auth.currentUser);
    const [encontrando] = useState(false); 

    const handleEncontrar = async () => {
        router.navigate('/municipios');
    };

    function isAdmin() {
        return (usuario.email == 'mescedilene@gmail.com') || (usuario.email == 'sthefanygraziely@gmail.com');
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            
            {/* Contêiner para logo e avatar */}
            <View style={styles.header}>
                <Image source={require('./../assets/logo.png')} style={styles.logotipo} />
                <Pressable onPress={() => router.navigate('/perfil')}>
                    <Avatar.Text size={50} label={auth.currentUser.displayName.charAt(0)} />
                </Pressable>
            </View>

            <Text style={styles.texto}>Olá, {auth.currentUser.displayName}{'\n'}</Text>
            <Text style={styles.texto}>Encontre pontos de coleta de acordo com seu Município:{'\n'}</Text>

            <View style={styles.buttonContainer}>
                {/* Botão com ícone e borda verde */}
                <Button 
                    mode="outlined" 
                    buttonColor='#f9f9f9' 
                    textColor="green" 
                    onPress={() => handleEncontrar()} loading={encontrando}
                    icon={({ size, color }) => (
                        <MaterialCommunityIcons name="chevron-down" size={size} color={color} />
                    )}
                    style={styles.botaoMunicipio} // Adicionando o estilo para borda verde
                >
                    Escolha seu Município
                </Button>

                {isAdmin() && (
                    <Link href='/admin' asChild>
                        <Button mode='contained' textColor='green' style={styles.botaoAdmin}>Administrador</Button>
                    </Link>
                )}
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
    buttonContainer: {
        marginTop: 20, // Ajuste mais flexível para o espaçamento entre o texto e o botão
        padding: 10,
    },
    botaoMunicipio: {
        borderColor: '#346E33', // Definindo a borda como verde
        borderWidth: 1, // Espessura da borda
        borderRadius: 10,
    },
    botaoAdmin: {
        backgroundColor: '#f9f9f9',
        borderColor: '#346E33',
        borderRadius: 5,
        borderWidth: 1,
        padding: 10,
        width: 250,
        marginLeft: 50,
        marginTop: 300,
    },
});

export default Home;
