import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { styles } from '../../styles/styles';
import { listMembersAndVotes } from '../../util/results';

const ResultsList = ({ roomState }) => {

    const renderItem = ({ item }) => {
        return (
            <View key={item.socketID} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>{item.nickname}</Text>
                <Text>{item.vote}</Text>
            </View>
        );
    }
    return (
        <FlatList
            data={listMembersAndVotes(roomState)}
            renderItem={renderItem}
        />
    )
}

export default ResultsList;