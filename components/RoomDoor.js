import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import constants from '../config/constants';
import * as GLOBAL from '../state/global';

import { styles } from '../styles/styles';
import { CoffeeCup } from './Images';
import { BackArrow } from './Images';

class RoomDoor extends Component {
    state = {
        nickname: '',
        errorText: '',
        roomStatus: constants.ROOM_STATUS_UNKNOWN,
    };

    componentDidMount() {
        if (!GLOBAL.roomServiceSocket) {
            console.log("NO SOCKET ERROR STATE");
        } else {
            // Set up event listeners
            GLOBAL.roomServiceSocket.on('room_status_fetched', event => this.onRoomStatusFetched(event));
            // Fire off an event to request for the room status
            GLOBAL.roomServiceSocket.emit('is_room_open', { roomID: GLOBAL.roomName });
        }
    }

    componentWillUnmount() {
        if (GLOBAL.roomServiceSocket) {
            GLOBAL.roomServiceSocket.on('room_status_fetched', event => { return; });
        }
    }

    joinRoomPress = () => {
        this.props.navigation.navigate("RoomScreen");
    }

    backButtonPressed = () => {
        this.props.navigation.navigate("HomeScreen");
    }

    onRoomStatusFetched = (event) => {
        this.setState({
            roomStatus: event.status
        });
    }

    renderRoomUnknown = () => {
        return (
            <Text style={styles.doorTextStyle}>
                Please wait while we fetch your room!
            </Text>
        );
    }

    renderRoomInactive = () => {
        return (
            <>
                <Text style={styles.doorTextStyle}>
                    The room you are hoping to {"\n"}
                    join is not open yet. :(
                </Text>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={() => this.backButtonPressed()}>
                    <Text style={styles.buttonTextStyle}>BACK TO HOME</Text>
                </TouchableOpacity>
            </>
        );
    }

    renderRoomActive = () => {
        return (
            <>
                <Text style={styles.doorTextStyle}>
                    You are joining {GLOBAL.roomName}'s room! {"\n"}
                    Enter a nickname to join.
                </Text>
                <Text style={styles.errorTextStyle}>{this.state.errorText}</Text>
                <TextInput
                    style={{borderColor: "black", borderWidth: 1, width: '80%', alignItems: 'center', alignSelf: 'center'}}
                    onChangeText={nickname => this.setState({nickname})}
                    placeholder="Name" 
                    autoCapitalize="none"
                    keyboardType="default"
                    blurOnSubmit={false}
                />
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={() => this.joinRoomPress()}>
                    <Text style={styles.buttonTextStyle}>JOIN ROOM</Text>
                </TouchableOpacity>
            </>
        );
    }

    render() {
        return (
            <View style={styles.mainBody} >
            <View style={styles.duoBody}>
            <View style={{flex: 1, paddingLeft: 10, paddingTop: 25}}>
                <TouchableOpacity onPress={() => this.backButtonPressed()}>
                    <BackArrow />
                </TouchableOpacity>       
            </View>
            </View>
            <View style={styles.homeBody}>
                <View style={{flex: 1, marginTop: 20}}>
                    <CoffeeCup />
                </View>
                <Text style={styles.pileplanStyle}>
                        PilePlan
                </Text>
                <View style={{flex:5}}>
                    {
                        this.state.roomStatus === constants.ROOM_STATUS_ACTIVE
                            ? this.renderRoomActive()
                            : this.state.roomStatus === constants.ROOM_STATUS_INACTIVE
                            ? this.renderRoomInactive()
                            : this.renderRoomUnknown()
                    }
                </View>
            </View>
            </View>
        );
    }
}

export default RoomDoor;