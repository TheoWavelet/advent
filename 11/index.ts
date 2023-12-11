// const inputsText = await Deno.readTextFile('./11/inputs-test.txt');
// const isTest = true;
const inputsText = await Deno.readTextFile('./11/inputs-text.txt');
const isTest = false;
// const inputs = inputsText.split('\n').map((row) => row.replace('\r', ''));
const inputs = inputsText.split('\n').map((row) => row.replace('\r', '').split(''));
// console.log('inputs :', inputs);
// console.log('inputs :\n', inputs.map((row) => row.join('')).join('\n'));

const expendedInputs = [] as string[][];
inputs.forEach((row) => {
  if (!row.includes('#')) {
    expendedInputs.push([...row]);
  }
  expendedInputs.push(row);
});
let emptyCols = [] as number[];
expendedInputs[0].forEach((col, index) => {
  if (expendedInputs.every((row) => row[index] === '.')) {
    emptyCols.push(index + emptyCols.length);
  }
});
emptyCols.forEach((col) => {
  expendedInputs.forEach((row, i) => {
    row.splice(col, 0, '.');
  });
});
const dists = [] as number[][];
expendedInputs.forEach((row, i) => {
  row.forEach((col, j) => {
    if (col === '#') {
      expendedInputs.forEach((row, _i) => {
        row.forEach((col, _j) => {
          if (col === '#' && (_i > i || (_i === i && _j > j))) {
            // if (col === '#' && (_i !== i || _j !== j)) {
            dists.push([_i - i, _j - j]);
          }
        });
      });
    }
  });
});

const sum = dists.reduce((acc, dist) => acc + Math.abs(dist[0]) + Math.abs(dist[1]), 0);
// console.log('dists :', dists);
// console.log('sum :', sum / 2);
console.log('sum :', sum);
