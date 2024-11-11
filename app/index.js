import { StatusBar } from 'expo-status-bar';
import {Image, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image source={require('./../assets/logo.jpeg')} style={styles.logotipo} />
      <Text style={styles.texto}>DESCARTE CONSCIENTE </Text>
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
});
