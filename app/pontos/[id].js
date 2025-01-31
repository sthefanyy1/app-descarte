import { View, Text, ActivityIndicator, StyleSheet, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Appbar, IconButton } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase.config';

const Id = () => {
    const { id } = useLocalSearchParams();
    const [loading, setLoading] = useState(true);
    const [ponto, setPonto] = useState({});
    const [usuario, setUsuario] = useState(auth.currentUser);

    const isAdmin = () => {
        return (usuario.email === 'mescedilene@gmail.com' || usuario.email === 'sthefanygraziely@gmail.com');
    };

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

    const handleDelete = async () => {
        Alert.alert(
            "Confirmar Exclusão",
            "Tem certeza que deseja excluir este ponto de coleta?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Excluir",
                    onPress: async () => {
                        try {
                            const docRef = doc(db, "pontos", id);
                            await deleteDoc(docRef);
                            Alert.alert("Sucesso", "Ponto de coleta excluído.");
                            router.back();
                        } catch (error) {
                            console.error(error);
                            Alert.alert("Erro", "Não foi possível excluir o ponto de coleta.");
                        }
                    },
                },
            ]
        );
    };

    useEffect(() => {
        getPonto();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <Appbar.Header style={styles.header}>
                <Appbar.BackAction onPress={() => router.back()} color="#346E33" />
            </Appbar.Header>

            {isAdmin() && (
                <IconButton
                    icon="delete"
                    color="red"
                    size={24}
                    onPress={handleDelete}
                    style={styles.deletar}
                />
            )}

            {loading ? (
                <ActivityIndicator />
            ) : (
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Text style={styles.texto}>{ponto.nome}{'\n'}{'\n'}</Text>

                    <Text style={styles.endereco}>Endereço: {ponto.endereco}{'\n'}{'\n'}</Text>

                    <Text style={styles.aberto}>
                        Aberto de domingo a domingo das 6h até às 18h{'\n'}{'\n'}
                    </Text>
                    <Text style={styles.contato}>Contato: {ponto.telefone}{'\n'}{'\n'}</Text>

                    <Text style={styles.descricaoPode}>Pode descartar: {'\n'}{'\n'}</Text>
                    <Text style={styles.descricao}>
                        - Entulhos da construção civil (até 1m³); {'\n'}
                        - Móveis e eletrodomésticos inservíveis; {'\n'}
                        - Restos de poda de árvore; {'\n'}
                        - Materiais recicláveis. {'\n'}{'\n'}
                    </Text>

                    <Text style={styles.descricaoPode}>Não pode descartar: {'\n'}{'\n'}</Text>
                    <Text style={styles.descricao}>
                        - Resíduos orgânicos; {'\n'}
                        - Resíduos químicos; {'\n'}
                        - Resíduos industriais; {'\n'}
                        - Resíduos de serviço de saúde. {'\n'}{'\n'}
                    </Text>

                    <Text style={styles.localizacao}>Localização:{'\n'}{'\n'}</Text>

                    <View style={styles.mapContainer}>
                        <MapView
                            style={styles.map}
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
                                    longitude: ponto.coordenadas.longitude,
                                }}
                                title={ponto.nome}
                                description={ponto.endereco}
                            />
                        </MapView>
                    </View>
                </ScrollView>
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
    deletar: { 
        position: 'absolute',
        top: 40,
        right: 10,
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
    localizacao: {
        marginLeft: 20,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#346E33',
    },
    mapContainer: {
        width: '100%',
        height: 300,
        marginBottom: 20,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    scrollContainer: {
        paddingBottom: 20,
    }
});

export default Id;