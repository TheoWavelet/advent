// const inputsText = await Deno.readTextFile('./11/inputs-test.txt');
// const isTest = true;
// 74927389 !
// 669794948689 !
// 710674907809
// 28474879404200
const inputsText = await Deno.readTextFile('./11/inputs-text.txt');
const isTest = false;
// const inputs = inputsText.split('\n').map((row) => row.replace('\r', ''));
// console.log('inputsText :', inputsText);
const inputs = inputsText.split('\n').map((row) => row.replace('\r', '').split(''));
// console.log('inputs :', inputs);
// console.log('inputs :\r', inputs.map((row) => row.join('')).join('\n'));

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
// const emptyDist = 10;
// const emptyDist = 100;
const emptyDist = 1000000;
inputs.forEach((row, i) => {
  if (emptyRowIndexes.includes(i)) return;
  row.forEach((col, j) => {
    if (col === '#') {
      inputs.forEach((row, _i) => {
        if (emptyRowIndexes.includes(_i)) return;
        row.forEach((col, _j) => {
          if (col === '#' && (_i !== i || _j !== j)) {
            const distCountRow = emptyRowIndexes.filter(
              (emptyRowIndex) => emptyRowIndex > Math.min(i, _i) && emptyRowIndex < Math.max(i, _i)
            ).length;
            const distCountCol = emptyColsIndexes.filter(
              (emptyColIndex) => emptyColIndex > Math.min(j, _j) && emptyColIndex < Math.max(j, _j)
            ).length;
            const distCountRowAdded = distCountRow * emptyDist - distCountRow;
            const distCountColAdded = distCountCol * emptyDist - distCountCol;
            dists.push([Math.abs(_i - i) + distCountRowAdded, Math.abs(_j - j) + distCountColAdded]);
          }
        });
      });
    }
  });
});
// console.log('dists :', dists);

const sum = dists
  .map((dist) => dist.map((d) => Math.abs(d)))
  .reduce((acc, dist) => {
    return acc + Math.abs(dist[0]) + Math.abs(dist[1]);
  }, 0);
console.log('sum :', sum / 2);
console.log('sum :', sum);
