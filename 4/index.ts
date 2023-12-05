// import { inputs } from './unputs.ts';
const inputsText = await Deno.readTextFile('./4/inputs-text.txt');
// const inputsText = await Deno.readTextFile('./4/inputs-test.txt');
const inputs = inputsText.split('\n').map((row) => row.replace('\r', ''));
const cards = inputs.map((input) => {
  // const [cardNum, allnumbers] = input.split(': ');
  const cardNum = parseInt(input.split(': ')[0].split(' ').pop().trim());
  const numbers = input
    .split(': ')[1]
    .split('|')[0]
    .trim()
    .split(' ')
    .filter((i) => i !== '')
    .map((i) => parseInt(i));
    const checkNumbers = input
    .split(': ')[1]
    .split('|')[1]
    .trim()
    .split(' ')
    .filter((i) => i !== '')
    .map((i) => parseInt(i));
  const cardWinners = numbers.filter((number) => {
    if (checkNumbers.includes(number)) {
      return number;
    }
  });
  const winPoint = cardWinners.length ? 2 ** (cardWinners.length - 1) : 0;
  // console.log('numbers :', numbers);
  // console.log('cardNum :', checkNumbers);
  return { cardNum, numbers, checkNumbers, cardWinners, winPoint, instances: 1 };
});
const winpointSum = cards.reduce((acc, card) => acc + card.winPoint, 0);
console.log('winpointSum :', winpointSum);
// part 2
cards.forEach((card) => {
  const startindex = card.cardNum - 1;
  card.cardWinners.forEach((cardWinner, index) => {
    cards[startindex + index + 1] ? (cards[startindex + index + 1].instances += card.instances) : '';
  });
});
const instanceSum = cards.reduce((acc, card) => acc + card.instances, 0);
console.log(
  'cards :',
  cards.map((card) => card.instances)
);
console.log('cards :', cards[0]);
console.log('instanceSum :', instanceSum);
