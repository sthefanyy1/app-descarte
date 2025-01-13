import { View, Text, ActivityIndicator, StyleSheet, Pressable, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Appbar, Avatar } from 'react-native-paper';
import MapView from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase.config';

const Id = () => {
    const { id } = useLocalSearchParams();
    const [loading, setLoading] = useState(true);
    const [pontos, setPontos] = useState({});
   
    const getPontos = async () => {
        try {
            const docRef = doc(db, "pontos", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setPontos(docSnap.data());
            } else {
                console.log("Erro");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPontos();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

                 <Appbar.Header style={styles.header}>
                    <Appbar.BackAction onPress={() => { router.back() }} color="#4CA04A" />
                </Appbar.Header> 

                {/* Contêiner para logo e avatar */}
                <View style={styles.header}>
                    <Image source={require('../../assets/logo.jpeg')} style={styles.logotipo} /> 
                    <Pressable onPress={() => router.navigate('/perfil')}>
                        <Avatar.Text size={50} label={auth.currentUser.displayName.charAt(0)} />
                    </Pressable>
                </View>

                <View style={styles.container}>
                    <MapView style={styles.map} />
                </View>

            {loading ? (
                <ActivityIndicator />
            ) : (
                <>
                    <Text style={styles.texto}>{pontos.nome}{'\n'}{'\n'}</Text>
                    <Text style={styles.endereco}>Endereço: {pontos.endereco}{'\n'}{'\n'}</Text>
                    <Text style={styles.aberto}>Aberto de domingo a domingo das 6h até às 18h{'\n'}{'\n'}</Text>
                    <Text style={styles.contato}>Contato: {pontos.telefone}</Text>
                </>

            )}
        </View>
    )
};

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
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    logotipo: {
        width: 150,
        height: 150,
    },
    texto: {
        marginLeft: 40,
        fontSize: 20,
        fontWeight: 'bold',
    },
    endereco: {
        marginLeft: 20,
        fontSize: 16,
    },
    aberto: {
        marginLeft: 20,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4CA04A',
    },
    contato: {
        marginLeft: 20,
        fontSize: 16,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

export default Id;