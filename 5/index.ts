// import { inputs } from './unputs.ts';
const inputsText = await Deno.readTextFile('./5/inputs-test.txt');
// const inputsText = await Deno.readTextFile('./5/inputs-text.txt');
const inputs = inputsText.split('\n\r\n').map((input) => input.split('\n').map((row) => row.replace('\r', '')));
console.log('inputs :', inputs);

const seeds: number[] = [];
const maps = inputs
  .filter((row) => {
    if (row.find((map) => map.includes('seeds'))) {
      console.log('row :', row);
      seeds.push(
        ...row[0]
          .split(' ')
          .map((seed) => parseInt(seed))
          .filter((seed) => !isNaN(seed))
      );
      console.log('seeds :', seeds);
    } else {
      return true;
    }
  })
  .map((mapData) => {
    const mapInfo = {
      dest: mapData[0].split('-to-')[0],
      start: mapData[0].split('-to-')[1].split(' ')[0],
      
    };
    return mapInfo;
  });
console.log('maps :', maps);
// const maps = inputs.split() .map((input) => {
