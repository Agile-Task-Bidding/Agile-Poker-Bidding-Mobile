// TEMPORARY LOGIN SCREEN DO NOT USE

import React, { useState } from 'react';
import {
    Button,
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    Image,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { styles } from '../styles/styles'

function HomeScreen({ navigation }) {
  return (
    <View style={styles.center}>
      <Text>Login Screen</Text>
      <Button
        title="Go to Test"
        onPress={() => navigation.navigate('test')}
      />
    </View>
  );
}

export default HomeScreen;