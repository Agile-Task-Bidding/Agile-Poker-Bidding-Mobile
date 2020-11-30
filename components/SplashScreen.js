import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, Image } from 'react-native';

import { styles } from '../styles/styles';
import CoffeeCup from './Images';

function SplashScreen({ navigation }) {
    let [animating, setAnimating] = useState(true);

    useEffect(() => {
        setTimeout(() => {
          setAnimating(false);
          navigation.navigate("LoginScreen");
        }, 1000);
      }, []);

      auth().onAuthStateChanged((user) => {
        if (user) {
            navigation.navigate("HomeScreen");
        }
    });

      return (
        <View style={styles.container}>
            <CoffeeCup />
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