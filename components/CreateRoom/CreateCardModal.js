import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TextInput, Button } from 'react-native';

const CreateRoomCreateCardModal = ({ visible, addCard, setVisible }) => {
  const [value, setValue] = useState('');
  const [tag, setTag] = useState('');

  const onPressCreate = () => {
    // Add the card to the deck
    addCard(value, tag);

    // Reset the state variables
    setValue('');
    setTag('');

    setVisible(false);
  }

  const onPressCancel = () => {
    // Reset the state variables
    setValue('');
    setTag('');

    setVisible(false);
  }

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={visible}
    >
      <View style={styles.modal}>
        <View style={styles.container}>
          <Text style={styles.title}>Create Card</Text>
          <View style={styles.form}>
            <Text>Value</Text>
            <TextInput
              style={[styles.input, styles.valueInput]}
              onChangeText={setValue}
              value={value}
              keyboardType='number-pad'
              placeholder='5'
              maxLength={3}
              allowFontScaling={true}
            />
            <Text>Tag</Text>
            <TextInput 
              style={[styles.input, styles.tagInput]}
              onChangeText={setTag}
              value={tag}
              placeholder='Hard'
              maxLength={16}
              allowFontScaling={true}
              maxFontSizeMultiplier={0}
            />
          </View>
          <View style={styles.controls}>
            <Button 
              color='gray' 
              title='Cancel'
              onPress={onPressCancel}
            />
            <Button 
              title='Create'
              onPress={onPressCreate}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0008'
  },
  container: {
    justifyContent: 'space-between',
    height: 300,
    width: 250,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    elevation: 10
  },
  form: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    height: 40,
    borderColor: 'lightgrey',
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: 'white',
    paddingHorizontal: 5,
    marginTop: 5,
    elevation: 2,
    textAlign: 'center'
  },
  valueInput: {
    height: 80,
    width: 90,
    fontSize: 40,
  },
  tagInput: {
    height: 45,
    width: 200,
    fontSize: 20
  },  
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexGrow: 0,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20
  }
})

export default CreateRoomCreateCardModal;
