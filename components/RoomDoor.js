import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import * as GLOBAL from '../state/global';

import { styles } from '../styles/styles';
import { CoffeeCup } from './Images';

function roomDoor({ navigation }) {
    let [nickName, setNickName] = useState('');

    const joinRoomPress = () => {
        navigation.navigate("SocketDemoPage");
    }

    return (
        <View style={styles.mainBody} >
        <View style={styles.duoBody}>
        </View>
        <View style={styles.homeBody}>
            <View style={{flex: 1, marginTop: 20}}>
                <CoffeeCup />
            </View>
            <Text style={styles.pileplanStyle}>
                    PilePlan
            </Text>
            <View style={{flex:5}}>
                <Text style={styles.doorTextStyle}>
                    You are joining {GLOBAL.roomName}'s room! {"\n"}
                    Enter a nickname to join
                </Text>
                <TextInput
                    style={{borderColor: "black", borderWidth: 1, width: '80%', alignItems: 'center', alignSelf: 'center'}}
                    onChangeText={nickName => setNickName(nickName)}
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

export default roomDoor;