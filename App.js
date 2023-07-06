import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import * as AppleAuthentication from 'expo-apple-authentication';
import jwt_decode from "jwt-decode";

export default function App() {

    const [appleAuthAvailable, setAppleAuthAvailable] = useState(false);
    const [userToken, setUserToken] = useState();

    useEffect(() => {
        const checkAvailable = async () => {
            const isAvailable = await AppleAuthentication.isAvailableAsync();
            setAppleAuthAvailable(isAvailable);
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
        } catch (error) {
            console.log(error)
        }
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
                </View>
            )
        }
    }

    return (
        <View style={styles.container}>
            <Text>Apple Auth Testing!</Text>
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
});
