// const inputsText = await Deno.readTextFile('./14/inputs-test.txt');
// const isTest = true;
const inputsText = await Deno.readTextFile('./14/inputs-text.txt');
// const isTest = false;
// const inputs = inputsText.split('\n').map((row) => row.replace('\r', ''));
// console.log('inputsText :', inputsText);
const inputs = inputsText.split('\n').map((row) => row.replaceAll('\r', '').split(''));
// console.log('inputs :', inputs);
const rotateMatrix = (matrix: string[][]): string[][] => {
  let result: string[][] = Array.from({ length: matrix[0].length }, () => Array(matrix.length).fill(0));
  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result[0].length; j++) {
      result[i][j] = matrix[j][i];
    }
  }
  return result;
};
const rotated = rotateMatrix(inputs);
const tilted = rotated.map((data) => new Array(data.length).fill('.') as string[]);
for (let index = 0; index < rotated.length; index++) {
  const element = rotated[index].reverse();
  // let roundedRocks = element.filter((item) => item === 'O').length;
  element.forEach((item, i) => {
    if (item === 'O') {
      let freePlace = element.findIndex((item, j) => item === '#' && j > i) - 1;
      if (freePlace < 0) {
        freePlace = element.length - 1;
      }
      while (tilted[index][freePlace] !== '.') {
        freePlace--;
      }
      tilted[index][freePlace] = 'O';
    } else if (item === '#') {
      tilted[index][i] = '#';
    }
  });
  tilted[index] = tilted[index].reverse();
}

// console.log(
//   'tilted :\n',
//   rotateMatrix(tilted)
//     .map((row) => row.join(''))
//     .join('\n')
// );
const load = rotateMatrix(tilted)
  .reverse()
  .reduce((acc, row, index) => {
    return acc + row.filter((item) => item === 'O').length * (index + 1);
  }, 0);
console.log('load :', load);
