import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Image, StyleSheet, Text, FlatList, Pressable, ActivityIndicator } from 'react-native';
import { Appbar, Avatar, Card, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { auth, db } from '../firebase.config';
import { collection, getDocs, query } from 'firebase/firestore';

const Maceio = () => {
    const [loading, setLoading] = useState(true);
    const [pontos, setPontos] = useState([]);
    // const user = auth.currentUser;
    const router = useRouter();

    // Função para buscar os pontos de coleta
    const getAllPontos = async () => {
        try {
            setLoading(true);
            const querySnapshot = await getDocs(query(collection(db, "pontos")));
            const array = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setPontos(array);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllPontos();
    }, []);

    // Componente Tarefa que será usado na FlatList
    const Pontos = ({ nome, endereco, telefone, onPress }) => (
        <Card style={styles.pontos}>
            <Card.Content>
                <Text style={styles.nome}>{nome}</Text>
                <Text style={styles.endereco}>{endereco}</Text>
                <Text>{telefone}</Text>
            </Card.Content>
            <Card.Actions>
                <Button onPress={onPress} mode="contained" style={{ backgroundColor: '#4CA04A' }}>
                    Ver mais detalhes
                </Button>
            </Card.Actions>
        </Card>
    );

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <Appbar.Header style={styles.header}>
                <Appbar.BackAction onPress={() => { router.back() }} color="#4CA04A" />
            </Appbar.Header>

            {/* Contêiner para logo e avatar */}
            <View style={styles.header}>
                <Image source={require('./../assets/logo.jpeg')} style={styles.logotipo} />
                <Pressable onPress={() => router.navigate('/perfil')}>
                    <Avatar.Text size={50} label={auth.currentUser.displayName.charAt(0)} />
                </Pressable>
            </View>

            <Text style={styles.texto}>Encontre pontos de coleta de acordo com seu Município:{'\n'}</Text>

            {loading ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                    data={pontos}
                    renderItem={({ item }) => (
                        <Pontos 
                            nome={item.nome} 
                            endereco={item.endereco} 
                            telefone={item.telefone} 
                            onPress={() => router.navigate(`/ponto/${item.id}`)} // Navegação para detalhes do ponto
                        />
                    )}
                    keyExtractor={(item) => item.id}
                />
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
    logotipo: {
        width: 150,
        height: 150,
    },
    texto: {
        marginLeft: 20,
        fontSize: 20,
        fontWeight: 'bold',
    },
    pontos: {
        backgroundColor: '#f9f9f9',
        borderColor: '#4CA04A',
        padding: 10,
        marginTop: 20,
        marginBottom: 15,
        borderRadius: 5,
        borderWidth: 1,
    },
    nome: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    endereco: {
        fontSize: 16,
        color: '#494949',
    },
});

export default Maceio;
