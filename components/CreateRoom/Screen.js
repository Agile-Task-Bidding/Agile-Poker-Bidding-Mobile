import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import CreateRoomCardList from './CardList';
import CreateRoomCreateCardModal from './CreateCardModal';
import CreateRoomAddCardButton from './AddCardButton';
import CreateRoomHeader from './Header';
import { createStackNavigator } from '@react-navigation/native';
import CreateRoomFooter from './Footer';

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

const defaultAllowAbstain = true;

const CreateRoomScreen = () => {
  const [deck, setDeck] = useState(defaultDeck);
  const [allowAbstain, setAllowAbstain] = useState(defaultAllowAbstain);

  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [modalAction, setModalAction] = useState();
  const [editTarget, setEditTarget] = useState(-1);

  const addCard = (value, tag) => {
    const card = { value, tag };
    setDeck([...deck, card]);
    console.log('set deck');
  };

  const deleteCard = (index) => {
    console.log(index);
  }

  return (
    <>
      <CreateRoomHeader />
      <View style={styles.container}>
        <CreateRoomCardList deck={deck} deleteCard={deleteCard} />
        <CreateRoomAddCardButton onPress={() => setModalIsVisible(true)} />
        <CreateRoomCreateCardModal
          visible={modalIsVisible}
          addCard={addCard}
          setVisible={setModalIsVisible} />
      </View>
      <CreateRoomFooter
        onSave={() => console.log('saved')}
        allowAbstain={allowAbstain}
        setAllowAbstain={setAllowAbstain}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: '#ededed'
  }
});

export default CreateRoomScreen;
