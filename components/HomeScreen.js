import React, { useState, useEffect } from 'react';
import {
    Button,
    View,
    Text,
    Alert,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import auth from '@react-native-firebase/auth'
import io from 'socket.io-client'
import config from '../config/config'

import { styles } from '../styles/styles';
import { CoffeeCup } from './Images';

function HomeScreen({ navigation }) {
    let [userEmail, setUserEmail] = useState('');
    let [roomName, setRoomName] = useState('');
    let [user, setUser] = useState('');
    let [logButtonText, setLogButtonText] = useState('');



    auth().onAuthStateChanged((user) => {
        if (user) {
            setUser(user);
            setUserEmail(user.email);
            setLogButtonText("LOGOUT");
        } else {
            setLogButtonText("LOGIN");
            setUserEmail('');
            setUser(null);
        }
    });

    const userInfoTest = () => {
        Alert.alert(userEmail);
    }

    const hostRoomPress = () => {
        navigation.navigate("SocketTest");
        // if(!user) {
        //     navigation.navigate("LoginScreen");
        // } else {
        //     navigation.navigate("CreateCardScreen");
        // }
    }

    const joinRoomPress = () => {
        //navigation.navigate("RoomScreen");
        navigation.navigate ('SocketDemoPage');
    }

    const logOutUser = () => {
        if(user) {
            auth()
                .signOut()
                .then(() => console.log('User signed out!'));
            
        } else {
            navigation.navigate("LoginScreen");
        }
    }

    return (
        <View style={styles.mainBody} >
        <View style={styles.duoBody}>
        </View>
        <View style={styles.homeBody}>
            <View style={styles.inlineTextHome}>
                <TouchableOpacity
                    style={styles.logoutButtonStyle}
                    activeOpacity={0.5}
                    onPress={() => logOutUser()}>
                    <Text style={styles.logoutButtonTextStyle}>{logButtonText}</Text>
                </TouchableOpacity>
                <Text style={styles.userText}>{userEmail}</Text>
            </View>
            <View style={{flex: 1, marginTop: 20, marginBottom: 10}}>
                <CoffeeCup />
            </View>
            <View style={{flex:5}}>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={() => hostRoomPress()}>
                    <Text style={styles.buttonTextStyle}>HOST ROOM</Text>
                </TouchableOpacity>
                {/* Nickname text box? server name idk */}
                <TextInput
                    style={{borderColor: "black", borderWidth: 1, width: '79.5%', alignItems: 'center', alignSelf: 'center'}}
                    onChangeText={roomName => setRoomName(roomName)}
                    placeholder="Name" 
                    autoCapitalize="none"
                    keyboardType="default"
                    blurOnSubmit={false}
                />
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={() => joinRoomPress()}>
                    <Text style={styles.buttonTextStyle}>JOIN ROOM</Text>
                </TouchableOpacity>
            </View>
        </View>
        </View>
    );
}

export default HomeScreen;