import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import * as AppleAuthentication from 'expo-apple-authentication';

export default function App() {

    const [appleAuthAvailable, setAppleAuthAvailable] = useState(false);

    const getAppleAuthContent = () => {

    }

    return (
        <View style={styles.container}>

            <Text>Open up App.js to start working on your app!</Text>
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
