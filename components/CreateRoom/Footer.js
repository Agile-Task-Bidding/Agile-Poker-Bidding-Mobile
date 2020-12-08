import React from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CreateRoomFooter = ({ onSave, allowAbstain, setAllowAbstain }) => {
  const onChangeAllowAbstain = (allowAbstain) => {
    console.log(`Allow Abstain: ${allowAbstain}`);
    setAllowAbstain(allowAbstain);
  }

  return (
    <View style={styles.container}>
      <View style={styles.allowAbstainControl}>
        <CheckBox
          value={allowAbstain}
          onValueChange={onChangeAllowAbstain}
          tintColors={{
            true: 'white',
            false: 'white'
          }}
        />
        <Text style={styles.text}>
          Allow Abstain
        </Text>
      </View>

      <Pressable
        style={styles.saveConfigButton}
        android_ripple={{
          color: 'white',
          borderless: false,
          radius: 100
        }}
      >
        <View style={styles.saveConfigGroup}>
          <Icon 
            name='save' 
            color='white' 
            size={20} 
            style={styles.saveIcon}
          />
          <Text style={styles.text}>
            Save Config
          </Text>
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
  saveConfigButton: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    padding: 7
  },
  text: {
    color: 'white'
  },
  allowAbstainControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveConfigGroup: {
    flexDirection: 'row',
  },
  saveIcon: {
    paddingRight: 5
  }
});

export default CreateRoomFooter;
