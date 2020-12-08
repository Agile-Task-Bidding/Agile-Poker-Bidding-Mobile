import React from 'react';
import { Text, FlatList, StyleSheet } from 'react-native';
import CreateRoomCard from './Card';

const CreateRoomCardList = ({ deck, deleteCard, openEditModal }) => {
  const renderCard = ({item, index}) => (
    <CreateRoomCard 
      key={index} 
      value={item.value} 
      tag={item.tag}
      onPressDelete={() => deleteCard(index)}
      onPressEdit={() => openEditModal(index)} 
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
