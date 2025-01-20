import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Appbar } from 'react-native-paper';
import MapView from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';

const Id = () => {
    const { id } = useLocalSearchParams();
    const [loading, setLoading] = useState(true);
    const [ponto, setPonto] = useState({});
    //const [latitude, setLatitude] = useState('')
    //const [longitude, setLongitude] = useState('')
   
    const getPonto = async () => {
        try {
            console.log('1');
            const docRef = doc(db, "pontos", id);
            console.log('2');
            const docSnap = await getDoc(docRef);
            console.log('3');

            if (docSnap.exists()) {
                setPonto(docSnap.data());
                console.log(ponto);
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
        getPonto();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

                 <Appbar.Header style={styles.header}>
                    <Appbar.BackAction onPress={() => { router.back() }} color="#346E33" />
                </Appbar.Header> 
                
                {/* <View style={styles.container}>
                    <MapView style={styles.map} 
                        initialRegion={{
                            latitude: ponto.coordenadas.latitude,
                            longitude: ponto.coordenadas.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    />
                </View> */}

            {loading ? (
                <ActivityIndicator />
            ) : (
                <>

            <View style={styles.container}>
                <MapView style={styles.map} 
                    initialRegion={{
                        latitude: ponto.coordenadas.latitude,
                        longitude: ponto.coordenadas.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    />
            </View>
                    <Text style={styles.texto}>{ponto.nome}{'\n'}{'\n'}</Text>
                    <Text style={styles.endereco}>Endereço: {ponto.endereco}{'\n'}{'\n'}</Text>
                    <Text style={styles.aberto}>Aberto de domingo a domingo das 6h até às 18h{'\n'}{'\n'}</Text>
                    <Text style={styles.contato}>Contato: {ponto.telefone}</Text>
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
        color: '#346E33',
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