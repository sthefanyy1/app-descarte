import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Image, StyleSheet, Text, Pressable } from 'react-native';
import { Button, Avatar, FAB, Portal, PaperProvider } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { auth } from '../firebase.config';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Home = () => {

    const [usuario, setUsuario] = useState(auth.currentUser);
    const [encontrando] = useState(false);
    const [fabState, setFabState] = useState({ open: false }); // Estado do FAB

    const onStateChange = ({ open }) => setFabState({ open });
    const { open } = fabState;

    const handleEncontrar = async () => {
        router.navigate('/municipios');
    };

    const navigateToAdmin = () => {
        router.navigate('/admin'); // Navegar para a página de admin
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
                    <Text style={styles.user}>Usuário</Text>
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
            </View>

            {isAdmin() && (
                <PaperProvider>
                    <Portal>
                        <FAB.Group
                            style={{ backgroundColor: '#fff', color: '#346E33' }}
                            open={open}
                            visible
                            icon={open ? 'plus' : 'plus'}
                            actions={[
                                {
                                    icon: 'star',
                                    label: 'Admin',
                                    color: '#346E33',
                                    onPress: navigateToAdmin, // Navegar para a página de admin
                                },
                            ]}
                            onStateChange={onStateChange}
                            onPress={() => {
                                if (open) {
                                    // Ação se o FAB estiver aberto
                                }
                            }}
                        />
                    </Portal>
                </PaperProvider>
            )}
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
        justifyContent: 'flex-start', 
    },
    header: {
        flexDirection: 'row', // Alinha logo e avatar lado a lado
        justifyContent: 'space-between', // Dá um espaço entre os dois
        alignItems: 'center', 
        marginBottom: 20, 
    },
    logotipo: {
        width: 150,
        height: 150,
    },
    user:{
        fontSize: 15,
        fontWeight: 'bold',
    },
    texto: {
        marginLeft: 20,
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttonContainer: {
        marginTop: 20, 
        padding: 10,
    },
    botaoMunicipio: {
        borderColor: '#346E33', // Definindo a borda como verde
        borderWidth: 1, // Espessura da borda
        borderRadius: 10,
    },
});

export default Home;