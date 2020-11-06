import React, { useState, useEffect } from 'react';
import {
    Button,
    View,
    Text,
    Alert,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth'

import { styles } from '../styles/styles';
import CoffeeCup from './Images';

function HomeScreen({ navigation }) {
    let [userEmail, setUserEmail] = useState('');

    auth().onAuthStateChanged((user) => {
        if (user) {
            setUserEmail(user.email);
        }
    });

    const userInfoTest = () => {
        Alert.alert(userEmail);
    }

    const logOutUser = () => {
    auth()
        .signOut()
        .then(() => console.log('User signed out!'))
        .then(() => navigation.navigate("LoginScreen"));
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
                    <Text style={styles.logoutButtonTextStyle}>LOGOUT</Text>
                </TouchableOpacity>
                <Text style={styles.userText}>User</Text>
            </View>
            <View style={{flex: 1, marginTop: 20, marginBottom: 10}}>
                <CoffeeCup />
            </View>
            <View style={{flex:5}}>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={() => {Alert.alert('hello')}}>
                    <Text style={styles.buttonTextStyle}>HOST ROOM</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={() => {Alert.alert('hello')}}>
                    <Text style={styles.buttonTextStyle}>JOIN ROOM</Text>
                </TouchableOpacity>
            </View>
        </View>
        </View>
    );
}

export default HomeScreen;