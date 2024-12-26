import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';

const Id = () => {
    const { id } = useLocalSearchParams();
    const [loading, setLoading] = useState(true);
    const [pontos, setPontos] = useState({});
   
    const getPontos = async () => {
        try {
            const docRef = doc(db, "pontos", id);
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
        <View>
            {loading ? (
                <ActivityIndicator />
            ) : (
                <>
                    <Text>Endereço: {pontos.endereco}</Text>
                </>
            )}
        </View>
    )
}

export default Id;