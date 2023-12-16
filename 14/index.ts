// const inputsText = await Deno.readTextFile('./14/inputs-test.txt');
// const isTest = true;
const inputsText = await Deno.readTextFile('./14/inputs-text.txt');
// const isTest = false;
// const inputs = inputsText.split('\n').map((row) => row.replace('\r', ''));
// console.log('inputsText :', inputsText);
const inputs = inputsText.split('\n').map((row) => row.replaceAll('\r', '').split(''));
// console.log('inputs :', inputs);
const flipMatrix = (matrix: string[][]): string[][] => {
  let result: string[][] = Array.from({ length: matrix[0].length }, () => Array(matrix.length).fill(0));
  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result[0].length; j++) {
      result[i][j] = matrix[j][i];
    }
  }
  return result;
};
let tries = 0;
let nextRotationData = inputs;
// let repeatPoint = {try: 0, data: nextRotationData.map((row) => row.join(''))};
// let repeatPoints = [nextRotationData.map((row) => row.join(''))];
let repeatPoints = new Map<string, number>();
repeatPoints.set(nextRotationData.map((row) => row.join('')).join(''), 0);
// let lastLoad = 0;
// console.log('nextRotationData :', nextRotationData.map((row) => row.join('')).join('\n'));
// let check = 13;
let check = 1000000000;
const tiltStart = (checkAmount: number, findLoop = true) => {
  while (tries < checkAmount) {
    nextRotationData = flipMatrix(nextRotationData);
    let tiltedNorth = nextRotationData.map((data) => new Array(data.length).fill('.') as string[]);
    for (let index = 0; index < nextRotationData.length; index++) {
      const element = nextRotationData[index].reverse();
      element.forEach((item, i) => {
        if (item === 'O') {
          let freePlace = element.findIndex((item, j) => item === '#' && j > i) - 1;
          if (freePlace < 0) {
            freePlace = element.length - 1;
          }
          while (tiltedNorth[index][freePlace] !== '.') {
            freePlace--;
          }
          tiltedNorth[index][freePlace] = 'O';
        } else if (item === '#') {
          tiltedNorth[index][i] = '#';
        }
      });
      tiltedNorth[index] = tiltedNorth[index].reverse();
    }
    tiltedNorth = flipMatrix(tiltedNorth);
    //
    // console.log('tiltedNorth :', tiltedNorth.map((row) => row.join('')).join('\n'));
    let tiltedWest = tiltedNorth.map((data) => new Array(data.length).fill('.') as string[]);
    for (let index = 0; index < tiltedNorth.length; index++) {
      const element = tiltedNorth[index].reverse();
      element.forEach((item, i) => {
        if (item === 'O') {
          let freePlace = element.findIndex((item, j) => item === '#' && j > i) - 1;
          if (freePlace < 0) {
            freePlace = element.length - 1;
          }
          while (tiltedWest[index][freePlace] !== '.') {
            freePlace--;
          }
          tiltedWest[index][freePlace] = 'O';
        } else if (item === '#') {
          tiltedWest[index][i] = '#';
        }
      });
      tiltedWest[index] = tiltedWest[index].reverse();
    }
    // console.log('tiltedWest :', tiltedWest.map((row) => row.join('')).join('\n'));
    //
    tiltedWest = flipMatrix(tiltedWest);
    let tiltedSouth = tiltedWest.map((data) => new Array(data.length).fill('.') as string[]);
    for (let index = 0; index < tiltedWest.length; index++) {
      const element = tiltedWest[index];
      element.forEach((item, i) => {
        if (item === 'O') {
          let freePlace = element.findIndex((item, j) => item === '#' && j > i) - 1;
          if (freePlace < 0) {
            freePlace = element.length - 1;
          }
          while (tiltedSouth[index][freePlace] !== '.') {
            freePlace--;
          }
          tiltedSouth[index][freePlace] = 'O';
        } else if (item === '#') {
          tiltedSouth[index][i] = '#';
        }
      });
    }
    tiltedSouth = flipMatrix(tiltedSouth);
    // console.log('tiltedSouth :', tiltedSouth.map((row) => row.join('')).join('\n'));
    //
    let tiltedEast = tiltedSouth.map((data) => new Array(data.length).fill('.') as string[]);
    for (let index = 0; index < tiltedSouth.length; index++) {
      const element = tiltedSouth[index];
      element.forEach((item, i) => {
        if (item === 'O') {
          let freePlace = element.findIndex((item, j) => item === '#' && j > i) - 1;
          if (freePlace < 0) {
            freePlace = element.length - 1;
          }
          while (tiltedEast[index][freePlace] !== '.') {
            freePlace--;
          }
          tiltedEast[index][freePlace] = 'O';
        } else if (item === '#') {
          tiltedEast[index][i] = '#';
        }
      });
    }
    // tiltedEast = flipMatrix(tiltedEast);
    // console.log('tiltedEast :', tiltedEast.map((row) => row.join('')).join('\n'));
    nextRotationData = tiltedEast;
    tries++;
    if (findLoop) {
      const repeated = repeatPoints.get(nextRotationData.map((row) => row.join('')).join(''));
      if (repeated > -1) {
        const shifted = (checkAmount - repeated) % (tries - repeated);
        console.log('repeated :', shifted);
        tiltStart(shifted + tries, false);
        break;
      }
      repeatPoints.set(nextRotationData.map((row) => row.join('')).join(''), tries);
    }

    // console.log('nextRotationData :', nextRotationData.map((row) => row.join('')).join('\n'));
    // const load = nextRotationData.reverse().reduce((acc, row, index) => {
    //   return acc + row.filter((item) => item === 'O').length * (index + 1);
    // }, 0);
    // lastLoad = load;
  }
};
tiltStart(check);
// tiltStart(15, false);
// );
// console.log('nextRotationData :', nextRotationData.map((row) => row.join('')).join('\n'));
const load = nextRotationData.reverse().reduce((acc, row, index) => {
  return acc + row.filter((item) => item === 'O').length * (index + 1);
}, 0);
console.log('load :', load);
// console.log('load :', 1000000000 % tries);
