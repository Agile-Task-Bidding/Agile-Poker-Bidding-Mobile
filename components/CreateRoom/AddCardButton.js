import React from 'react';
import { Pressable, StyleSheet, View, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CreateRoomAddCardButton = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        style={styles.button}
        android_ripple={{
          color: 'white',
          borderless: true,
          radius: 35
        }}
      >
        <Icon name="add" size={30} color="white"/>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 70,
    height: 70,
    backgroundColor: '#2B84ED',
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
});

export default CreateRoomAddCardButton;
