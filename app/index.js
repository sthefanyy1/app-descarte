import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';
import {Image, StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { Button } from 'react-native-paper';

export default function App() {

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image source={require('./../assets/logo.jpeg')} style={styles.logotipo} />
      <Text style={styles.texto}>DESCARTE CONSCIENTE </Text>

      <Link href='/entrar' asChild>
        <Button mode='contained' style={styles.botao1}>Entrar</Button>
      </Link> 

      <Link href='/cadastrar' asChild>
        <Button mode='contained' style={styles.botao2}>Quero me cadastrar</Button>
      </Link> 

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logotipo: {
    width: 200,
    height: 200,
  },
  texto: {
    color: '#4ca04a',
    fontSize: 20,
    fontWeight: 'bold',
  },
  botao1: {
    marginTop: 100,
    backgroundColor: '#4CA04a',
    borderRadius: 5,
    width: 250,
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  botao2: {
    marginTop: 70,
    backgroundColor: '#4CA04a',
    borderRadius: 5,
    width: 250,
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
  }
});
