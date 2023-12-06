// import { inputs } from './unputs.ts';
// seeds: 4239267129 20461805 2775736218 52390530 3109225152 741325372 1633502651 46906638 967445712 47092469 2354891449 237152885 2169258488 111184803 2614747853 123738802 620098496 291114156 2072253071 28111202
// import { fillGaps, fillMoreGaps, trim } from './calcs.ts';
// 80581665
// import { maps } from './calcs.ts';

// const inputsText = await Deno.readTextFile('./5/inputs-test.txt');
const inputsText = await Deno.readTextFile('./5/inputs-text.txt');
const inputs = inputsText.split('\n\r\n').map((input) => input.split('\n').map((row) => row.replace('\r', '')));
type mapType = 'seed' | 'soil' | 'fertilizer' | 'water' | 'light' | 'temperature' | 'humidity' | 'location';
const seeds: { from: number; to: number }[] = [];
const seedUnits = inputs[0][0]
  .split(' ')
  .map((seed) => parseInt(seed))
  .filter((seed) => !isNaN(seed));
seedUnits.forEach((seed, index) => {
  if (index === 0 || index % 2 === 0) {
    seeds.push({ from: seed, to: seed + seedUnits[index + 1] - 1 });
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
      mapInfo.points.push({
        startP,
        startEndp,
        destP,
        destEndP,
      });
    });
    return mapInfo;
  });

let ranges = [] as { from: number; to: number }[];
let nextRanges = [] as { from: number; to: number }[];
ranges.push(...seeds);
maps.forEach((map) => {
  nextRanges = [];
  ranges.forEach((range) => {
    const mapPoints = map.points.filter((point) => point.startP <= range.to && point.startEndp >= range.from);
    if (mapPoints.length === 0) {
      nextRanges.push(range);
    } else {
      mapPoints.forEach((point) => {
        const newRange = {
          from: Math.max(point.destP + (range.from - point.startP), point.destP),
          to: Math.min(point.destEndP - (point.startEndp - range.to), point.destEndP),
        };
        nextRanges.push(newRange);
      });
      const smallestfor = mapPoints.sort((a, b) => a.startP - b.startP)[0];
      if (range.from < smallestfor.startP) {
        const possibleMissing = {
          from: range.from,
          to: smallestfor.startP - range.from - 1,
        };
        nextRanges.push(possibleMissing);
      }
      const extendedRanges = mapPoints.sort((a, b) => a.startEndp - b.startEndp);
      extendedRanges.forEach((point, index) => {
        const nextPoint = extendedRanges[index + 1];
        if (point.startEndp < range.to) {
          if (nextPoint) {
            const possibleMissing = {
              from: point.startEndp + 1,
              to: nextPoint.startP - 1,
            };
            possibleMissing.from < possibleMissing.to ? nextRanges.push(possibleMissing) : '';
          } else {
            const possibleMissing = {
              from: point.startEndp + 1,
              to: range.to,
            };
            possibleMissing.from < possibleMissing.to ? nextRanges.push(possibleMissing) : '';
          }
        }
      });
    }
  });
  ranges = nextRanges;
});

const newLocal = ranges.sort((a, b) => a.from - b.from);
console.log('ranges :', newLocal);
console.log('ranges :', newLocal[0].from);
