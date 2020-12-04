import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CreateRoomCardOptions = ({ onPressEdit, onPressDelete }) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.editPressable}
        onPress={onPressEdit}>
        <Icon 
          name='create' 
          style='outlined'
          size={30}
        />
      </Pressable>
      <Pressable
        style={styles.deletePressable}
        onPress={onPressDelete}>
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
    borderTopColor: 'lightgray'
  },
  deletePressable: {
    flex: 1,
    backgroundColor: 'red',
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  editPressable: {
    flex: 1,
    backgroundColor: 'green',
    borderBottomLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CreateRoomCardOptions;
