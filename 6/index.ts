// const inputsText = await Deno.readTextFile('./6/inputs-test.txt');
const inputsText = await Deno.readTextFile('./6/inputs-text.txt');
const inputs = inputsText.split('\n').map((row) => row.replace('\r', ''));
const raceTimes = inputs[0].split(' ').filter((val) => val !== '' && !isNaN(parseInt(val)));
const races = inputs[1]
  .split(' ')
  .filter((val) => val !== '' && !isNaN(parseInt(val)))
  .map((val, index) => ({ time: parseInt(raceTimes[index]), distance: parseInt(val) }));
const winPossibilities = races.map((race) => {
  let win = 0;
  new Array(race.time)
    .fill(0)
    .map((_, index) => index)
    .forEach((time) => {
      if ((race.time - time) * time > race.distance) {
        win++;
      }
    });
  return win;
});
console.log('winPossibilities :', winPossibilities);
console.log(
  'winPossibilities :',
  winPossibilities.reduce((acc, val) => acc * val, 1)
);

// part two
const time = parseInt(inputs[0].split(':')[1].replaceAll(' ', ''));
const dist = parseInt(inputs[1].split(':')[1].replaceAll(' ', ''));

let firstWin = 0;
for (let index = 0; index < time; index++) {
  if ((time - index) * index > dist) {
    firstWin = index;
    console.log('firstWin :', firstWin);
    break;
  }
}

let secondWin = 0;
for (let index = time; index > 0; index--) {
  if ((time - index) * index > dist) {
    secondWin = index;
    console.log('secondWin :', secondWin);
    break;
  }
}

console.log(' :', secondWin - firstWin + 1);
