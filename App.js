import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import * as AppleAuthentication from 'expo-apple-authentication';
import jwt_decode from "jwt-decode";
import * as SecureStore from 'expo-secure-store';

export default function App() {

    const [appleAuthAvailable, setAppleAuthAvailable] = useState(false);
    const [userToken, setUserToken] = useState();

    useEffect(() => {
        const checkAvailable = async () => {
            const isAvailable = await AppleAuthentication.isAvailableAsync();
            setAppleAuthAvailable(isAvailable);

            if(isAvailable) {
                const credentialJson = await SecureStore.getItemAsync('apple-credentials');
                console.log(credentialJson);
                setUserToken(JSON.parse(credentialJson));
            }
        }
        checkAvailable()
    }, [])

    const loginWithApple = async () => {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL
                ]
            })
            console.log(credential);
            setUserToken(credential);
            // console logs
            // {
            //     "authorizationCode", 
            //     "email", 
            //     "fullName": {
            //         "familyName", 
            //         "givenName", 
            //         "middleName", 
            //         "namePrefix", 
            //         "nameSuffix", 
            //         "nickname"
            //     }, 
            //     "identityToken", 
            //     "realUserStatus", 
            //     "state", 
            //     "user"
            // }
            SecureStore.setItemAsync('apple-credentials', JSON.stringify(credential));

        } catch (error) {
            console.log(error)
        }
    }

    //checks if the user is authorized or not found and what not.
    const getCredentialState = async () => {
        const credentialState = await AppleAuthentication.getCredentialStateAsync(userToken.user)
        console.log(credentialState);
        // console logs 1 for authorized 2 for not found.
    }

    const logout = async () => {
        SecureStore.deleteItemAsync('apple-credentials');
        setUserToken(undefined);
    }

    const getAppleAuthContent = () => {
        if (!userToken) {
            return <AppleAuthentication.AppleAuthenticationButton
                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                cornerRadius={5}
                style={styles.button}
                onPress={loginWithApple}
            />
        } else {
            const decoded = jwt_decode(userToken.identityToken);
            const current = Date.now() / 1000;
            console.log(decoded);
            return (
                <View>
                    <Text>{decoded.email}</Text>
                    <Text>Expired: {(current >= decoded.exp).toString()}</Text>
                    <Button title="Logout" onPress={logout} />
                    <Button title="Get Credential State" onPress={getCredentialState} />
                </View>
            )
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Apple Auth Testing!</Text>
            {appleAuthAvailable
                ? getAppleAuthContent()
                : <Text>Apple auth unavailable</Text>
            }
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
    button: {
        width: 200,
        height: 64,
        margin: 10,
    },
    header: {
        fontSize: 24,
        margin: 10,
    }
});
