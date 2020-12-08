import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CreateRoomCardOptions = ({ onPressEdit, onPressDelete }) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.editPressable}
        onPress={onPressEdit}
        android_ripple={{
          color: 'white',
          borderless: false,
          radius: 50
        }}
        >
        <Icon 
          name='create'
          size={30}
        />
      </Pressable>
      <Pressable
        style={styles.deletePressable}
        onPress={onPressDelete}
        android_ripple={{
          color: 'white',
          borderless: false,
          radius: 50
        }}
        >
        <Icon name='delete' size={30}/>
      </Pressable>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden'
  },
  deletePressable: {
    flex: 1,
    backgroundColor: '#FF000060',
    justifyContent: 'center',
    alignItems: 'center'
  },
  editPressable: {
    flex: 1,
    backgroundColor: '#00FF0060',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CreateRoomCardOptions;
