import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';
import {Image, StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { Button } from 'react-native-paper';

export default function App() {

  return (
    <View style={styles.containerFoto}>
      <StatusBar style="auto" />
      <Image source={require('./../assets/logo.jpeg')} style={styles.logotipo} />
      <Text style={styles.texto}>DESCARTE CONSCIENTE </Text>

      <View style={styles.containerBotao}>
      <Link href='/entrar' asChild>
        <Button mode='contained' style={styles.botaoEntrar}>Entrar</Button>
      </Link> 

      <Link href='/cadastrar' asChild>
        <Button mode='contained' style={styles.botaoCadastrar}>Quero me cadastrar</Button>
      </Link> 
    </View>
    </View>

  );
}

const styles = StyleSheet.create({
  containerFoto: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  logotipo: {
    width: 200,
    height: 200,
  },
  texto: {
    color: '#346E33',
    fontSize: 20,
    fontWeight: 'bold',
  },
  containerBotao:{
    alignItems: 'center',
  },
  botaoEntrar: {
    marginTop: 150,
    backgroundColor: '#346E33',
    borderRadius: 5,
    width: 250,
    padding: 10,
  },
  botaoCadastrar: {
    marginTop: 20,
    backgroundColor: '#346E33',
    borderRadius: 5,
    width: 250,
    padding: 10,
  }
});
