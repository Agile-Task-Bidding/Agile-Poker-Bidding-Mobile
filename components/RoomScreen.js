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
import auth from '@react-native-firebase/auth';

import { styles } from '../styles/styles';
import { CoffeeCupSmall, UserImage, BackArrow } from './Images';

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
                    tag: 'Super Long Test Tag Test',
                    value: 4,
                },
                {
                    tag: 'ddddddddddddddddddddddddddddddddddddddddd',
                    value: 5,
                },
                {
                    tag: 'Nice',
                    value: 6,
                },
                {
                    tag: '40 characters max ^',
                    value: 7,
                },
                {
                    tag: 'Nice',
                    value: 8,
                }
            ]
        },
    };

    const cardPressed = (Value) => {
        // send to socket the value
        Alert.alert(Value.toString());
    }

    const backButtonPressed = () => {
        navigation.navigate("HomeScreen")
    }
    
    const userButtonPressed = () => {
        navigation.navigate("UsersScreen")
    }

    const GenerateCards = () => state.roomConfig.deck.map((e, index) => {
        let Tag = e.tag;
        let Value = e.value;

        var index = index + 1; 

        return (
        <TouchableOpacity key={index} style={styles.cardView} onPress={()=>cardPressed(Value)}>
            <Text style={{flex: 1, fontSize: 24, marginTop: 15, marginLeft: 10, marginRight: 10, textAlign: 'center'}}>{Tag}</Text>
            <Text style={{flex: 1, fontSize: 34}}>{Value}</Text>
        </TouchableOpacity>
        );
    });

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
                    <TouchableOpacity style={{paddingTop: 25, paddingRight: 20}} onPress={()=>userButtonPressed()}>
                        <UserImage />
                    </TouchableOpacity>
                </View>
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