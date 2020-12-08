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
        <View style={styles.tagContainer}>
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

// This should probably be imported from somewhere.
const baseFontFamily = 'ReemKufi-Regular';

const styles = StyleSheet.create({
  container: {
    flexBasis: 160,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 220,
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 3,
    margin: 5
  },  
  properties: {
    flexGrow: 1,
    padding: 10,
    width: 'auto'
  },
  valueContainer: {
    overflow: 'hidden',
    flex: 1
  },
  value: {
    fontFamily: baseFontFamily,
    fontWeight: 'normal',
    fontSize: 80,
    textAlign: 'center',
    lineHeight: 100
  },
  tagContainer: {
  },  
  tag: {
    fontFamily: baseFontFamily,
    fontSize: 25,
    textAlign: 'center'
  },
});

export default CreateRoomCard;
