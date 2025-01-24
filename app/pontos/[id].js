import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Appbar } from 'react-native-paper';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';

const Id = () => {
    const { id } = useLocalSearchParams();
    const [loading, setLoading] = useState(true);
    const [ponto, setPonto] = useState({});

    const getPonto = async () => {
        try {
            const docRef = doc(db, "pontos", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setPonto(docSnap.data());
            } else {
                console.log("Erro");
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
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

            {loading ? (
                <ActivityIndicator />
            ) : (
                <>
                
                    <View style={styles.mapContainer}>
                        <MapView style={styles.map}
                            initialCamera={{
                                center: {
                                    latitude: ponto.coordenadas.latitude,
                                    longitude: ponto.coordenadas.longitude,
                                },
                                pitch: 45,
                                heading: 90,
                                altitude: 1000,
                                zoom: 15,
                            }}
                        >
                            
                        <Marker
                                identifier={id}
                                coordinate={{
                                    latitude: ponto.coordenadas.latitude,
                                    longitude: ponto.coordenadas.longitude
                                }}
                                title={ponto.nome}
                                description={ponto.endereco}
                        />
                        </MapView>
                    </View>
                    
                    <Text style={styles.texto}>{ponto.nome}{'\n'}{'\n'}</Text>

                    <ScrollView>
                    <Text style={styles.endereco}>Endereço: {ponto.endereco}{'\n'}{'\n'}</Text>

                    <Text style={styles.aberto}>Aberto de domingo a domingo das 6h até às 18h{'\n'}{'\n'}</Text>

                    <Text style={styles.contato}>Contato: {ponto.telefone}{'\n'}{'\n'}</Text>

                    <Text style={styles.descricaoPode}>Pode descartar: {'\n'}{'\n'}</Text>
                    <Text style={styles.descricao}>- Entulhos da construção civil (até 1m³); {'\n'}</Text>
                    <Text style={styles.descricao}>- Móveis e eletrodomésticos inservíveis; {'\n'}</Text>
                    <Text style={styles.descricao}>- Restos de poda de árvore; {'\n'}</Text>
                    <Text style={styles.descricao}>- Materiais recicláveis. {'\n'}{'\n'}</Text>

                    <Text style={styles.descricaoPode}>Não pode descartar: {'\n'}{'\n'}</Text>
                    <Text style={styles.descricao}>- Resíduos orgânicos; {'\n'}</Text>
                    <Text style={styles.descricao}>- Resíduos químicos; {'\n'}</Text>
                    <Text style={styles.descricao}>- Resíduos industriais; {'\n'}</Text>
                    <Text style={styles.descricao}>- Resíduos de serviço de saúde. {'\n'}</Text>
                    </ScrollView>

                </>
            )}
        </View>
    );
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
        fontSize: 18,
    },
    aberto: {
        marginLeft: 20,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#346E33',
    },
    contato: {
        marginLeft: 20,
        fontSize: 18,
    },
    google: {
        marginLeft: 20,
        fontSize: 18,
        fontWeight: 'bold',
    },
    mapContainer: {
        width: '100%',
        height: 300, // ajusta a altura do mapa conforme necessário
        marginBottom: 20, 
    },
    map: {
        width: '100%',
        height: '100%',
    },
    descricaoPode: {
        marginLeft: 20,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#346E33',
    },
    descricao: {
        marginLeft: 20,
        fontSize: 18,
    },
});

export default Id;
