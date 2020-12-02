import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { styles } from '../styles/styles';
import config from '../config/config'
import io from 'socket.io-client';
import * as GLOBAL from '../state/global';
import { firebase } from '@react-native-firebase/auth';
import { firebaseConfig } from '../config/firebaseConfig';

firebase.initializeApp(firebaseConfig);

class socketTest extends Component {
    state = {
        joinRoomID: '',
        hostRoomID: '',
        nickname: '',
        roomState: null,
        roomConfig: {
            allowAbstain: true,
            deck: [
                {
                    tag: 'Ok',
                    value: 0,
                },
                {
                    tag: 'Test',
                    value: 1,
                },
                {
                    tag: 'Nice',
                    value: 2,
                }
            ]
        },
        cardIndex: '',
        authToken: '',
        email: '',
        password: '',
    };

    componentDidMount() {
        if (!GLOBAL.roomServiceSocket) {
            GLOBAL.roomServiceSocket = io(config.SOCKET_URL, { path: config.ROOM_SERVICE_SOCKET });
        }

        GLOBAL.roomServiceSocket.on('room_inactive', event => this.onRoomInactive(event));
        GLOBAL.roomServiceSocket.on('user_already_in_room', event => this.onUserAlreadyInRoom(event));
        GLOBAL.roomServiceSocket.on('room_state_changed', event => this.onRoomStateChanged(event));
        GLOBAL.roomServiceSocket.on('join_success', event => this.onJoinSuccess(event));
        GLOBAL.roomServiceSocket.on('not_in_room_error', event => this.onNotInRoomError(event));
        GLOBAL.roomServiceSocket.on('vote_success', event => this.onVoteSuccess(event));
        GLOBAL.roomServiceSocket.on('vote_cancel_success', event => this.onVoteCancelSuccess(event));
        GLOBAL.roomServiceSocket.on('room_already_created', event => this.onRoomAlreadyCreated(event));
        GLOBAL.roomServiceSocket.on('create_success', event => this.onCreateSuccess(event));
        GLOBAL.roomServiceSocket.on('host_room_closed_failure', event => this.onHostRoomClosedFailure(event));
        GLOBAL.roomServiceSocket.on('host_closed_connection', event => this.onHostClosedConnection(event));
        GLOBAL.roomServiceSocket.on('host_room_closed_success', event => this.onHostRoomClosedSuccess(event));
        GLOBAL.roomServiceSocket.on('not_authorized', event => this.onNotAuthorized(event));
        GLOBAL.roomServiceSocket.on('room_status_fetched', event => this.onRoomStatusFetched(event));
        GLOBAL.roomServiceSocket.on('host_closed_room', event => this.onHostClosedRoom(event));
    }

    onNotAuthorized(event) {
        console.log(event);
    }

    onRoomInactive(event) {
        console.log('The room you have attempted to join DNE or is inactive.');
    }

    onUserAlreadyInRoom(event) {
        console.log('You are already in the room you have attempted to join.');
    }

    onRoomStateChanged(event) {
        this.setState({
            roomState: event.roomState
        });
    }

    onJoinSuccess(event) {
        console.log('You have successfully joined the room.');
    }

    onNotInRoomError(event) {
        console.log('You are not in the room and cannot take that action.');
    }

    onVoteSuccess(event) {
        console.log('You have successfully voted.');
    }
    
    onVoteCancelSuccess(event) {
        console.log('You have successfully cancelled your vote.');
    }

    onRoomAlreadyCreated(event) {
        console.log('This room has already been created.');
    }

    onCreateSuccess(event) {
        console.log('You have successfully created the room.');
    }

    onHostRoomClosedFailure(event) {
        console.log('Failed to close the room.');
    }

    onHostClosedConnection(event) {
        console.log('The host has closed your connection to the server.');
        this.setState({
            roomState: null,
        });
    }

    onHostClosedRoom(event) {
        console.log('The host has closed the room. You have been disconnected.');
        this.setState({
            roomState: null,
        });
    }

    onHostRoomClosedSuccess(event) {
        console.log('You have successfully closed the room.');
    }

    onRoomStatusFetched(event) {
        console.log('Room Status: ' + event.status);
    }

    renderAvailableCards() {
        if (this.state.roomState) {
            const options = [];
            for (const card of this.state.roomState.deck) {
                options.push(<Text>{card.tag}, {card.value}</Text>);
            }
            return options;
        } else {
            return <Text>There are no cards available.</Text>;
        }
    }

    renderConnectedUsers() {
        if (this.state.roomState) {
            const users = [];
            for (const userID in this.state.roomState.connectedUsersByID) {
                const user = this.state.roomState.connectedUsersByID[userID];
                users.push(<Text>{user.nickname}</Text>);
            }
            return users;
        } else {
            return <Text>There are no connected users.</Text>
        }
    }

    renderCurrentRoomPhase() {
        let roomPhase = 'None';
        if (this.state.roomState) {
            if (this.state.roomState.phase === 'VOTING_PHASE') {
                roomPhase = 'Voting';
            } else if (this.state.roomState.phase === 'RESULTS_PHASE') {
                roomPhase = 'Results';
            }
        }
        const roomPhaseText = 'Current Room Phase: ' + roomPhase;
        return <Text>{roomPhaseText}</Text>;
    }

    render() {
        return (
            <ScrollView contentContainerStyle={{ paddingBottom: 1000 }}>
                <View style={{ marginTop: '30%' }} />
                <View>
                    <TextInput
                        style={{borderColor: "black", borderWidth: 1, width: '79.5%', alignItems: 'center', alignSelf: 'center', height: '13%'}}
                        placeholder='Join Room ID'
                        value={this.state.joinRoomID}
                        onChangeText={joinRoomID => this.setState({ joinRoomID })}
                    />
                    <TextInput
                        style={{borderColor: "black", borderWidth: 1, width: '79.5%', alignItems: 'center', alignSelf: 'center', height: '13%'}}
                        placeholder='Nickname'
                        value={this.state.nickname}
                        onChangeText={nickname => this.setState({ nickname })}
                    />
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => {
                            GLOBAL.roomServiceSocket.emit(
                                'join_room',
                                {
                                    roomID: this.state.joinRoomID,
                                    nickname: this.state.nickname
                                }
                            );
                        }}
                    >
                        <Text style={styles.buttonTextStyle}>Join Room</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => {
                            GLOBAL.roomServiceSocket.emit(
                                'is_room_open',
                                {
                                    roomID: this.state.joinRoomID
                                }
                            );
                        }}
                    >
                        <Text style={styles.buttonTextStyle}>Check Room</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TextInput
                        style={{borderColor: "black", borderWidth: 1, width: '79.5%', alignItems: 'center', alignSelf: 'center', height: '13%'}}
                        placeholder='Email'
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                    />
                    <TextInput
                        style={{borderColor: "black", borderWidth: 1, width: '79.5%', alignItems: 'center', alignSelf: 'center', height: '13%'}}
                        placeholder='Password'
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={async () => {
                            const result = await firebase.auth().signInWithEmailAndPassword(
                                this.state.email,
                                this.state.password
                            ).catch(err => console.log(err));
                            if (firebase.auth().currentUser) {
                                const authToken = await firebase.auth().currentUser.getIdToken(true)
                                    .catch(err => console.log(err));
                                this.setState({
                                    authToken,
                                });
                                console.log('"Signed In" successfully!');
                            } 
                        }}
                    >
                        <Text style={styles.buttonTextStyle}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={async () => {
                            const result = await firebase.auth().signOut()
                                .catch(err => console.log(err));
                            this.setState({
                                authToken: '',
                            });
                            console.log('Signed out successfully!');
                        }}
                    >
                        <Text style={styles.buttonTextStyle}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TextInput
                        style={{borderColor: "black", borderWidth: 1, width: '79.5%', alignItems: 'center', alignSelf: 'center', height: '13%'}}
                        placeholder='Host Room ID'
                        value={this.state.hostRoomID}
                        onChangeText={hostRoomID => this.setState({ hostRoomID })}
                    />
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => {
                            GLOBAL.roomServiceSocket.emit(
                                'create_room',
                                {
                                    roomID: this.state.hostRoomID,
                                    roomConfig: this.state.roomConfig,
                                    authToken: this.state.authToken,
                                }
                            );
                        }}
                    >
                        <Text style={styles.buttonTextStyle}>Create Room</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => {
                            GLOBAL.roomServiceSocket.emit(
                                'close_room',
                                {
                                    roomID: this.state.hostRoomID,
                                    authToken: this.state.authToken,
                                }
                            );
                        }}
                    >
                        <Text style={styles.buttonTextStyle}>Close Room</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TextInput
                        style={{borderColor: "black", borderWidth: 1, width: '79.5%', alignItems: 'center', alignSelf: 'center', height: '13%'}}
                        placeholder='Card Index'
                        value={this.state.cardIndex}
                        onChangeText={cardIndex => this.setState({ cardIndex })}
                    />
                    <Text>The above field accepts numbers only.</Text>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => {
                            GLOBAL.roomServiceSocket.emit(
                                'user_vote',
                                {
                                    roomID: this.state.joinRoomID,
                                    cardIndex: parseInt(this.state.cardIndex),
                                }
                            );
                        }}
                    >
                        <Text style={styles.buttonTextStyle}>Vote</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => {
                            GLOBAL.roomServiceSocket.emit(
                                'user_cancel_vote',
                                {
                                    roomID: this.state.joinRoomID
                                }
                            );
                        }}
                    >
                        <Text style={styles.buttonTextStyle}>Cancel Vote</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text>Available cards:</Text>
                    {this.renderAvailableCards()}
                </View>
                <View>
                    {
                        (this.state.roomState && this.state.roomState.hostSocketID === GLOBAL.roomServiceSocket.id)
                            ? (
                                <>
                                    <TouchableOpacity
                                        style={styles.buttonStyle}
                                        onPress={() => {
                                            GLOBAL.roomServiceSocket.emit(
                                                'start_new_round',
                                                {
                                                    roomID: this.state.joinRoomID,
                                                    authToken: this.state.authToken,
                                                }
                                            );
                                        }}
                                    >
                                        <Text style={styles.buttonTextStyle}>Start New Round</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.buttonStyle}
                                        onPress={() => {
                                            GLOBAL.roomServiceSocket.emit(
                                                'force_end_bidding',
                                                {
                                                    roomID: this.state.joinRoomID,
                                                    authToken: this.state.authToken,
                                                }
                                            );
                                        }}
                                    >
                                        <Text style={styles.buttonTextStyle}>Force End Bidding</Text>
                                    </TouchableOpacity>
                                </>
                            )
                            : null
                    }
                </View>
                <View>
                    <Text>List of users in room:</Text>
                    {this.renderConnectedUsers()}
                </View>
                <View>
                    {this.renderCurrentRoomPhase()}
                </View>
            </ScrollView>
        );
    }
}

export default socketTest;