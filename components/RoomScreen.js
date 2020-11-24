import React, { useState, useEffect } from 'react';
import {
    Button,
    View,
    Text,
    ScrollView,
    Alert,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import auth from '@react-native-firebase/auth'

import { styles } from '../styles/styles';
import { CoffeeCupSmall, UserImage } from './Images';

function RoomScreen({ navigation }) {
    state = {
        roomConfig: {
            allowAbstain: true,
            deck: [
                {
                    tag: 'Ok',
                    value: 0,
                },
                {
                    tag: 'Test',
                    value: 1,
                },
                {
                    tag: 'Nice',
                    value: 2,
                },
                {
                    tag: 'Nice',
                    value: 3,
                },
                {
                    tag: 'Nice',
                    value: 4,
                },
                {
                    tag: 'Nice',
                    value: 5,
                },
                {
                    tag: 'Nice',
                    value: 6,
                },
                {
                    tag: 'Nice',
                    value: 7,
                },
                {
                    tag: 'Nice',
                    value: 8,
                }
            ]
        },
    };
    
    const GenerateCards = () => state.roomConfig.deck.map(e => {
        let Tag = e.tag;
        let Value = e.value;

        return (
        <View key={Value} style={styles.cardView}>
            <Text>{Tag}</Text>
            <Text>{Value}</Text>
        </View>
        );
    });

    return (
        <View style={styles.mainBody} >
        <View style={styles.duoBody}>
            <View style={{flexDirection: 'row', paddingLeft: 130}}>                
                <CoffeeCupSmall />
                <UserImage />
            </View>
        </View>
        <View style={{flex: 1}}>
            <ScrollView>
            <View style={styles.cardBody}>
                <GenerateCards />
            </View>
            </ScrollView>
        </View>
        </View>
    );
}

export default RoomScreen;