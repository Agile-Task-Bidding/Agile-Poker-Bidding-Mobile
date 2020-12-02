import React, { Component } from 'react';
import { Text } from 'react-native';

class UsersList extends Component {
    state = {

    };

    render() {
        console.log(this.props.roomState);

        return (
            <Text>Users List</Text>
        );
    }
}

export default UsersList;