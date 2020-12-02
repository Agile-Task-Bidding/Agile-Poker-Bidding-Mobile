import React, { Component } from 'react';
import { Text } from 'react-native';

class ResultsPhase extends Component {
    state = {

    };

    render() {
        console.log(this.props.roomState);

        return (
            <Text>Results Phase</Text>
        );
    }
}

export default ResultsPhase;