import React, { useCallback, useEffect, useState } from 'react';
import { Alert, View, StyleSheet, Button } from 'react-native';
import CreateRoomCardList from './CardList';
import CreateRoomCreateCardModal from './CreateCardModal';
import CreateRoomAddCardButton from './AddCardButton';
import CreateRoomHeader from './Header';
import { useFocusEffect } from '@react-navigation/native';
import CreateRoomFooter from './Footer';
import axios from 'axios';
import config from '../../config/config';
import { firebase } from '@react-native-firebase/auth';
import * as GLOBAL from '../../state/global';


const getRoomConfig = async () => {
  const uid = firebase.auth().currentUser.uid;
  const token = await firebase.auth().currentUser.getIdToken();
  const path = `${config.API_URL}/users/${uid}/roomConfig`;

  let response;
  try {
    response = await axios.get(path, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  } catch (e) {
    Alert.alert('Error', e.message);
    console.error(e);
  }

  return response.data.roomConfig;
}

// Update the room config and assume it works because error checking is for squares
const putRoomConfig = async (deck, allowAbstain) => {
  const uid = firebase.auth().currentUser.uid;
  const token = await firebase.auth().currentUser.getIdToken();
  const path = `${config.API_URL}/users/${uid}/roomConfig`;
  const roomConfig = { deck, allowAbstain };

  let response;
  try {
    response = await axios.put(path, { roomConfig }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (e) {
    console.error(e.response.data);
  }
}

const startRoom = async (roomConfig) => {
  const roomId = firebase.auth().currentUser.displayName;
  const authToken = await firebase.auth().currentUser.getIdToken();
  GLOBAL.roomServiceSocket.emit('create_room', {
    roomId,
    roomConfig,
    authToken
  });
  console.log('sending create_room to socket');
}

const CreateRoomScreen = ({ navigation }) => {
  const [deck, setDeck] = useState();
  const [allowAbstain, setAllowAbstain] = useState(false);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  // Either 'create' or 'edit'
  const [modalIntent, setModalIntent] = useState('create');
  const [editTarget, setEditTarget] = useState();

  // Fetch the room config and set the initial deck and allow abstain state
  useFocusEffect(
    useCallback(() => {
      const setInitialState = async () => {
        const roomConfig = await getRoomConfig(firebase.auth().currentUser.uid);
        setDeck(roomConfig.deck);
        setAllowAbstain(roomConfig.allowAbstain);
      }
      setInitialState();
    }, [])
  );

  const navigateToRoom = () => {
    console.log('navigating to room');
    GLOBAL.roomName = firebase.auth().currentUser.displayName;
    navigation.navigate('RoomDoor');
  }

  // If we receieve a room_already_created or create_success event from the 
  // room service we should navigate to the room page
  useFocusEffect(
    useCallback(() => {
      GLOBAL.roomServiceSocket.on('room_already_created', () => console.log('got room_already_created'));
      GLOBAL.roomServiceSocket.on('create_success', () => console.log('got create_success'));
      console.log('registered listeners');

      return () => {
        console.log('cleaning up listeners');
        GLOBAL.roomServiceSocket.off('room_already_created', navigateToRoom);
        GLOBAL.roomServiceSocket.off('create_success', navigateToRoom);
      }
    }, [])
  );

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

  const onSave = () => {
    putRoomConfig(deck, allowAbstain).then(() => {
      Alert.alert('Success', 'Room config saved');
    });
  };

  const onStart = () => {
    console.log('putting room config');
    putRoomConfig(deck, allowAbstain);
    console.log('starting the room');
    startRoom({ deck, allowAbstain });
    console.log('room start sent');
    // The room service should respond with a create_success event, 
    // navigating us to our room door
  };

  return (
    <>
      <CreateRoomHeader 
        navigation={navigation} 
        onStartPress={onStart}
      />
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
        onSave={onSave}
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
