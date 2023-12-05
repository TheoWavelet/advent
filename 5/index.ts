// import { inputs } from './unputs.ts';
const inputsText = await Deno.readTextFile('./5/inputs-test.txt');
// const inputsText = await Deno.readTextFile('./5/inputs-text.txt');
const inputs = inputsText.split('\n\r\n').map((input) => input.split('\n').map((row) => row.replace('\r', '')));
console.log('inputs :', inputs);

type mapType = 'seed' | 'soil' | 'fertilizer' | 'water' | 'light' | 'temperature' | 'humidity' | 'location';
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
      dest: mapData[0].split('-to-')[0] as mapType,
      start: mapData[0].split('-to-')[1].split(' ')[0] as mapType,
      points: [] as {
        startP: number;
        startEndp: number;
        destP: number;
        destEndP: number;
      }[],
    };
    mapData.slice(1).forEach((row) => {
      const range = +row.split(' ')[2];
      const startP = +row.split(' ')[1];
      const startEndp = startP + range - 1;
      const destP = +row.split(' ')[0];
      const destEndP = destP + range - 1;
      // new Array(range).fill(0).forEach((_, index) => {
      //   mapInfo.points.push({ start: startP + index, dest: destP + index });
      // });
      mapInfo.points.push({
        startP,
        startEndp,
        destP,
        destEndP,
      });
    });
    // console.log('mapInfo :', mapInfo);
    // mapInfo.points = mapInfo.points.sort((a, b) => a.start - b.start);
    return mapInfo;
  });
const smallestSeedLocation = seeds.reduce((acc, seed) => {
  const seedSoil = maps
    .find((map) => map.dest === 'seed')
    ?.points.find((point) => point.destP <= seed && point.destEndP >= seed);
  const soil = seedSoil?.destEndP - seed + seedSoil?.startP || seed;
  const soilFartilizer = maps
    .find((map) => map.dest === 'soil')
    ?.points.find((point) => point.destP <= soil && point.destEndP >= soil);
  const fertilizer = soilFartilizer?.destEndP - soil + soilFartilizer?.startP || soil;
  const fertilizerWater = maps
    .find((map) => map.dest === 'fertilizer')
    ?.points.find((point) => point.destP <= fertilizer && point.destEndP >= fertilizer);
  const water = fertilizerWater?.destEndP - fertilizer + fertilizerWater?.startP || fertilizer;
  const waterLight = maps
    .find((map) => map.dest === 'water')
    ?.points.find((point) => point.destP <= water && point.destEndP >= water);
  const light = waterLight?.destEndP - water + waterLight?.startP || water;
  const lightTemperature = maps
    .find((map) => map.dest === 'light')
    ?.points.find((point) => point.destP <= light && point.destEndP >= light);
  const temperature = lightTemperature?.destEndP - light + lightTemperature?.startP || light;
  const temperatureHumidity = maps
    .find((map) => map.dest === 'temperature')
    ?.points.find((point) => point.destP <= temperature && point.destEndP >= temperature);
  const humidity = temperatureHumidity?.destEndP - temperature + temperatureHumidity?.startP || temperature;
  const humidityLocation = maps
    .find((map) => map.dest === 'humidity')
    ?.points.find((point) => point.destP <= humidity && point.destEndP >= humidity);
  const location = humidityLocation?.destEndP - humidity + humidityLocation?.startP || humidity;

  // const soilFartilizer =
  //   maps
  //     .find((map) => map.dest === 'soil')
  //     ?.points.find((point) => point.startP <= seedSoil && point.startEndp >= seedSoil)?.dest || seedSoil;
  // const fertilizerWater =
  //   maps
  //     .find((map) => map.dest === 'fertilizer')
  //     ?.points.find((point) => point.startP <= soilFartilizer && point.startEndp >= soilFartilizer)?.dest ||
  //   soilFartilizer;
  // const waterLight =
  //   maps
  //     .find((map) => map.dest === 'water')
  //     ?.points.find((point) => point.startP <= fertilizerWater && point.startEndp >= fertilizerWater)?.dest ||
  //   fertilizerWater;
  // const lightTemperature =
  //   maps
  //     .find((map) => map.dest === 'light')
  //     ?.points.find((point) => point.startP <= waterLight && point.startEndp >= waterLight)?.dest || waterLight;
  // const temperatureHumidity =
  //   maps
  //     .find((map) => map.dest === 'temperature')
  //     ?.points.find((point) => point.startP <= lightTemperature && point.startEndp >= lightTemperature)?.dest ||
  //   lightTemperature;
  // const humidityLocation =
  //   maps
  //     .find((map) => map.dest === 'humidity')
  //     ?.points.find((point) => point.startP <= temperatureHumidity && point.startEndp >= temperatureHumidity)?.dest ||
  //   temperatureHumidity;
  // console.log('humidityLocation :', humidityLocation);
  if (location < acc) {
    return location;
  }
  return acc;
}, Infinity);
// console.log('map :', maps);
console.log('smallestSeedLocation :', smallestSeedLocation);
