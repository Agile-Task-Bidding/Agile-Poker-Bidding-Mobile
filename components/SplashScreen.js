import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { styles } from '../styles/styles'

function SplashScreen({ navigation }) {
    let [animating, setAnimating] = useState(true);

    useEffect(() => {
        setTimeout(() => {
          setAnimating(false);
          AsyncStorage.getItem('user_id').then(value =>
            navigation.navigate(
              value === null ? 'LoginScreen' : 'test'
            )
          );
        }, 5000);
      }, []);

      return (
        <View style={styles.container}>
          <ActivityIndicator
            animating={animating}
            color="#FFFFFF"
            size="large"
            style={styles.activityIndicator}
          />
        </View>
      );
}

export default SplashScreen;