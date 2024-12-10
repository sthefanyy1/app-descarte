import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Image, StyleSheet, Text, Pressable } from 'react-native';
import { Button, Avatar } from 'react-native-paper';
import { Link, router } from 'expo-router';
import auth from '../firebase.config';
import { signOut } from "firebase/auth";

const Home = () => {

// const handleSignOut = () => {
//         signOut(auth).then(() => {
//             // Sign-out successful.
//             router.replace('/');
//             console.log('Saiu');
//         }).catch((error) => {
//             // An error happened.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.error(errorCode);
//         console.error(errorMessage);
//     });
// }

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            router.replace('/');
        } catch (error) {
            console.error(error.code);
            console.error(error.message);
        }
}

    return (
        <View style={styles.container}>
            <View>
            <StatusBar style="auto" />
                <Image source={require('./../assets/logo.jpeg')} style={styles.logotipo} />

                <Pressable onPress={() =>  router.navigate('/perfil')}>
                    <Avatar.Text size={50} 
                    //router.replace('/perfil');
                    // backgroundColor={'#4CA04A'} 
                    // borderRadius={'20px'}
                    label={auth.currentUser.displayName.charAt(0)} />
                </Pressable>

                <Text style={styles.texto}>Olá, {auth.currentUser.displayName}{'\n'}</Text>

                <Text style={styles.texto}>Encontre pontos de coleta de acordo com seu Município:{'\n'}</Text>

                <Button onPress={() => handleSignOut()} style={styles.sair}>Sair</Button>

                {/* <Link href='/entrar' asChild>
                    <Button mode='contained' style={styles.botaoVoltar}>Voltar</Button>
                </Link> */}
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
        justifyContent: 'space-around',
    },
    // header: {
    //     backgroundColor: '#fff',
    // },
    logotipo: {
        width: 150,
        height: 150,
    },
    texto: {
        marginLeft: 20,
        fontSize: 20,
        fontWeight: 'bold',
    },
    sair: {
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4CA04A',
        textDecorationLine: 'underline',
    },
    // botaoVoltar: {
    //     backgroundColor: '#4CA04A',
    //     borderRadius: 5,
    //     padding: 10,
    // },
});

export default Home;
