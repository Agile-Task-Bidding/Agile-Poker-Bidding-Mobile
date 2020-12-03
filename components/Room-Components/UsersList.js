import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';

import { styles } from '../../styles/styles';

class UsersList extends Component {
    state = {
        isHost: true,
        userList: [
            "user1",
            "user2",
            "user3",
            "user4",
            "user5",
            "user6",
            "user7",
            "user8",
            "user9",
            "user10",
            "user11",
            "user12",
            "user13",
        ]
    };

    kickUser = (User) => {
        console.log("Kick" + User);
    }

    kickButtonPressed = (User) => {
        Alert.alert(
            " ",
            "Kick " + User + "?",
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
        if(this.state.isHost)
            return (
                <TouchableOpacity style={styles.kickButton} onPress={() => this.kickButtonPressed(User)}>
                    <Text>Click Me</Text>
                </TouchableOpacity>
            );
        else
            return(
            <TouchableOpacity style={styles.kickButton}>
            </TouchableOpacity>
            );
    }

    generateUsers = () => this.state.userList.map((e, index) => {
        return (
            <View style={styles.usersView} key={index}>
                <Text style={styles.usersTextStyle}>
                    {e}
                </Text>
                {this.hostKickButton(e)}
            </View>
        );
    });

    render() {
        console.log(this.props.roomState);

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