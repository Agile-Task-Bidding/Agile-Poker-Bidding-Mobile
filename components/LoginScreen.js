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
import auth from '@react-native-firebase/auth';

import { styles } from '../styles/styles';
import { CoffeeCup } from './Images';

function LoginScreen({ navigation }) {
    let [userEmail, setUserEmail] = useState('');
    let [userPassword, setUserPassword] = useState('');
    let [loading, setLoading] = useState(false);
    let [errortext, setErrortext] = useState('');
    let [userError, setUserError] = useState('');
    let [passError, setPassError] = useState('');

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
        setUserError('');
        setPassError('');
        if (!userEmail) {
            setUserError('Please fill in Email');
            return;
        } else {
            setUserError('');
        }
        if (!userPassword) {
            setPassError('Please fill in Password');
            return;
        } else {
            setPassError('');
        }
        setLoading(true);
        //something like this API use case still not declared \/
        auth()
        .signInWithEmailAndPassword(userEmail, userPassword)
        .then(() => {
        console.log('User account signed in!');
        })
        .catch(error => {
        if (error.code === 'auth/invalid-email') {
            setUserError('That email is Invalid');
        }

        if (error.code === 'auth/user-not-found') {
            setErrortext('User not found');
        }

        if (error.code === 'auth/wrong-password') {
            setErrortext('User not found');
        }

        console.error(error);
        });
    }

    auth().onAuthStateChanged((user) => {
        if (user) {
            navigation.navigate("HomeScreen");
        }
    });

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
                <TouchableOpacity style={{ alignItems: 'center', paddingTop: 30 }} onPress={()=>{navigation.navigate("HomeScreen")}}>
                    <CoffeeCup />
                </TouchableOpacity>
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
                    <Text style={styles.inputHeaderInline}>{userError}</Text>
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
                    <Text style={styles.inputHeaderInline}>{passError}</Text>
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
                        onPress={() => navigation.navigate('HomeScreen')}>
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