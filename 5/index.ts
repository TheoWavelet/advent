// import { inputs } from './unputs.ts';
const inputsText = await Deno.readTextFile('./5/inputs-test.txt');
// const inputsText = await Deno.readTextFile('./5/inputs-text.txt');
const inputs = inputsText.split('\n\r\n').map((input) => input.split('\n').map((row) => row.replace('\r', '')));
// console.log('inputs :', inputs);

type mapType = 'seed' | 'soil' | 'fertilizer' | 'water' | 'light' | 'temperature' | 'humidity' | 'location';
// const seeds: { from: number; to: number }[] = [];
const seeds: string[] = [];
const seedUnits = inputs[0][0]
  .split(' ')
  .map((seed) => parseInt(seed))
  .filter((seed) => !isNaN(seed));
seedUnits.forEach((seed, index) => {
  if (index === 0 || index % 2 === 0) {
    const allSeeds = new Array(seedUnits[index + 1]).fill('').map((_, i) => '' + (seed + i));
    seeds.push(...allSeeds);
    // seeds.push(...allSeeds);
    // console.log('allSeeds :', allSeeds);
  }
});
// seeds.push(...seedUnits);
console.log('seeds :', seeds);
// const maps = inputs
//   .filter((row) => {
//     if (row.find((map) => map.includes('seeds'))) {
//     } else {
//       return true;
//     }
//   })
//   .map((mapData) => {
//     const mapInfo = {
//       dest: mapData[0].split('-to-')[0] as mapType,
//       start: mapData[0].split('-to-')[1].split(' ')[0] as mapType,
//       points: [] as {
//         startP: number;
//         startEndp: number;
//         destP: number;
//         destEndP: number;
//       }[],
//     };
//     mapData.slice(1).forEach((row) => {
//       const range = +row.split(' ')[2];
//       const startP = +row.split(' ')[1];
//       const startEndp = startP + range - 1;
//       const destP = +row.split(' ')[0];
//       const destEndP = destP + range - 1;
//       // new Array(range).fill(0).forEach((_, index) => {
//       //   mapInfo.points.push({ start: startP + index, dest: destP + index });
//       // });
//       mapInfo.points.push({
//         startP,
//         startEndp,
//         destP,
//         destEndP,
//       });
//     });
//     // console.log('mapInfo :', mapInfo);
//     // mapInfo.points = mapInfo.points.sort((a, b) => a.start - b.start);
//     return mapInfo;
//   });
// const smallestSeedLocation = seeds.reduce((acc, seed) => {
//   const seedSoil = maps
//     .find((map) => map.dest === 'seed')
//     ?.points.find((point) => point.startP <= seed && point.startEndp >= seed);
//   const soil = seedSoil?.destEndP - (seedSoil?.startEndp - seed) || seed;
//   const soilFartilizer = maps
//     .find((map) => map.dest === 'soil')
//     ?.points.find((point) => point.startP <= soil && point.startEndp >= soil);
//   const fertilizer = soilFartilizer?.destEndP - (soilFartilizer?.startEndp - soil) || soil;
//   const fertilizerWater = maps
//     .find((map) => map.dest === 'fertilizer')
//     ?.points.find((point) => point.startP <= fertilizer && point.startEndp >= fertilizer);
//   const water = fertilizerWater?.destEndP - (fertilizerWater?.startEndp - fertilizer) || fertilizer;
//   const waterLight = maps
//     .find((map) => map.dest === 'water')
//     ?.points.find((point) => point.startP <= water && point.startEndp >= water);
//   const light = waterLight?.destEndP - (waterLight?.startEndp - water) || water;
//   const lightTemperature = maps
//     .find((map) => map.dest === 'light')
//     ?.points.find((point) => point.startP <= light && point.startEndp >= light);
//   const temperature = lightTemperature?.destEndP - (lightTemperature?.startEndp - light) || light;
//   const temperatureHumidity = maps
//     .find((map) => map.dest === 'temperature')
//     ?.points.find((point) => point.startP <= temperature && point.startEndp >= temperature);
//   const humidity = temperatureHumidity?.destEndP - (temperatureHumidity?.startEndp - temperature) || temperature;
//   const humidityLocation = maps
//     .find((map) => map.dest === 'humidity')
//     ?.points.find((point) => point.startP <= humidity && point.startEndp >= humidity);
//   const location = humidityLocation?.destEndP - (humidityLocation?.startEndp - humidity) || humidity;
//   // if (seed === 13) {
//   //   console.log('seedSoil :', seedSoil);
//   //   console.log('soil :', soil);
//   //   console.log('soilFartilizer :', soilFartilizer);
//   //   console.log('fertilizer :', fertilizer);
//   //   console.log('fertilizerWater :', fertilizerWater);
//   //   console.log('water :', water);
//   //   console.log('waterLight :', waterLight);
//   //   console.log('light :', light);
//   //   console.log('lightTemperature :', lightTemperature);
//   //   console.log('temperature :', temperature);
//   //   console.log('temperatureHumidity :', temperatureHumidity);
//   //   console.log('humidity :', humidity);
//   //   console.log('humidityLocation :', humidityLocation);
//   //   console.log('location :', location);
//   // }
//   if (location < acc) {
//     return location;
//   }
//   return acc;
// }, Infinity);
// console.log('map :', maps);
// console.log('smallestSeedLocation :', smallestSeedLocation);
