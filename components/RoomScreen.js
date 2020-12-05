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
import { CoffeeCupSmall, UserImage, BackArrow } from './Images';
import PickingPhase from './Room-Components/PickingPhase';
import ResultsPhase from './Room-Components/ResultsPhase';
import UsersList from './Room-Components/UsersList';

class RoomScreen extends Component {
    state = {
        usersListOpen: false,
        roomState: null,
    };

    componentDidMount() {
        if (!GLOBAL.roomServiceSocket) {
            // This is an error state as it should always be initialized. We may want to just boot
            // the user back to the home screen with a popup alert.
            console.log("NO SOCKET ERROR STATE");
        } else {
            // We can add events like so:
            GLOBAL.roomServiceSocket.on('room_state_changed', event => this.onRoomStateChanged(event));
        }
    }

    componentWillUnmount() {
        // No error state is needed here -- we just need to make sure the
        // socket exists before trying to unsubscribe to listeners.
        if (GLOBAL.roomServiceSocket) {
            // We can "unsubscribe" to events like so (should be done for every listener that was initialized):
            GLOBAL.roomServiceSocket.on('room_state_changed', event => { return; });
        }
    }

    // Handles setting the state if the client receives a room_state_changed event
    onRoomStateChanged = (event) => {
        this.setState({
            roomState: event.roomState
        });
    }

    backButtonPressed = () => {
        console.log('OK');
        this.props.navigation.navigate("HomeScreen");
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
                            <BackArrow />
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
                    <Text>roomState or roomState.phase DNE</Text>
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