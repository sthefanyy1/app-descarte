import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Image, StyleSheet, Text, FlatList, Pressable } from 'react-native';
import { Appbar, Avatar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { auth, db } from '../firebase.config';
import { collection, getDocs, query } from 'firebase/firestore';

const Maceio = () => {
    const [loading, setLoading] = useState(true);
    const [pontos, setPontos] = useState([]);
    //const user = auth.currentUser;
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
    const Tarefa = ({ nome, endereco, telefone }) => (
        <View style={styles.tarefa}>
            <Text style={styles.nome}>{nome}</Text>
            <Text style={styles.titulo}>{endereco}</Text>
            <Text>{telefone}</Text>
        </View>
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

            {loading && <Text>Carregando...</Text>} {/* Mostra o 'nome' carregando... antes de exibir os pontos*/}
            {/* FlatList para renderizar os pontos */}
            <FlatList
                data={pontos}
                renderItem={({ item }) => (
                    <Tarefa nome={item.nome} endereco={item.endereco} telefone={item.telefone} />
                )}
            />
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
    tarefa: {
        backgroundColor: '#f9f9f9',
        //borderBlockColor: '#4CA04A',
        padding: 10,
        marginTop: 20,
        marginBottom: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Maceio;
