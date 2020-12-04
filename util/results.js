export const makeTally = (roomState) => {
    const voteTally = [];
    Object.values(roomState.connectedUsersByID).forEach(({ _, socketID }) => {
      const vote = roomState.voteByUserID[socketID];
      if (vote !== undefined && vote !== null) {
        const voteValue = roomState.deck[vote].value;
        if (voteValue !== 'ABSTAIN') {
          voteTally.push(voteValue);
        }
      }
    });
    return voteTally;
}

export const calcNearestCard = (roomState) => {
    let nearest = { value: 'ABSTAIN', tag: 'Abstain' };
    let nearestDistance = 1e9;
    for (const card of roomState.deck) {
      if (card.value === 'ABSTAIN') continue
      const diff = Math.abs(card.value - average)
      if ((diff == nearestDistance && card.value > nearest.value) || diff < nearestDistance) {
        nearestDistance = diff
        nearest = card
      }
    }
    return nearest;
} 

export const calcAverage = (values) => {
    return values.reduce((a, b) => a + b, 0) / values.length;
}

export const calcStandardDeviation = (values) => {
    const average = calcAverage(values);
    const diffsSq = values.map((a) => (a - average) * (a - average), 0);
    const averageDiffSq = calcAverage(diffsSq);
    return Math.sqrt(averageDiffSq);
  }

export const presentToThousandth = (value) => {
    if (isNaN(value)) return 'N/A';
    return Math.round(value * 1000) / 1000;
}

export const listMembersAndVotes = (roomState) => {
    return Object.values(roomState.connectedUsersByID).map(
        ({ nickname, socketID }) => {
          const voteIndex = roomState.voteByUserID[socketID];
          const vote = (voteIndex !== undefined && voteIndex !== null) ? roomState.deck[voteIndex].value : 'N/A';
          return { nickname, socketID, vote }
        }
    );
}