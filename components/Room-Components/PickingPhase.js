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
import * as GLOBAL from '../../state/global';
import { styles } from '../../styles/styles';

class PickingPhase extends Component {
    
    cardPressed = (cardIndex) => {
        // Set the selected card index in global
        GLOBAL.selectedCardIndex = cardIndex;
        // send to socket the cardIndex
        GLOBAL.roomServiceSocket.emit('user_vote', { roomID: GLOBAL.roomName, cardIndex });
    }

    generateCards = () => this.props.roomState.deck.map((e, index) => {
        let Tag = e.tag;
        let Value = e.value;

        return (
        <TouchableOpacity
            key={index}
            style={index === GLOBAL.selectedCardIndex ? styles.cardViewSelected : styles.cardView}
            onPress={()=>this.cardPressed(index)}
        >
            <Text style={{color: index === GLOBAL.selectedCardIndex ? 'white': 'black', flex: 1, fontSize: 24, marginTop: 15, marginLeft: 10, marginRight: 10, textAlign: 'center'}}>{Tag}</Text>
            <Text style={{color: index === GLOBAL.selectedCardIndex ? 'white': 'black', flex: 1, fontSize: 34}}>{Value}</Text>
        </TouchableOpacity>
        );
    });

    render() {
        return (
            <View style={styles.pickingBody}>
                <View style={{flex: 1}}>
                    <ScrollView>
                        <View style={styles.cardBody}>
                            {this.generateCards()}
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

export default PickingPhase;