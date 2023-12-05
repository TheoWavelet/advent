// import { inputs } from './unputs.ts';
const inputsText = await Deno.readTextFile('./3/inputs-text.txt');
const inputs = inputsText.split('\n').map((row) => row.replace('\r', ''));
// const inputs = [
//   '467..114..',
//   '...*......',
//   '..35..633.',
//   '......#...',
//   '617*......',
//   '.....+.58.',
//   '..592.....',
//   '......755.',
//   '...$.*....',
//   '.664.598..',
// ];

// console.log('inputs :', inputs);
// console.log(
//   "inputs.map((row) => row.split('') :",
//   inputs.map((row) => row.split('').filter((cell) => cell !== '.' && isNaN(parseInt(cell))))
// );
const grid = inputs.map((row) => row.split(''));

const gridNumbers = grid.map((row) => {
  const fullNumbers: { number: number; startIndex: number; endIndex: number; cellsToCheck?: any[] }[] = [];
  let nextNumber = '';
  row.forEach((number, index) => {
    if (!isNaN(parseInt(number))) {
      if (nextNumber) {
        nextNumber += number;
      } else {
        nextNumber = number;
      }
      index === row.length - 1 && nextNumber
        ? fullNumbers.push({ number: parseInt(nextNumber), startIndex: index - nextNumber.length, endIndex: index - 1 })
        : '';
    } else {
      if (nextNumber) {
        fullNumbers.push({ number: parseInt(nextNumber), startIndex: index - nextNumber.length, endIndex: index - 1 });
        nextNumber = '';
      }
    }
  });
  return fullNumbers;
});
const numbersPart: number[] = [];
const numbersNotPart: number[] = [];

gridNumbers.forEach((numbers, rowIndex) => {
  numbers.forEach((number) => {
    const cellsToCheck = [];
    if (number.startIndex === 0) {
    } else {
      cellsToCheck.push({ cell: grid[rowIndex][number.startIndex - 1], cellY: rowIndex, cellX: number.startIndex - 1 });
    }
    if (number.endIndex >= grid[rowIndex].length - 1) {
    } else {
      cellsToCheck.push({ cell: grid[rowIndex][number.endIndex + 1], cellY: rowIndex, cellX: number.endIndex + 1 });
    }

    grid[rowIndex - 1]
      ?.slice((number.startIndex || 1) - 1, number.endIndex + 2)
      .forEach((cell, i) => cellsToCheck.push({ cell, cellY: rowIndex - 1, cellX: (number.startIndex || 1) - 1 + i }));
    grid[rowIndex + 1]
      ?.slice((number.startIndex || 1) - 1, number.endIndex + 2)
      .forEach((cell, i) => cellsToCheck.push({ cell, cellY: rowIndex + 1, cellX: (number.startIndex || 1) - 1 + i }));
    if (cellsToCheck.some((cell) => cell.cell !== '.' && isNaN(parseInt(cell.cell)))) {
      numbersPart.push(number.number);
    } else {
      numbersNotPart.push(number.number);
    }
    number.cellsToCheck = cellsToCheck;
  });
});
const allNumbers = gridNumbers.flat();
let partNumber: number = 0;
allNumbers.forEach((number, index) => {
  const ratioIcon = number.cellsToCheck.find((cell) => cell.cell === '*');
  if (ratioIcon) {
    const isPartnum = allNumbers.find((number, nextIndex) =>
      number?.cellsToCheck?.find(
        (cell) =>
          index < nextIndex && cell.cell === '*' && cell.cellX === ratioIcon.cellX && cell.cellY === ratioIcon.cellY
      )
    );
    if (isPartnum) {
      partNumber += number.number * isPartnum.number;
    }
  }
});
console.log('partNumber :', partNumber);
// console.log('numbersNotPart :', numbersNotPart);
// console.log('numbersPart :', numbersPart);
// console.log(
//   'numbersPart sum :',
//   numbersPart.reduce((a, b) => a + b, 0)
// );
