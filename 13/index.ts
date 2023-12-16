// const inputsText = await Deno.readTextFile('./13/inputs-test.txt');
// const isTest = true;
const inputsText = await Deno.readTextFile('./13/inputs-text.txt');
// const isTest = false;
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
  const result: string[][] = Array.from({ length: matrix[0].length }, () => Array(matrix.length).fill(0));
  // Transpose the matrix into the result, reversing columns as we go
  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result[0].length; j++) {
      result[i][j] = matrix[j][i];
    }
  }
  return result;
};

// const rotated = inputs.map((pazz) => rotateMatrix(pazz));
let sum = 0;
// find mirror
inputs.forEach((pazz) => {
  let biggestMirrorH = 0;
  let mirrorCoordsH: number = null;
  // const rotated = rotateMatrix(pazz);
  let mirrorCoordsV: number = null;
  let biggestMirrorV = 0;
  for (let i = 0; i < pazz.length; i++) {
    for (let j = 0; j < pazz[0].length; j++) {
      pazz[i][j] = pazz[i][j] === '.' ? '#' : '.';
      pazz.forEach((row, idx) => {
        if (row.join('') === pazz[idx + 1]?.join('')) {
          let count = 0;
          for (let index = 0; index < pazz.length; index++) {
            if (pazz[idx - index]?.join('') === pazz[idx + 1 + index]?.join('')) {
              count++;
            } else if (pazz[idx - index]?.join('') && pazz[idx + 1 + index]?.join('')) {
              count = 0;
              break;
            } else {
              break;
            }
          }
          if (count > biggestMirrorH && i >= idx - (count - 1) && i <= idx + count) {

            biggestMirrorH = count;
            mirrorCoordsH = idx;
          }
        }
      });
      const rotated = rotateMatrix(pazz);
      rotated.forEach((row, idx) => {
        if (row.join('') === rotated[idx + 1]?.join('')) {
          let count = 0;
          for (let index = 0; index < rotated.length; index++) {
            if (rotated[idx - index]?.join('') === rotated[idx + 1 + index]?.join('')) {
              count++;
            } else if (rotated[idx - index]?.join('') && rotated[idx + 1 + index]?.join('')) {
              count = 0;
              break;
            } else {
              break;
            }
          }
          if (count > biggestMirrorV && j >= idx - (count - 1) && j <= idx + count) {
            biggestMirrorV = count;
            mirrorCoordsV = idx;
          }
        }
      });
      pazz[i][j] = pazz[i][j] === '.' ? '#' : '.'; // reset
    }
  }
  if (mirrorCoordsH !== null) {
    sum += (mirrorCoordsH + 1) * 100;
  }
  if (mirrorCoordsV !== null) {
    sum += mirrorCoordsV + 1;
  }
});
console.log('sum :', sum);
