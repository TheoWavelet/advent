// const inputsText = await Deno.readTextFile('./9/inputs-test.txt');
const inputsText = await Deno.readTextFile('./9/inputs-text.txt');
const inputs = inputsText.split('\n').map((row) => row.replace('\r', ''));
// console.log('inputs :', inputs);
let sics = inputs.map((input) => [input.split(' ').map((_) => parseInt(_))]);
// console.log('sics :', sics);
const appendDifferentials = (sic: (typeof sics)[0]) => {
  const subSic = sic[sic.length - 1].map((old, index, arr) => arr[index + 1] - old);
  subSic.pop();
  sic.push(subSic);
  if (subSic.some((val, i, arr) => val !== arr[0])) {
    appendDifferentials(sic);
  }
  return sic;
};
// sics = sics.map((sic) => {
//   sic = appendDifferentials(sic);
//   return sic
//     .reverse()
//     .map((subSec, index, arr) => {
//       subSec.push(subSec[subSec.length - 1] + (arr[index - 1]?.[arr[index - 1].length - 1] || 0));
//       return subSec;
//     })
//     .reverse();
//   // console.log('newSec :', sic.toString());
// });
// // console.log('sics :', sics);
// const sums = sics.reduce((sum, sub) => sum + sub[0][sub[0].length - 1], 0);
// console.log('sums :', sums);
// PART TWO
sics = sics.map((sic) => {
  sic = appendDifferentials(sic);
  return sic
    .reverse()
    .map((subSec, index, arr) => {
      subSec.unshift(subSec[0] - (arr[index - 1]?.[0] || 0));
      return subSec;
    })
    .reverse();
});
// console.log('sics :', sics);
const sums = sics.reduce((sum, sub) => sum + sub[0][0], 0);
console.log('sums :', sums);
