// const inputsText = await Deno.readTextFile('./13/inputs-test.txt');
// const isTest = true;
const inputsText = await Deno.readTextFile('./13/inputs-text.txt');
const isTest = false;
// const inputs = inputsText.split('\n').map((row) => row.replace('\r', ''));
// console.log('inputsText :', inputsText);
const inputs = inputsText.split('\n\r\n').map((row) =>
  row
    .replaceAll('\r', '')
    .split('\n')
    .map((row) => row.split(''))
);
// console.log('inputs :', inputs);
const rotateMatrix = (matrix: string[][]): string[][] => {
  // Create a new matrix with transposed dimensions
  let result: string[][] = Array.from({ length: matrix[0].length }, () => Array(matrix.length).fill(0));
  // Transpose the matrix into the result, reversing columns as we go
  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result[0].length; j++) {
      result[i][j] = matrix[j][i];
    }
  }
  return result;
};

const rotated = inputs.map((pazz) => rotateMatrix(pazz));
let sum = 0;
// find mirror
inputs.forEach((pazz, i) => {
  let biggestMirror = 0;
  let mirrorCoords: number = null;
  pazz.find((row, i) => {
    // const mirror = row.join('').match(/(.)\1+/g);
    if (row.join('') === pazz[i + 1]?.join('')) {
      let count = 0;
      for (let index = 0; index < pazz.length; index++) {
        if (pazz[i - index]?.join('') === pazz[i + 1 + index]?.join('')) {
          count++;
        } else if (pazz[i - index]?.join('') && pazz[i + 1 + index]?.join('')) {
          count = 0;
          break;
        } else {
          break;
        }
      }
      if (count > biggestMirror) {
        biggestMirror = count;
        mirrorCoords = i;
      }
    }
  });
  if (mirrorCoords !== null) {
    console.log('mirrorCoords :', mirrorCoords + 1);
    console.log('biggestMirror :', biggestMirror);
    sum += (mirrorCoords + 1) * 100;
  }
});
rotated.forEach((pazz, i) => {
  let biggestMirror = 0;
  let mirrorCoords: number = null;
  pazz.find((row, i) => {
    // const mirror = row.join('').match(/(.)\1+/g);
    if (row.join('') === pazz[i + 1]?.join('')) {
      let count = 0;
      for (let index = 0; index < pazz.length; index++) {
        if (pazz[i - index]?.join('') === pazz[i + 1 + index]?.join('')) {
          count++;
        } else if (pazz[i - index]?.join('') && pazz[i + 1 + index]?.join('')) {
          count = 0;
          break;
        } else {
          break;
        }
      }
      if (count > biggestMirror) {
        biggestMirror = count;
        mirrorCoords = i;
      }
    }
  });
  if (mirrorCoords !== null) {
    console.log('mirrorCoords :', mirrorCoords + 1);
    console.log('biggestMirror :', biggestMirror);
    sum += mirrorCoords + 1;
  }
});

console.log('sum :', sum);
