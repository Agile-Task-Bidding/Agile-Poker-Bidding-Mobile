import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import * as GLOBAL from '../../state/global';

import { styles } from '../../styles/styles';

class UsersList extends Component {

    kickUser = (user) => {
        GLOBAL.roomServiceSocket.emit('kick_user', { roomID: GLOBAL.roomName, user, authToken: GLOBAL.authToken });
    }

    kickButtonPressed = (User) => {
        Alert.alert(
            " ",
            "Kick " + User.nickname + "?",
            [
                {
                    text: "Yes",
                    onPress: () => this.kickUser(User),
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
            console.log(userElements);
            userElements.push(
                <View style={styles.usersView} key={key}>
                    <Text style={styles.usersTextStyle}>
                        {value.nickname}
                    </Text>
                    {this.hostKickButton(value)}
                </View>
            );
        }
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