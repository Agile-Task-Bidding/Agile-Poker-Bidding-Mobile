
import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PickingCard = ({ value, tag, selected, onSelect }) => {
  const isAbstain = (value === 'ABSTAIN');

  return (
    <Pressable
      onPress={onSelect}
      style={(selected) ? selectedStyles.container : styles.container}
    >
      <View style={styles.properties}>
        <View style={styles.valueContainer}>
          {
            (isAbstain) ?
              <Icon 
                name='local-cafe' 
                size={80}
                color={(selected) ? 'white' : 'black'}  
              />
            :
              <Text style={(selected) ? selectedStyles.value : styles.value}>
                {value}
              </Text>
          }
        </View>
        <View style={styles.tagContainer}>
          <Text style={(selected) ? selectedStyles.tag : styles.tag}>
            {tag}
          </Text>
        </View>
      </View>
    </Pressable>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  value: {
    color: 'black',
    flexGrow: 1,
    textAlignVertical: 'center',
    fontFamily: baseFontFamily,
    fontWeight: 'normal',
    fontSize: 80,
    textAlign: 'center'
  },
  tag: {
    color: 'black',
    fontFamily: baseFontFamily,
    fontSize: 25,
    textAlign: 'center'
  }
});

// Fastest way to implement this
const selectedStyles = StyleSheet.create({
  container: {
    flexBasis: 160,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 220,
    backgroundColor: '#2B84ED',
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
    color: 'white',
    flexGrow: 1,
    textAlignVertical: 'center',
    fontFamily: baseFontFamily,
    fontWeight: 'normal',
    fontSize: 80,
    textAlign: 'center'
  },
  tag: {
    color: 'white',
    fontFamily: baseFontFamily,
    fontSize: 25,
    textAlign: 'center'
  }
});

export default PickingCard;
