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
import { styles } from '../../styles/styles';

class PickingPhase extends Component {
    state = {

    };

    cardPressed = (Value) => {
        // send to socket the value
        Alert.alert(Value.toString());
    }

    generateCards = () => this.props.roomState.deck.map((e, index) => {
        let Tag = e.tag;
        let Value = e.value;

        var index = index + 1; 

        return (
        <TouchableOpacity key={index} style={styles.cardView} onPress={()=>this.cardPressed(Value)}>
            <Text style={{flex: 1, fontSize: 24, marginTop: 15, marginLeft: 10, marginRight: 10, textAlign: 'center'}}>{Tag}</Text>
            <Text style={{flex: 1, fontSize: 34}}>{Value}</Text>
        </TouchableOpacity>
        );
    });

    render() {
        return (
            <View style={styles.mainBody}>
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