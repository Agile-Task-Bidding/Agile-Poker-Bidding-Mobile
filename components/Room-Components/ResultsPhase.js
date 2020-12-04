import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ResultsList from './ResultsList';
import { calcAverage, calcStandardDeviation, presentToThousandth, makeTally, calcNearestCard } from '../../util/results';

const ResultsPhase = ({ roomState }) => {

    const tally = makeTally(roomState);
    const average = calcAverage(tally);

    return (
        <View>
            <Text>Average: {presentToThousandth(average)}</Text>
            <Text>Standard Deviation: {presentToThousandth(calcStandardDeviation(tally, average))}</Text>
            <Text>Nearest Card: {calcNearestCard(roomState, average).value}</Text>
            <ResultsList
                roomState={roomState}
            />
        </View>
    )
}

export default ResultsPhase;