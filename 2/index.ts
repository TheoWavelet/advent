import { inputs } from './unputs.ts';

console.log(' :asd');

// const inputs = [
//   'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
//   'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
//   'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
//   'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
//   'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green',
// ];
console.log(' :asd', inputs);
// const totalCubes = {
//   red: 12,
//   blue: 13,
//   green: 14,
// };
const totalCubes = {
  red: 12,
  blue: 14,
  green: 13,
};
// fist
// const possibleIdsUsm = inputs.reduce((possibleGamesSum, game) => {
//   const gameId = game.split(': ')[0].split(' ')[1];
//   // console.log('gameId :', gameId);
//   const games = game.split(': ')[1].split('; ');
//   const GameIsPossible = games.every((game) => {
//     const colors = game.split(', ');
//     return colors.every((color) => {
//       const [amount, colorName] = color.split(' ');
//       return parseInt(amount) <= totalCubes[colorName as keyof typeof totalCubes];
//     });
//   });
//   // console.log('GameIsPossible :', GameIsPossible);
//   return possibleGamesSum + (GameIsPossible ? parseInt(gameId) : 0);
// }, 0);
// console.log('possibleIdsUsm :', possibleIdsUsm);

// second
const gameSetsData = inputs.map((game) => {
  return {
    games: game
      .split(': ')[1]
      .split('; ')
      .map((game) => ({
        red: parseInt(
          game
            .split(', ')
            .find((color) => color.includes('red'))
            ?.split(' ')[0] || '0'
        ),
        blue: parseInt(
          game
            .split(', ')
            .find((color) => color.includes('blue'))
            ?.split(' ')[0] || '0'
        ),
        green: parseInt(
          game
            .split(', ')
            .find((color) => color.includes('green'))
            ?.split(' ')[0] || '0'
        ),
      })),
  };
});
// console.log('gameSetsData :', gameSetsData);
const setPowers = gameSetsData.map((gameSet) => {
  const highestred = Math.max(...gameSet.games.map((game) => game.red));
  // console.log('highestred :', highestred);
  const highestblue = Math.max(...gameSet.games.map((game) => game.blue));
  // console.log('highestblue :', highestblue);
  const highestgreen = Math.max(...gameSet.games.map((game) => game.green));
  // console.log('highestgreen :', highestgreen);
  // console.log('highestred * highestblue * highestgreen :', highestred * highestblue * highestgreen);
  return highestred * highestblue * highestgreen;
});
const setPowersSum = setPowers.reduce((sum, power) => sum + power, 0);
console.log('setPowersSum :', setPowersSum);
