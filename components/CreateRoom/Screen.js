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

const CreateRoomScreen = ({ navigation }) => {
  const [deck, setDeck] = useState(defaultDeck);
  const [allowAbstain, setAllowAbstain] = useState(defaultAllowAbstain);

  const [modalIsVisible, setModalIsVisible] = useState(false);
  // Either 'create' or 'edit'
  const [modalIntent, setModalIntent] = useState('create');
  const [editTarget, setEditTarget] = useState();

  const addCard = (value, tag) => {
    const card = { value, tag };
    setDeck([...deck, card]);
  };

  const openEditModal = (index) => {
    setEditTarget(index);
    setModalIntent('edit');
    setModalIsVisible(true);
  }

  const onEdit = (index, value, tag) => {
    const card = { value, tag };
    const newDeck = [...deck];
    newDeck[index] = card;
    setDeck(newDeck);
    // Reset the modal intent
    setModalIntent('create');
  };

  const deleteCard = (index) => {
    const newDeck = [...deck];
    newDeck.splice(index, 1);
    setDeck(newDeck);
  }

  return (
    <>
      <CreateRoomHeader navigation={navigation}/>
      <View style={styles.container}>
        <CreateRoomCardList deck={deck} deleteCard={deleteCard} openEditModal={openEditModal} />
        <CreateRoomAddCardButton onPress={() => setModalIsVisible(true)} />
        <CreateRoomCreateCardModal
          visible={modalIsVisible}
          modalIntent={modalIntent}
          onSubmit={
            (modalIntent === 'edit') ?
            (value, tag) => onEdit(editTarget, value, tag)
            :
            addCard
          }
          setVisible={setModalIsVisible}
          initialValue={(modalIntent === 'edit') && deck[editTarget].value}
          initialTag={(modalIntent === 'edit') && deck[editTarget].tag} />
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
