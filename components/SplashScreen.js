import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Svg, { Path } from 'react-native-svg';

import { styles } from '../styles/styles';
import Images from './Images';

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
            <Images />
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