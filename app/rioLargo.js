//import React, { } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text} from 'react-native';
import { Appbar } from 'react-native-paper';
import { useRouter } from 'expo-router';

const RioLargo = () => {
    //const [loading, setLoading] = useState(true);
    const router = useRouter();

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <Appbar.Header style={styles.header}>
                <Appbar.BackAction onPress={() => { router.back() }} color="#346E33" />
            </Appbar.Header>

            <Text style={styles.texto}>Não há pontos de coletas cadastrados em Rio Largo.</Text>
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
        backgroundColor: '#fff',
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 20, 
    },
    texto: {
        marginLeft: 20,
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default RioLargo;