import React, { Component } from 'react';
import ResultsList from './ResultsList'

const ResultsPhase = ({ roomState }) => {

    return (
        <ResultsList
            roomState={roomState}
        />
    )
}

export default ResultsPhase;