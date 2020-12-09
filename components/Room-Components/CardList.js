import React from 'react';
import { Text, FlatList, StyleSheet } from 'react-native';
import PickingCard from './PickingCard';
import * as GLOBAL from '../../state/global';

const selectCard = (cardIndex) => {
  // Set the selected card index in global
  GLOBAL.selectedCardIndex = cardIndex;
  // send to socket the cardIndex
  GLOBAL.roomServiceSocket.emit('user_vote', { roomID: GLOBAL.roomName, cardIndex });
}

const CreateRoomCardList = ({ deck, pickedIndex }) => {
  const renderCard = ({ item, index }) => (
    <PickingCard
      key={index}
      value={item.value}
      tag={item.tag}
      selected={index === pickedIndex}
      onSelect={() => selectCard(index)}
    />
  );

  return (
    <FlatList
      data={deck}
      renderItem={renderCard}
      horizontal={false}
      keyExtractor={(item, index) => index}
      numColumns={2}
      columnWrapperStyle={styles.column}
    />
  );
};

const styles = StyleSheet.create({
  column: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default CreateRoomCardList;
