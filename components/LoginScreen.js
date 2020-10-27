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

import { styles } from '../styles/styles';
import test from './test';

function LoginScreen({ navigation }) {
    let [userEmail, setUserEmail] = useState('');
    let [userPassword, setUserPassword] = useState('');
    let [loading, setLoading] = useState(false);
    let [errortext, setErrortext] = useState('');

    const handleSubmitPress = () => {
        setErrortext('');
        if (!userEmail) {
            alert('Please fill Email');
            return;
        }
        if (!userPassword) {
            alert('Please fill Password');
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
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={{ marginTop: 100 }}>
              <KeyboardAvoidingView enabled>
                <View style={{ alignItems: 'center' }}>
                  {/* <Image
                    source={require('../assets/cup.PNG')}
                    style={{
                      width: 70,
                      height: 80,
                      resizeMode: 'contain',
                      margin: 30,
                    }}
                  /> */}
                </View>
                <View style={styles.SectionStyle}>
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={UserEmail => setUserEmail(UserEmail)}
                    placeholder="Enter Email" //dummy@abc.com
                    placeholderTextColor="#F6F6F7"
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
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={UserPassword => setUserPassword(UserPassword)}
                    placeholder="Enter Password" //12345
                    placeholderTextColor="#F6F6F7"
                    autoCapitalize="none"
                    keyboardType="default"
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
                <Text
                  style={styles.registerTextStyle}
                  onPress={() => navigation.navigate('RegisterScreen')}>
                  New Here ? Register
                </Text>
              </KeyboardAvoidingView>
            </View>
          </ScrollView>
        </View>
      );
}

export default LoginScreen;