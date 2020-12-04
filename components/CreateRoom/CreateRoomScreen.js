import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import CreateRoomCardList from './CardList';
import CreateRoomCreateCardModal from './CreateCardModal';
import CreateRoomAddCardButton from './AddCardButton';

const defaultDeck = [
  {
    value: 1,
    tag: 'Very Easy'
  },
  {
    value: 3,
    tag: 'Easy'
  },
  {
    value: 5,
    tag: 'Medium'
  },
  {
    value: 999,
    tag: 'Hard'
  },
  {
    value: 13,
    tag: 'Very Hard'
  }
];


const CreateRoomScreen = () => {
  const [deck, setDeck] = useState(defaultDeck);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const addCard = (value, tag) => {
    const card = { value, tag };
    setDeck([ ...deck, card ]);
    console.log('set deck');
  };

  const deleteCard = (index) => {
    console.log(index);
  }

  return (
    <View style={styles.container}>
      <CreateRoomCardList deck={deck} deleteCard={deleteCard} />
      <CreateRoomAddCardButton onPress={() => setModalIsVisible(true)}/>
      <CreateRoomCreateCardModal
        visible={modalIsVisible}
        addCard={addCard}
        setVisible={setModalIsVisible} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 5,
    backgroundColor: '#ededed'
  }
});

export default CreateRoomScreen;
