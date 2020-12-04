import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import CreateRoomCardOptions from './CardOptions';

const CreateRoomCard = ({ value, tag, onPressDelete }) => {
  return (
    <View style={styles.container}>
      <View style={styles.properties}>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>
            {value}
          </Text>
        </View>
        <View>
          <Text style={styles.tag}>
            {tag}
          </Text>
        </View>
      </View>
      <CreateRoomCardOptions
        onPressEdit={() => console.log('edit')}
        onPressDelete={onPressDelete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexBasis: 160,
    justifyContent: 'space-between',
    height: 210,
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 3,
    margin: 5
  },  
  properties: {
    alignItems: 'center',
    padding: 10,
  },
  valueContainer: {
    height: 90,
    overflow: 'hidden'
  },
  value: {
    fontWeight: 'bold',
    fontSize: 80,
    lineHeight: 95
  },
  tag: {
    fontSize: 25
  },
});

export default CreateRoomCard;
