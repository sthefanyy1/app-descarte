import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { Link } from 'expo-router';

const Nova = () => {

    return (
            <View style={styles.container}>
            <StatusBar style="auto" />

                    <Text style={styles.texto}>
                        Crie sua nova senha!{'\n'}
                        Verifique a sua caixa de e-mail
                    </Text>

                    <Link href='/entrar' asChild>
                        <Button mode='contained' style={styles.botaoEntrar}>Entrar</Button>
                    </Link>
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
        justifyContent: 'justify-content',
    },
    texto: {
        marginTop: 50,
        marginBottom: 50,
        marginLeft: 20,
        fontSize: 20,
        fontWeight: 'bold',
    },
    botaoEntrar: {
        marginTop: 50,
        backgroundColor: '#346E33',
        borderRadius: 5,
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold',
    }
})

export default Nova;