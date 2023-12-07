// const inputsText = await Deno.readTextFile('./7/inputs-test.txt');
const inputsText = await Deno.readTextFile('./7/inputs-text.txt');
const inputs = inputsText.split('\n').map((row) => row.replace('\r', ''));

// console.log('inputs :', inputs);
// 252055431
// const handTotal: ('A' | 'K' | 'Q' | 'J' | 'T' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2' | 'J')[] = [];
// const cardStrengths = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'].reverse();

const handTotal: ('A' | 'K' | 'Q' | 'T' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2' | 'J')[] = [];
const cardStrengths = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'].reverse();
const playedHands = inputs
  .map((row) => row.trim())
  .map((row) => row.split(' '))
  .map((row) => ({ hand: row[0].split('') as typeof handTotal, bid: parseInt(row[1]) }));
// console.log('playedHands :', playedHands);
console.log('playedHands :', playedHands.length);
let sameStrengths: (typeof rankedHands)[] = [];

const pokerHandsStrength = (hand: typeof handTotal) => {
  const strongestCards: { card: (typeof handTotal)[0]; strength: number }[] = [];
  const cardsChecked: typeof handTotal = [];
  const JCount = hand.filter((card) => card === 'J').length;
  hand.forEach((card) => {
    if (cardsChecked.includes(card)) {
      return;
    }
    cardsChecked.push(card);
    // const cardStrength = calcStrength(card, hand);
    const has = hand.filter((card2) => card2 === card).length;
    // if (JCount > 0 && card !== 'J') {
    //   has += JCount;
    // }
    if (has === 5) {
      strongestCards.push({ card, strength: 7 });
    }
    if (has === 4) {
      if (hand.includes('J')) {
        strongestCards.push({ card, strength: 7 });
      } else {
        strongestCards.push({ card, strength: 6 });
      }
    }
    if (has === 3) {
      if (JCount > 0) {
        strongestCards.push({ card, strength: card !== 'J' ? 5 + JCount : 6 });
      } else {
        strongestCards.push({ card, strength: 4 });
      }
    }
    if (has === 2) {
      if (JCount > 0) {
        strongestCards.push({ card, strength: JCount === 1 || card === 'J' ? 4 : 4 + JCount });
      } else {
        strongestCards.push({ card, strength: 2 });
      }
    }
    if (has === 1) {
      // if (JCount > 0) {
      //   strongestCards.push({ card, strength: 2 });
      // } else {
      //   strongestCards.push({ card, strength: 1 });
      // }
    }
  });
  if (strongestCards.length === 0) {
    strongestCards.push({ card: handTotal[0], strength: 1 });
    handTotal.forEach((card) => {
      if (
        card !== strongestCards[0].card &&
        cardStrengths.indexOf(card) > cardStrengths.indexOf(strongestCards[0].card)
      ) {
        strongestCards[0].card = card;
      }
    });
    if (JCount > 0 && strongestCards[0].card !== 'J') {
      strongestCards[0].strength = 2;
    }
  }
  // const
  const fiveOf = strongestCards.filter((card) => card.strength === 7);
  const fourOf = strongestCards.filter((card) => card.strength === 6);
  const threeOf = strongestCards.filter((card) => card.strength === 4);
  const twoOf = strongestCards.filter((card) => card.strength === 2);
  // const onOf = strongestCards.filter((card) => card.strength === 1);
  if (fiveOf.length) {
    return 7;
  }
  if (fourOf.length) {
    return 6;
  }
  if (threeOf.length === 2) {
    return 5;
  }
  if (threeOf.length && twoOf.length) {
    return 5;
  }
  if (threeOf.length) {
    return 4;
  }
  if (twoOf.length === 2) {
    return 3;
  }
  if (twoOf.length) {
    return 2;
  }
  return 1;
};
const rankedHands = playedHands
  .map((hand) => {
    const ranked = { ...hand, strength: pokerHandsStrength(hand.hand), rank: 0 };
    sameStrengths[ranked.strength] = sameStrengths[ranked.strength] || [];
    // if (sameStrengths[ranked.strength].find((rankedd) => ranked.hand.join('') === rankedd.hand.join('') && rankedd.bid === ranked.bid)) {
    //   console.log('ranked :', ranked.hand.join(''), ranked.bid);
    // } else {
    //   // console.log('ranked :', ranked.hand.join(''), ranked.bid);
    // }
    sameStrengths[ranked.strength].push(ranked);
    return ranked;
  })
  .sort((a, b) => a.strength - b.strength);
sameStrengths = sameStrengths.filter((sameRank) => sameRank?.length > 0);
sameStrengths.forEach((sameRank, index) => {
  sameRank.forEach((hand) => {
    const found = sameStrengths.find(
      (sameRank2, i) => i !== index && sameRank2.find((_hand) => hand.hand.join('') === _hand.hand.join(''))
    );
    if (found) {
      console.log('found :', found);
      console.log('hand :', hand);
    }
  });
});
sameStrengths.forEach((sameRank) => {
  // console.log('sameRank :', sameRank);
  sameRank.sort((a, b) => {
    // return cardStrengths.indexOf(a.hand[0]) - cardStrengths.indexOf(b.hand[0]);
    if (a.hand[0] !== b.hand[0]) {
      return cardStrengths.indexOf(a.hand[0]) < cardStrengths.indexOf(b.hand[0]) ? -1 : 1;
    }
    if (a.hand[1] !== b.hand[1]) {
      return cardStrengths.indexOf(a.hand[1]) < cardStrengths.indexOf(b.hand[1]) ? -1 : 1;
    }
    if (a.hand[2] !== b.hand[2]) {
      return cardStrengths.indexOf(a.hand[2]) < cardStrengths.indexOf(b.hand[2]) ? -1 : 1;
    }
    if (a.hand[3] !== b.hand[3]) {
      return cardStrengths.indexOf(a.hand[3]) < cardStrengths.indexOf(b.hand[3]) ? -1 : 1;
    }
    if (a.hand[4] !== b.hand[4]) {
      return cardStrengths.indexOf(a.hand[4]) < cardStrengths.indexOf(b.hand[4]) ? -1 : 1;
    }
  });
  // console.log('sameRank :', sameRank);
});
const ranked = sameStrengths
  .flat()
  .map((hand, index) => ({ ...hand, rank: index + 1, oldBid: hand.bid, bid: hand.bid * (index + 1) }));
// console.log('ranked :', ranked);
console.log('ranked :', ranked.length);
console.log(
  'ranked :',
  ranked.reduce((acc, hand) => acc + hand.bid, 0)
);
// console.log('sameStrengths :', sameStrengths[1]);
