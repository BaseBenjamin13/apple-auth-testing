import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import * as AppleAuthentication from 'expo-apple-authentication';

export default function App() {

    const [appleAuthAvailable, setAppleAuthAvailable] = useState(false);

    useEffect(() => {
        const checkAvailable = async () => {
            const isAvailable = await AppleAuthentication.isAvailableAsync();
            setAppleAuthAvailable(isAvailable);
        }
        checkAvailable()
    }, [])

    const getAppleAuthContent = () => {
        
    }

    return (
        <View style={styles.container}>
            {appleAuthAvailable 
                ? getAppleAuthContent()
                : <Text>Apple auth unavailable</Text>
            }
            <Text>Apple Auth Testing!</Text>
            <StatusBar style="auto" />
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
});
