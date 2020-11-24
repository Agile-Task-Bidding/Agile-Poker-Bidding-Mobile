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

import { styles } from '../styles/styles';
import { CoffeeCupSmall, UserImage, BackArrow } from './Images';

function UsersScreen({ navigation }) {

    const backButtonPressed = () => {
        navigation.navigate("RoomScreen")
    }

    return (
        <View style={styles.mainBody} >
        
        <View style={styles.roomDuoBody}>
            <View style={{flexDirection: 'row'}}>  
                <View style={{flex: 1, paddingLeft: 10, paddingTop: 25}}>
                    <TouchableOpacity onPress={() => backButtonPressed()}>
                        <BackArrow />
                    </TouchableOpacity>       
                </View>
                <View style={{flex: 1, marginBottom: 25}}>
                    <CoffeeCupSmall />              
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                    <TouchableOpacity style={{paddingTop: 25, paddingRight: 20}} onPress={()=>backButtonPressed()}>
                        <UserImage />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
            <View style={styles.homeBody}>
                <Text>Users Screen (Work in progress)</Text>
            </View>
        </View>
    );
}

export default UsersScreen;