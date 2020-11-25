import React, { Component } from 'react';
import { Text, Alert } from 'react-native';

import config from '../config/config'
import io from 'socket.io-client';

class socketTest extends Component {
    componentDidMount() {
        const socket = io(config.SOCKET_URL, {path: config.ROOM_SERVICE_SOCKET});
        console.log(socket);
    }
    render() {
        return (
            <Text>Hello</Text>
        );
    }
}

export default socketTest;