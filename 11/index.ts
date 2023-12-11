const inputsText = await Deno.readTextFile('./11/inputs-test.txt');
const isTest = true;
// const inputsText = await Deno.readTextFile('./11/inputs-text.txt');
// const isTest = false;
// const inputs = inputsText.split('\n').map((row) => row.replace('\r', ''));
// console.log('inputsText :', inputsText);
const inputs = inputsText.split('\n').map((row) => row.replace('\r', '').split(''));
// console.log('inputs :', inputs);
// console.log('inputs :\n', inputs.map((row) => row.join('')).join('\n'));

// const expendedInputs = [] as string[][];
// inputs.forEach((row) => {
//   if (!row.includes('#')) {
//     expendedInputs.push([...row]);
//   }
//   expendedInputs.push(row);
// });
// let emptyCols = [] as number[];
// expendedInputs[0].forEach((col, index) => {
//   if (expendedInputs.every((row) => row[index] === '.')) {
//     emptyCols.push(index + emptyCols.length);
//   }
// });
// emptyCols.forEach((col) => {
//   expendedInputs.forEach((row, i) => {
//     row.splice(col, 0, '.');
//   });
// });
// const dists = [] as number[][];
// expendedInputs.forEach((row, i) => {
//   row.forEach((col, j) => {
//     if (col === '#') {
//       expendedInputs.forEach((row, _i) => {
//         row.forEach((col, _j) => {
//           if (col === '#' && (_i > i || (_i === i && _j > j))) {
//             // if (col === '#' && (_i !== i || _j !== j)) {
//             dists.push([_i - i, _j - j]);
//           }
//         });
//       });
//     }
//   });
// });

// const sum = dists.reduce((acc, dist) => acc + Math.abs(dist[0]) + Math.abs(dist[1]), 0);
// // console.log('dists :', dists);
// // console.log('sum :', sum / 2);
// console.log('sum :', sum);
// PART TWHO
let emptyRowIndexes = [] as number[];
let emptyColsIndexes = [] as number[];
// inputs.forEach((row, i) => {
//   if (!row.includes('#')) {
//     emptyRowIndexes.push(inputs.indexOf(row) + emptyRowIndexes.length);
//   }
// });
inputs.forEach((row, index) => {
  if (!row.includes('#')) {
    emptyRowIndexes.push(index);
  }
  if (inputs.every((row) => row[index] === '.')) {
    emptyColsIndexes.push(index);
  }
});

console.log('emptyRowIndexes :', emptyRowIndexes);
console.log('emptyColsIndexes :', emptyColsIndexes);
const dists = [] as number[][];
const emptyDist = 10;
// const emptyDist = 100;
// const emptyDist = 1000000;
inputs.forEach((row, i) => {
  if (emptyRowIndexes.includes(i)) return;
  row.forEach((col, j) => {
    if (col === '#') {
      inputs.forEach((row, _i) => {
        if (emptyRowIndexes.includes(_i)) return;
        row.forEach((col, _j) => {
          if (col === '#' && (_i > i || (_i === i && _j > j))) {
            const distCountRow =
              emptyRowIndexes.filter((emptyRowIndex) => emptyRowIndex > i && emptyRowIndex < _i).length * emptyDist;
            console.log('distCountRow :', i, _i, distCountRow);
            const distCountCol =
              emptyColsIndexes.filter((emptyColIndex) => emptyColIndex > j && emptyColIndex < _j).length * emptyDist;
            console.log('distCountCol :', j, _j, distCountCol);
            dists.push([_i - i + distCountRow, _j - j + distCountCol]);
            // dists.push([
            //   _i - i + (distCountRow - (distCountRow ? distCountRow / emptyDist : 0)),
            //   _j - j + (distCountCol - (distCountCol ? distCountCol / emptyDist : 0)),
            // ]);
            // dists.push([_i - i, _j - j]);
          }
        });
      });
    }
  });
});

const sum = dists.reduce((acc, dist) => acc + Math.abs(dist[0]) + Math.abs(dist[1]), 0);
console.log('dists :', dists);
// console.log('sum :', sum / 2);
console.log('sum :', sum);
