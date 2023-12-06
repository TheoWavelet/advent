// import { inputs } from './unputs.ts';
// seeds: 4239267129 20461805 2775736218 52390530 3109225152 741325372 1633502651 46906638 967445712 47092469 2354891449 237152885 2169258488 111184803 2614747853 123738802 620098496 291114156 2072253071 28111202
import { fillGaps, fillMoreGaps, trim } from './calcs.ts';
// 80581665
// import { maps } from './calcs.ts';

const inputsText = await Deno.readTextFile('./5/inputs-test.txt');
// const inputsText = await Deno.readTextFile('./5/inputs-text.txt');
const inputs = inputsText.split('\n\r\n').map((input) => input.split('\n').map((row) => row.replace('\r', '')));
// console.log('inputs :', inputs);
// const results =  [896125601]
type mapType = 'seed' | 'soil' | 'fertilizer' | 'water' | 'light' | 'temperature' | 'humidity' | 'location';
const seeds: { from: number; to: number }[] = [];
// let seeds: number[] = [];
const seedUnits = inputs[0][0]
  .split(' ')
  .map((seed) => parseInt(seed))
  .filter((seed) => !isNaN(seed));
seedUnits.forEach((seed, index) => {
  if (index === 0 || index % 2 === 0) {
    // const allSeeds = new Array(seedUnits[index + 1]).fill('').map((_, i) => seed + i);
    // seeds.push(...allSeeds);
    seeds.push({ from: seed, to: seed + seedUnits[index + 1] - 1 });
    // seeds = allSeeds;
    // console.log('allSeeds :', allSeeds);
  }
});
export const maps = inputs
  .filter((_, index) => {
    return index !== 0;
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
      // if (mapInfo.start === 'humidity') {
      //   console.log('mapInfo :', mapInfo);
      //   console.log('row :', row);
      //   console.log('range :', range);
      //   console.log('startP :', startP);
      //   console.log('destP :', destP);
      //   console.log('startEndp :', startEndp);
      //   console.log('destEndP :', destEndP);
      // }
    });
    // console.log('mapInfo :', mapInfo);
    // mapInfo.points = mapInfo.points.sort((a, b) => a.start - b.start);
    return mapInfo;
  });
// const soilMap = maps.find((map) => map.start === 'soil');
// soilMap.points = soilMap.points.sort((a, b) => a.startP - b.startP);
// // fill the gaps between start and end ranges
// soilMap.points = fillGaps(soilMap);
// const fertilizerMap = maps.find((map) => map.start === 'fertilizer');
// fertilizerMap.points = fertilizerMap.points.sort((a, b) => a.startP - b.startP);
// fertilizerMap.points = fillGaps(fertilizerMap);
// const waterMap = maps.find((map) => map.start === 'water');
// waterMap.points = waterMap.points.sort((a, b) => a.startP - b.startP);
// waterMap.points = fillGaps(waterMap);
// const lightMap = maps.find((map) => map.start === 'light');
// lightMap.points = lightMap.points.sort((a, b) => a.startP - b.startP);
// lightMap.points = fillGaps(lightMap);
// const temperatureMap = maps.find((map) => map.start === 'temperature');
// temperatureMap.points = temperatureMap.points.sort((a, b) => a.startP - b.startP);
// temperatureMap.points = fillGaps(temperatureMap);
// const humidityMap = maps.find((map) => map.start === 'humidity');
// humidityMap.points = humidityMap.points.sort((a, b) => a.startP - b.startP);
// humidityMap.points = fillGaps(humidityMap);
// const locationMap = maps.find((map) => map.start === 'location');
// locationMap.points = locationMap.points.sort((a, b) => a.startP - b.startP);
// locationMap.points = fillGaps(locationMap);

// let smallestSeedLocation = Infinity;
// seeds.forEach((seed) => {
//   // console.log('seed :', seed);
//   const seedSoil = soilMap?.points.filter((point) => point.startP <= seed.to && point.startEndp >= seed.from);

//   // console.log('soilMap?.points :', soilMap?.points);
//   fillMoreGaps(seedSoil, seed);
//   seedSoil.sort((a, b) => a.startP - b.startP);
//   seedSoil.forEach((soil) => {
//     if (seed?.from > soil.startP) {
//       soil.destP = soil.destP + (seed?.from - soil.startP);
//       soil.startP = seed?.from;
//     }
//     if (seed?.to < soil.startEndp) {
//       soil.destEndP = soil.destEndP + (seed?.to - soil.startEndp);
//       soil.startEndp = seed?.to;
//     }
//   });
//   // trim(seedSoil, [{ destP: seed.from, destEndP: seed.to, startP: seed.from, startEndp: seed.to }]);
//   // console.log('seedSoil :', seedSoil);
//   const fertilizerPoints = [] as {
//     startP: number;
//     startEndp: number;
//     destP: number;
//     destEndP: number;
//   }[];
//   // console.log('seedSoil :', seedSoil);
//   seedSoil.forEach((soil) => {
//     const fertilizer = fertilizerMap?.points.filter((fertilizerPoint) => {
//       return fertilizerPoint.startP <= soil.destEndP && fertilizerPoint.startEndp >= soil.destP;
//     });
//     fillMoreGaps(fertilizer, { from: soil.destP, to: soil.destEndP });
//     fertilizerPoints.push(
//       ...fertilizer
//       // ...fertilizer.filter((fertilizer) => !fertilizerPoints.find((p) => p.startP === fertilizer.startP))
//     );
//   });
//   fertilizerPoints.sort((a, b) => a.startP - b.startP);
//   trim(fertilizerPoints, seedSoil);
//    // console.log('fertilizerPoints :', fertilizerPoints);
//   const waterPoints = [] as {
//     startP: number;
//     startEndp: number;
//     destP: number;
//     destEndP: number;
//   }[];
//   fertilizerPoints.forEach((fertilizer) => {
//     const water = waterMap?.points.filter((waterPoint) => {
//       return waterPoint.startP <= fertilizer.destEndP && waterPoint.startEndp >= fertilizer.destP;
//     });
//     fillMoreGaps(water, { from: fertilizer.destP, to: fertilizer.destEndP });
//     waterPoints.push(...water);
//     // waterPoints.push(...water.filter((water) => !waterPoints.find((p) => p.startP === water.startP)));
//   });
//   waterPoints.sort((a, b) => a.startP - b.startP);
//   trim(waterPoints, fertilizerPoints);
//   // console.log('waterPoints :', waterPoints);
//   const lightPoints = [] as {
//     startP: number;
//     startEndp: number;
//     destP: number;
//     destEndP: number;
//   }[];
//   waterPoints.forEach((water) => {
//     const light = lightMap?.points.filter((lightPoint) => {
//       return lightPoint.startP <= water.destEndP && lightPoint.startEndp >= water.destP;
//     });
//     fillMoreGaps(light, { from: water.destP, to: water.destEndP });
//     lightPoints.push(...light);
//     // lightPoints.push(...light.filter((light) => !lightPoints.find((p) => p.startP === light.startP)));
//   });
//   lightPoints.sort((a, b) => a.startP - b.startP);
//   trim(lightPoints, waterPoints);
//   // console.log('lightPoints :', lightPoints);
//   const temperaturePoints = [] as {
//     startP: number;
//     startEndp: number;
//     destP: number;
//     destEndP: number;
//   }[];
//   lightPoints.forEach((light) => {
//     const temperature = temperatureMap?.points.filter((temperaturePoint) => {
//       return temperaturePoint.startP <= light.destEndP && temperaturePoint.startEndp >= light.destP;
//     });
//     fillMoreGaps(temperature, { from: light.destP, to: light.destEndP });
//     temperaturePoints.push(
//       ...temperature
//       // ...temperature.filter((temperature) => !temperaturePoints.find((p) => p.startP === temperature.startP))
//     );
//   });
//   temperaturePoints.sort((a, b) => a.startP - b.startP);
//   trim(temperaturePoints, lightPoints);
//   // console.log('temperaturePoints :', temperaturePoints);
//   const humidityPoints = [] as {
//     startP: number;
//     startEndp: number;
//     destP: number;
//     destEndP: number;
//   }[];
//   temperaturePoints.forEach((temperature) => {
//     const humidity = humidityMap?.points.filter((humidityPoint) => {
//       return humidityPoint.startP <= temperature.destEndP && humidityPoint.startEndp >= temperature.destP;
//     });
//     fillMoreGaps(humidity, { from: temperature.destP, to: temperature.destEndP });
//     humidityPoints.push(...humidity);
//     // humidityPoints.push(...humidity.filter((humidity) => !humidityPoints.find((p) => p.startP === humidity.startP)));
//   });
//   humidityPoints.sort((a, b) => a.startP - b.startP);
//   trim(humidityPoints, temperaturePoints);
//   // console.log('humidityPoints :', humidityPoints);
//   const locationPoints = [] as {
//     startP: number;
//     startEndp: number;
//     destP: number;
//     destEndP: number;
//   }[];
//   humidityPoints.forEach((humidity) => {
//     const location = locationMap?.points.filter((locationPoint) => {
//       return locationPoint.startP <= humidity.destEndP && locationPoint.startEndp >= humidity.destP;
//     });
//     fillMoreGaps(location, { from: humidity.destP, to: humidity.destEndP });
//     locationPoints.push(...location);
//     // locationPoints.push(...location.filter((location) => !locationPoints.find((p) => p.startP === location.startP)));
//   });
//   locationPoints.sort((a, b) => a.startP - b.startP);
//   trim(locationPoints, humidityPoints);
//   // console.log('locationPoints :', locationPoints);
//   const smallestLocation = locationPoints.reduce((acc, curr) => {
//     return acc.destP < curr.destP ? acc : curr;
//   });
//   console.log('smallestLocation.destP :', smallestLocation.destP);
//   if (smallestLocation.destP < smallestSeedLocation) {
//     smallestSeedLocation = smallestLocation.destP;
//   }
// });
// // console.log('map :', maps);
// console.log('smallestSeedLocation :', smallestSeedLocation);

let ranges = [] as { from: number; to: number }[];
let nextRanges = [] as { from: number; to: number }[];
ranges.push(...seeds);
maps.forEach((map) => {
  // console.log('map :', map);
  nextRanges = [];
  // console.log('ranges :', ranges);
  ranges.forEach((range) => {
    const mapPoints = map.points.filter((point) => point.startP <= range.to && point.startEndp >= range.from);
    console.log('mapPoints :', mapPoints);
    // console.log('map :', map);
    if (mapPoints.length === 0) {
      nextRanges.push(range);
    }
    mapPoints.forEach((point) => {
      const newRange = {
        from: Math.max(range.from, point.destP),
        to: Math.min(range.to, point.destEndP),
      };
      nextRanges.push(newRange);
      if (range.from < point.destP) {
        nextRanges.push({
          from: range.from,
          to: range.from + (point.destP - range.from) - 1,
        });
      }
      if (range.to > point.destEndP) {
        nextRanges.push({
          from: range.to - (range.to - point.destEndP) + 1,
          to: range.to,
        });
      }
    });
  });
  // console.log('nextRanges :', nextRanges);
  ranges = nextRanges;
});
// console.log('ranges :', ranges);
// console.log(
//   'ranges :',
//   ranges.sort((a, b) => a.from - b.from)
// );
// seeds.forEach((seed) => {
