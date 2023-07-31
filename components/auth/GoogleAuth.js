import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { REACT_APP_CLIENT_ID, REACT_APP_IOS_CLIENT_ID } from "@env"

WebBrowser.maybeCompleteAuthSession();

const GoogleAuth = () => {
    const [accessToken, setAccessToken] = useState();
    const [user, setUser] = useState();
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: REACT_APP_CLIENT_ID,
        iosClientId: REACT_APP_IOS_CLIENT_ID
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