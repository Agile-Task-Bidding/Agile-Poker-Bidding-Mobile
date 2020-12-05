import React, { Component } from 'react';
import {
    Button,
    View,
    Text,
    ScrollView,
    Alert,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { styles } from '../styles/styles';
import auth from '@react-native-firebase/auth';

import Constants from '../config/constants';
import * as GLOBAL from '../state/global';
import { CoffeeCupSmall, UserImage, BackArrow, LeaveRoom } from './Images';
import PickingPhase from './Room-Components/PickingPhase';
import ResultsPhase from './Room-Components/ResultsPhase';
import UsersList from './Room-Components/UsersList';
import constants from '../config/constants';

class RoomScreen extends Component {
    state = {
        usersListOpen: false,
        roomState: null,
    };

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            if (!GLOBAL.roomServiceSocket) {
                console.log("NO SOCKET ERROR STATE");
            } else {
                // Add event listeners.
                GLOBAL.roomServiceSocket.on('room_state_changed', event => this.onRoomStateChanged(event));
                GLOBAL.roomServiceSocket.on('join_success', event => this.onJoinSuccess(event));
                GLOBAL.roomServiceSocket.on('host_closed_connection', event => this.onHostClosedConnection(event));
                // Fire off a join room request.
                GLOBAL.roomServiceSocket.emit('join_room', { roomID: GLOBAL.roomName, nickname: GLOBAL.nickname });
                GLOBAL.roomServiceSocket.emit('is_room_open', { roomID: GLOBAL.roomName });
            }
        });
        this.props.navigation.addListener('blur', () => {
            if (GLOBAL.roomServiceSocket) {
                // We can "unsubscribe" to events like so (should be done for every listener that was initialized):
                GLOBAL.roomServiceSocket.on('room_state_changed', event => { return; });
                GLOBAL.roomServiceSocket.on('join_success', event => { return; });
                GLOBAL.roomServiceSocket.on('host_closed_connection', event => { return; });
                // Fire off a leave room request.
                GLOBAL.roomServiceSocket.emit('leave_room');
                // Clear out some GLOBAL stuff
                GLOBAL.isHost = false;
                GLOBAL.selectedCardIndex = null;
            }
        });
    }

    onHostClosedConnection = (event) => {
        // We want to navigate the user to a kicked screen.
        this.props.navigation.navigate("KickedScreen");
    }

    onJoinSuccess = (event) => {
        // If we want to add anything here, go ahead.
    }

    // Handles setting the state if the client receives a room_state_changed event
    onRoomStateChanged = (event) => {
        // If the phase is transitioning, clear out the selectedCardIndex in preparation for next round
        if (this.state.roomState && (this.state.roomState.phase !== event.roomState.phase)) {
            GLOBAL.selectedCardIndex = null;
        }
        // Set the state appropriately
        this.setState({
            roomState: event.roomState
        });
    }

    backButtonPressed = () => {
        if (this.state.usersListOpen) {
            this.setState({
                usersListOpen: false
            });
        } else {
            this.props.navigation.navigate("HomeScreen");
        }
    }
    
    // Opens the users list
    userButtonPressed = () => {
        this.setState({
            usersListOpen: true,
        });
    }

    // Should be passed to the users list component so that it can be used to affect state on this wrapper
    // component. Alternatively, if the button exists in the header (such as replacing the back button), you
    // could just conditionally use this function in the renderHeader function.
    closeUserList = () => {
        this.setState({
            usersListOpen: false,
        });
    }

    renderHeader() {
        // Code to render a header on each page should go here. It can utilize
        // roomState.phase for any differences. You can have conditionals in the
        // jsx, or you can declare variables before the return statement to use.
        return (
            <View style={styles.roomDuoBody}>
                <View style={{flexDirection: 'row'}}>  
                    <View style={{flex: 1, paddingLeft: 10, paddingTop: 25}}>
                        <TouchableOpacity onPress={() => this.backButtonPressed()}>
                            {
                                this.state.usersListOpen
                                    ? <BackArrow />
                                    : <LeaveRoom style={{ transform: "scale(2, 2)" }} />
                            }
                        </TouchableOpacity>       
                    </View>
                    <View style={{flex: 1, marginBottom: 25}}>
                        <CoffeeCupSmall />              
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <TouchableOpacity style={{paddingTop: 25, paddingRight: 20}} onPress={()=>this.userButtonPressed()}>
                            <UserImage />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    render() {
        // Error state where roomState does not exist (may have to change later -- it may turn into a loading state)
        if (!this.state.roomState || !this.state.roomState.phase) {
            return (
                <>
                    {this.renderHeader()}
                    <Text>Please wait while we load your room!</Text>
                </>
            )
        }
        // Users List is open
        else if (this.state.usersListOpen) {
            return (
                <>
                    {this.renderHeader()}
                    <UsersList
                        roomState={this.state.roomState}
                        closeUserList={this.closeUserList}
                        navigation={this.props.navigation}
                    />
                </>
            )
        }
        // Picking Phase is active
        else if (this.state.roomState.phase === Constants.PICKING_PHASE) {
            return (
                <>
                    {this.renderHeader()}
                    <PickingPhase
                        roomState={this.state.roomState}
                        navigation={this.props.navigation}
                    />
                </>
            );
        }
        // Results Phase is active
        else if (this.state.roomState.phase === Constants.RESULTS_PHASE) {
            return (
                <>
                    {this.renderHeader()}
                    <ResultsPhase
                        roomState={this.state.roomState}
                    />
                </>
            );
        }
    }
}

export default RoomScreen;