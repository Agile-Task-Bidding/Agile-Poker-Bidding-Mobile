import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

import { styles } from '../styles/styles'

function test({ navigation }) {
    return(
        <View style={styles.center}>
            <Text>
                Hello
            </Text>
            <Button
                title="Go Home"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
}

export default test;