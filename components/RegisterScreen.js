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
    Alert,
    TouchableOpacity,
    KeyboardAvoidingView,
    BackHandler,
} from 'react-native';
import auth from '@react-native-firebase/auth';

import { styles } from '../styles/styles';
import CoffeeCup from './Images';

function LoginScreen({ navigation }) {
  let [userName, setUserName] = useState('');
  let [userEmail, setUserEmail] = useState('');
  let [userPassword, setUserPassword] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');
  let [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

  const firebaseLogin = () => {
    auth()
    .createUserWithEmailAndPassword(userEmail, userPassword)
    .then(() => {
      console.log('User account created & signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
  }

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
        alert('Please fill in Email');
        return;
    }
    if (!userEmail) {
      alert('Please fill in User Name');
      return;
    }
    if (!userPassword) {
        alert('Please fill in Password');
        return;
    }
    firebaseLogin();
    Alert.alert('pressed', 'Button has been pressed username: ' + userName + ' email: ' + userEmail + ' password: ' + userPassword);

  }

  return (
    <View style={styles.mainBody}>
    <View style={styles.duoBody}>
    </View>
    <View style={styles.mainBody}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{ alignItems: 'center', paddingTop: 30 }}>
                <CoffeeCup />
            </View>
            <View style={styles.SectionStyle}>
                <Text style={styles.inputHeader}>UserName</Text>
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={userName => setUserName(userName)}
                    placeholder="" 
                    placeholderTextColor="#000"
                    autoCapitalize="none"
                    keyboardType="default"
                    ref={ref => {
                        this.userinput = ref;
                    }}
                    returnKeyType="next"
                    onSubmitEditing={() =>
                        this._emailinput && this._emailinput.focus()
                    }
                    blurOnSubmit={false}
                />
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
                <Text style={styles.buttonTextStyle}>REGISTER</Text>
            </TouchableOpacity>
            <View style={styles.inlineText}>
                <Text
                    style={styles.forgotPasswordTextStyle}
                    onPress={() => navigation.navigate('LoginScreen')}>
                    Go Back
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