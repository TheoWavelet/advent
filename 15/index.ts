// const inputsText = await Deno.readTextFile('./15/inputs-test.txt');
// const isTest = true;
const inputsText = await Deno.readTextFile('./15/inputs-text.txt');
// const isTest = false;
const inputs = inputsText.replaceAll('\r', '').replaceAll('\n', '').split(',');
// console.log('inputs :', inputs);
let boxes: string[][] = [];
inputs.forEach((input, i) => {
  let boxNumber = 0;
  // input.split('').forEach((char, j) => {
  const op = input.includes('=') ? '=' : '-';
  const label = input.split(op)[0];
  label?.split('').forEach((char, j) => {
    boxNumber += char.charCodeAt(0);
    boxNumber = boxNumber * 17;
    boxNumber = boxNumber % 256;
  });
  if (!boxes[boxNumber]) {
    boxes[boxNumber] = [];
  }
  const labelIndex = boxes[boxNumber].findIndex((boxD) => boxD.includes(label));
  if (op === '-' && labelIndex > -1) {
    boxes[boxNumber].splice(labelIndex, 1);
  }
  if (op === '=') {
    labelIndex === -1 ? boxes[boxNumber].push(input) : (boxes[boxNumber][labelIndex] = input);
  }
});
const allsum = boxes.reduce((acc, lenses, index) => {
  acc += lenses?.reduce((power, lens, i) => {
    const lensVal = (1 + index) * (i + 1) * parseInt(lens.split('=')[1]);
    power += lensVal;
    return power;
  }, 0);
  return acc;
}, 0);

console.log('allsum :', allsum);
