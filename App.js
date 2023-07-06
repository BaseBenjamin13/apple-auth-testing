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

    const loginWithApple = async () => {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL
                ]
            })
            console.log(credential);
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
        return <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={5}
            style={styles.button}
            onPress={loginWithApple}
        />
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
    button : {
        width: 200,
        height: 64,
        margin: 10,
    },
});
