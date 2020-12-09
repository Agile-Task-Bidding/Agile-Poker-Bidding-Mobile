import React, { Component } from 'react';
import { View } from 'react-native';
import * as GLOBAL from '../../state/global';
import { styles } from '../../styles/styles';
import CardList from './CardList';

class PickingPhase extends Component {
    render() {
        return (
            <View style={styles.pickingBody}>
                <CardList
                    deck={this.props.roomState.deck}
                    pickedIndex={GLOBAL.selectedCardIndex}
                />
            </View>
        );
    }
}

export default PickingPhase;
