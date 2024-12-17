import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Image, StyleSheet, Text, Pressable } from 'react-native';
import { Button, Avatar } from 'react-native-paper';
import { router } from 'expo-router';
import auth from '../firebase.config';

const Municipios = () => {

    // const [encontrando, setEncontrando] = useState(false);

    // const handleEncontrar = async () => {
    //     try {
    //         setEncontrando(true);
    //         //await sendPasswordResetEmail(auth, email)
    //         router.replace('/municipios');
    //         setEncontrando(false);
    //     } catch (error) {
    //         console.error(error.code);
    //         console.error(error.message);
    //         setEncontrando(false);
    //     }
    // };

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
{/* 
            <View style={styles.buttonContainer}>
                <Button mode='contained' onPress={() => handleMunicipio()} loading={atualizando} style={styles.botaoPronto}>Pronto!</Button>
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
    button: {
        borderColor: 'green', // Definindo a borda como verde
        borderWidth: 1, // Espessura da borda
        borderRadius: 10,
    }
});

export default Municipios;