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
    const [pontos, setPontos] = useState({});
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')

    const array = {
        gruta: {
          id: "Ad659efxPyJMyIi8D0CY",
          latitude: -9.651443,
          longitude: -35.727385
        },
        santaMaria: {
            id: "EiVz5PFmTp5KduApIKwW",
            latitude: -9.5396101,
            longitude: -35.7930455
        },
        diqueEstrada: {
            id: "JnMGA1e0blRVls52iuw5",
            latitude: -9.1,
            longitude: -35.7
        },
        santaLucia: {
            id: "LrJGfgeuKUuPLZPE01xt",
            latitude: -9.5839069,
            longitude: -35.7505028
        },
        pajucara: {
            id: "Y7xNmveISfDanQhq2NSK",
            latitude: -9.6617162,
            longitude: -35.7159619
        },
        tabuleiro: {
            id: "nR7Ih8Wx0GqSYmQp3p64",
            latitude: -9.5930255,
            longitude: -35.7709898
        }
      };
      
   
    const getPontos = async () => {
        try {
            const docRef = doc(db, "pontos", id);

            // Pegar loc por array
            if(id == array.gruta.id){
                console.log('Entrou em Gruta');
                setLatitude(array.gruta.latitude);
                setLongitude(array.gruta.longitude);
            } 
            // else if(id == array.santaMaria.id){
            //     console.log('Entrou em Santa Maria');
            //     setLatitude(array.santaMaria.latitude);
            //     setLongitude(array.santaMaria.longitude);
            // } 
            // else if(id == array.diqueEstrada.id){
            //     console.log('Entrou em Dique Estrada');
            //     setLatitude(array.diqueEstrada.latitude);
            //     setLongitude(array.diqueEstrada.longitude);
            // } 
            // else if(id == array.santaLucia.id){
            //     console.log('Entrou em Santa Lucia');
            //     setLatitude(array.santaLucia.latitude);
            //     setLongitude(array.santaLucia.longitude);
            // } 
            // else if(id == array.pajucara.id){
            //     console.log('Entrou em Pajuçara');
            //     setLatitude(array.pajucara.latitude);
            //     setLongitude(array.pajucara.longitude);
            // } 
            else{
                console.log('Entrou em Tabuleiro');
                setLatitude(array.tabuleiro.latitude);
                setLongitude(array.tabuleiro.longitude); 
            }

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
                    <Appbar.BackAction onPress={() => { router.back() }} color="#346E33" />
                </Appbar.Header> 
                
                <View style={styles.container}>
                    <MapView style={styles.map} 
                        initialRegion={{
                            latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    />
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