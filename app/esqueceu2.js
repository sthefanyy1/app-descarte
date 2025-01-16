import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { Link } from 'expo-router';

const Nova = () => {

    return (
            <View style={styles.container}>
            <StatusBar style="auto" />
                <View style={styles.content}>
                    <Text style={styles.texto}>
                        Crie sua nova senha!{'\n'}
                        Verifique a sua caixa de e-mail
                    </Text>

                    <Link href='/entrar' asChild>
                        <Button mode='contained' style={styles.botaoEntrar}>Entrar</Button>
                    </Link>
                </View>

            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        margin: 30,
        marginLeft: 10,
        marginRight: 10,
        //marginTop:10,
        //justifyContent: 'space-around',
    },
    content: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-around', 
    },
    texto: {
        //marginTop: -240,
        //margin: -15,
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    botaoEntrar: {
        backgroundColor: '#346E33',
        borderRadius: 5,
        padding: 10,
    }
})

export default Nova;