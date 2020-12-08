import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CreateRoomHeader = () => {
  return (
    <View style={styles.container}>
      <Icon name='home' size={35} color='white'/>
      <Pressable 
        style={styles.startRoomButton}
        android_ripple={{
          color: 'white',
          borderless: false,
          radius: 100
        }}
        >
        <View style={styles.startRoomGroup}>
          <Text style={styles.text}>
            Start Room
          </Text>
          <Icon 
            name='play-arrow' 
            color='white' 
            size={20} 
            style={styles.playIcon}
          />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2B84ED',
    height: 50,
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  startRoomButton: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    padding: 7
  },
  text: {
    color: 'white'
  },
  startRoomGroup: {
    flexDirection: 'row',
  },
  playIcon: {
    paddingLeft: 5
  }
});

export default CreateRoomHeader;
