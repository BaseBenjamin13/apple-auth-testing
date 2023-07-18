import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import * as AppleAuthentication from 'expo-apple-authentication';
import jwt_decode from "jwt-decode";
import * as SecureStore from 'expo-secure-store';

import AppleAuth from './components/auth/AppleAuth';
import GoogleAuth from './components/auth/GoogleAuth';

export default function App() {

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Auth Testing!</Text>

            <AppleAuth />

            <GoogleAuth />

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
    header: {
        fontSize: 24,
        margin: 10,
    }
});
