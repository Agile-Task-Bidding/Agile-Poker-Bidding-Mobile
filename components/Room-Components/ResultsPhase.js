import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ResultsList from './ResultsList';
import { styles } from '../../styles/styles';
import { calcAverage, calcStandardDeviation, presentToThousandth, makeTally, calcNearestCard } from '../../util/results';

const ResultsPhase = ({ roomState }) => {

    const tally = makeTally(roomState);
    const average = calcAverage(tally);

    return (
        <View>
            <View style={styles.inlineTextView}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={styles.statisticLabelText}>Nearest Card: </Text>
                    <Text style={styles.statisticValueText}>{calcNearestCard(roomState, average).value}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={styles.statisticLabelText}>Average: </Text>
                    <Text style={styles.statisticValueText}>{presentToThousandth(average)}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={styles.statisticLabelText}>Standard Deviation: </Text>
                    <Text style={styles.statisticValueText}>{presentToThousandth(calcStandardDeviation(tally, average))}</Text>
                </View>
            </View>
            <ResultsList
                roomState={roomState}
            />
        </View>
    )
}

export default ResultsPhase;