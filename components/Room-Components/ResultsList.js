import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { styles } from '../../styles/styles';
import { listMembersAndVotes } from '../../util/results';

FlatListItemSeparator = () => {
    return (
        <View
            style={{
                height: 1,
                width: "100%",
                backgroundColor: "#333",
            }}
        />
    );
}

const ResultsList = ({ roomState }) => {

    const renderItem = ({ item }) => {
        return (
            <>
                <View style={styles.resultsListItem}>
                    <Text style={styles.nicknameText}>{item.nickname}</Text>
                    <Text style={styles.voteText}>{item.vote}</Text>
                </View>
                <FlatListItemSeparator/>
            </>
        );
    }
    return (
        <View>
            <FlatListItemSeparator/>
            <FlatList
                data={listMembersAndVotes(roomState)}
                renderItem={renderItem}
                keyExtractor={(item) => {item.socketID}}
            />
        </View>
    )
}

export default ResultsList;