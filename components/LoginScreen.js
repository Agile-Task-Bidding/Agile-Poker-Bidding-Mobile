import React, { useState, useEffect } from 'react';
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
    BackHandler,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { styles } from '../styles/styles';
import test from './test';
import CoffeeCup from './Images';

function LoginScreen({ navigation }) {
    let [userEmail, setUserEmail] = useState('');
    let [userPassword, setUserPassword] = useState('');
    let [loading, setLoading] = useState(false);
    let [errortext, setErrortext] = useState('');

    //Handle back event... for some reason prevents all back events Idk why
    // useEffect(() => {
    //     const backAction = () => {
    //         return true;
    //     };
    //     const backHandler = BackHandler.addEventListener(
    //         "hardwareBackPress",
    //         backAction
    //     );
    //     return () => backHandler.remove();
    // }, []);

    const handleSubmitPress = () => {
        setErrortext('');
        if (!userEmail) {
            alert('Please fill in Email');
            return;
        }
        if (!userPassword) {
            alert('Please fill in Password');
            return;
        }
        setLoading(true);
        //something like this API use case still not declared \/
        var dataToSend = {user_email: userEmail, user_password: userPassword};

        fetch('API_Address', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(dataToSend)
        }).then(response => response.json())
        .then(responseJson => {
            setLoading(false);
            console.log(responseJson);
            if(responseJson.status == 1) {  //or whatever use case we decide
                AsyncStorage.setItem('user_id', responseJson.data[0].user_id);
                console.log(responseJson.data[0].user_id);
                navigation.navigate(test);
            } else {
                setErrortext('Please check your email or password');
                console.log('Please check your email or password');
            }
        })
        .catch(error => {
            setLoading(false);
            console.error(error);
        });
    }

    return (
        <View style={styles.mainBody}>
        <View style={styles.duoBody}>
        </View>
        <View style={styles.mainBody}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View>
              <KeyboardAvoidingView enabled>
                {/* Agile poker bidding title */}
                {/* <View style={{ marginTop: 20, marginBottom: 20 }}>
                    <Text style={styles.loginTitle}>Agile Poker Bidding</Text>
                </View> */}
                <View style={{ alignItems: 'center', paddingTop: 30 }}>
                    <CoffeeCup />
                </View>
                <View style={styles.SectionStyle}>
                    <Text style={styles.inputHeader}>Email</Text>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={UserEmail => setUserEmail(UserEmail)}
                        placeholder="" 
                        placeholderTextColor="#000"
                        autoCapitalize="none"
                        keyboardType="default"
                        ref={ref => {
                            this._emailinput = ref;
                        }}
                        returnKeyType="next"
                        onSubmitEditing={() =>
                            this._passwordinput && this._passwordinput.focus()
                        }
                        blurOnSubmit={false}
                    />
                </View>
                <View style={styles.SectionStyle}>
                    <Text style={styles.inputHeader}>Password</Text>
                    <TextInput
                        style={styles.inputStyle}
                        onChangeText={UserPassword => setUserPassword(UserPassword)}
                        placeholder="" 
                        placeholderTextColor="#000"
                        autoCapitalize="none"
                        keyboardType="default"
                        secureTextEntry={true}
                        ref={ref => {
                            this._passwordinput = ref;
                        }}
                        onSubmitEditing={Keyboard.dismiss}
                        blurOnSubmit={false}
                    />
                </View>
                {errortext != '' ? (
                  <Text style={styles.errorTextStyle}> {errortext} </Text>
                ) : null}
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={handleSubmitPress}>
                    <Text style={styles.buttonTextStyle}>LOGIN</Text>
                </TouchableOpacity>
                <View style={styles.inlineText}>
                    <Text
                        style={styles.forgotPasswordTextStyle}
                        onPress={() => navigation.navigate('RegisterScreen')}>
                        Forgot Password?
                    </Text>
                    <Text
                        style={styles.registerTextStyle}
                        onPress={() => navigation.navigate('RegisterScreen')}>
                        New Here? Register
                    </Text>
                </View>
              </KeyboardAvoidingView>
            </View>
          </ScrollView>
        </View>
        </View>
      );
}

export default LoginScreen;