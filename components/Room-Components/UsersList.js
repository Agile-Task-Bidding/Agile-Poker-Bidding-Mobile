import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import * as GLOBAL from '../../state/global';
import UserRow from './UserRow';

import { styles } from '../../styles/styles';

class UsersList extends Component {

    kickUser = (user) => {
        GLOBAL.roomServiceSocket.emit('kick_user', { roomID: GLOBAL.roomName, user, authToken: GLOBAL.authToken });
    }

    kickButtonPressed = (user) => {
        Alert.alert(
            " ",
            "Kick " + user.nickname + "?",
            [
                {
                    text: "Yes",
                    onPress: () => this.kickUser(user),
                },
                {
                    text: "No",
                },
            ]
            );
    }

    hostKickButton = (User) => {
        if(GLOBAL.isHost)
            return (
                <TouchableOpacity style={styles.kickButton} onPress={() => this.kickButtonPressed(User)}>
                    <Text>Kick</Text>
                </TouchableOpacity>
            );
        else
            return(
            <TouchableOpacity style={styles.kickButton}>
            </TouchableOpacity>
            );
    }

    generateUsers = () => {
        const userElements = [];
        for (const [key, value] of Object.entries(this.props.roomState.connectedUsersByID)) {
            const hasVoted = this.props.roomState.voteByUserID[key] !== null;
            const isHost = (key === this.props.roomState.hostSocketID);
            userElements.push(
                <UserRow
                    user={value}
                    hasVoted={hasVoted}
                    key={key}
                    isHost={isHost}
                />
            );
        };
        return userElements;
    }

    render() {
        return (
            <View style={styles.mainBody}>
                <ScrollView>
                    {this.generateUsers()}
                </ScrollView>
            </View>
        );
    }
}

export default UsersList;
