import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

// import {
//     GoogleSignin,
//     GoogleSigninButton,
//     statusCodes,
// } from '@react-native-google-signin/google-signin';


// web client ID: 203758127655-p431i5rar0qp0qs9mq832vf3akoj8a08.apps.googleusercontent.com
// ios client ID: 203758127655-fitpge8u2dhfjat679schar45g94p6fa.apps.googleusercontent.com

WebBrowser.maybeCompleteAuthSession();

const GoogleAuth = () => {

    const [accessToken, setAccessToken] = useState();
    const [user, setUser] = useState();
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: "203758127655-p431i5rar0qp0qs9mq832vf3akoj8a08.apps.googleusercontent.com",
        iosClientId: "203758127655-fitpge8u2dhfjat679schar45g94p6fa.apps.googleusercontent.com"
    });

    useEffect(() => {
        if (response?.type === "success") {
            setAccessToken(response.authentication.accessToken);
            console.log('access Token: ' + response.authentication.accessToken);
            accessToken && fetchUserInfo();
        }
        console.log(response?.type)
    }, [response, accessToken])

    async function fetchUserInfo() {
        let response = await fetch("https://ww.googleapis.com/userinfo/v2/me", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const userInfo = await response.json();
        setUser(userInfo)
    }

    // GoogleSignin.configure();

    // const signIn = async () => {
    //     try {
    //         await GoogleSignin.hasPlayServices();
    //         const userInfo = await GoogleSignin.signIn();
    //           setState({ userInfo });
    //         console.log(userInfo);
    //     } catch (error) {
    //         console.log(error)
    //         if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //             // user cancelled the login flow
    //         } else if (error.code === statusCodes.IN_PROGRESS) {
    //             // operation (e.g. sign in) is in progress already
    //         } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //             // play services not available or outdated
    //         } else {
    //             // some other error happened
    //         }
    //     }
    // }

    // const ShowUserInfo = () => {
    //     if (user) {
    //         return (
    //             <View>
    //                 <Text>Welcome</Text>
    //                 <Image source={{ uri: user.picture }} />
    //                 <Text>{user.name}</Text>
    //             </View>
    //         )
    //     }
    // }

    return (
        <View>
            {/* <GoogleSigninButton onPress={signIn} /> */}
            <Text style={styles.button}>google component</Text>
            {user
                ?
                <View>
                    <Text>Welcome</Text>
                    <Image source={{ uri: user.picture }} />
                    <Text>{user.name}</Text>
                </View>
                :
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        promptAsync();
                    }}
                >
                    <Text>Login with Google</Text>
                </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 200,
        height: 64,
        margin: 10,
    },
});

export default GoogleAuth;