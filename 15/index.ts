// const inputsText = await Deno.readTextFile('./15/inputs-test.txt');
// const isTest = true;
const inputsText = await Deno.readTextFile('./15/inputs-text.txt');
// const isTest = false;
const inputs = inputsText.replaceAll('\r', '').replaceAll('\n', '').split(',');
// console.log('inputs :', inputs);
let sumVal = 0;
inputs.forEach((input, i) => {
  let currVal = 0;
  input.split('').forEach((char, j) => {
    currVal += char.charCodeAt(0);
    currVal = currVal * 17;
    currVal = currVal % 256;
  });
  sumVal += currVal;
});
console.log('currVal :', sumVal);
