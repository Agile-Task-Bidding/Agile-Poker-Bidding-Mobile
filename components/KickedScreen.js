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
import * as GLOBAL from '../state/global';

import { styles } from '../styles/styles';
import { CoffeeCup } from './Images';

function KickedScreen({ navigation }) {
    
    const backHomePressed = () =>{
        navigation.navigate("HomeScreen");
    }


    return (
        <View style={styles.mainBody} >
        <View style={styles.homeBody}>
            
            <View style={{flex: 1, marginTop: 80}}>
                <CoffeeCup />
            </View>
            <View style={{flex: 1, marginTop: 25, marginBottom: 40}}>
                <Text style={styles.pileplanStyle}>PilePlan</Text>
            </View>
            <View style={{flex: 1, marginTop: 30, marginBottom: 30}}>
                <Text style={{textAlign: 'center',fontSize: 23,width: '80%', alignItems: 'center', left:40, bottom:5, color:"#2B84ED"  }}>
                    You were disconnected from the room.
                </Text>
            </View>
            <View style={{flex:5, top: 30}}>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={() => backHomePressed()}>
                    <Text style={styles.buttonTextStyle}>BACK TO HOME</Text>
                </TouchableOpacity>
            </View>
        </View>
        </View>
    );

}

export default KickedScreen;
