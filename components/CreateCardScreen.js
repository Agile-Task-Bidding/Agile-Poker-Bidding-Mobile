import React, { useState, useEffect } from 'react';
import {
    Button,
    View,
    Text,
    Alert,
    TouchableOpacity,
    TextInput,
} from 'react-native';

import { styles } from '../styles/styles';
import { CoffeeCup } from './Images';

function CreateCardScreen({ navigation }) {
    return(
        <View style={{justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
            <CoffeeCup />
            <Text>This is the create card screen</Text>
            <Button title="Go back to home screen" onPress={() => {navigation.navigate("HomeScreen")}}/>
        </View>
    );
}

export default CreateCardScreen;