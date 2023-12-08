// const inputsText = await Deno.readTextFile('./8/inputs-test.txt');
const inputsText = await Deno.readTextFile('./8/inputs-text.txt');
const inputs = inputsText.split('\n').map((row) => row.replace('\r', ''));

// console.log('inputs :', inputs)
const dirs = inputs[0].split('') as ('L' | 'R')[];
// console.log('dirs :', dirs[dirs.length - 1]);
console.log('dirs :', dirs.length);
const data = inputs
  .slice(2)
  .map((row) => row.split(' = '))
  .map((row) => ({ op: row[0], L: row[1].split(', ')[0].replace('(', ''), R: row[1].split(', ')[1].replace(')', '') }))
  .reduce((acc, cur) => {
    acc[cur.op] = { p: cur.op, L: cur.L, R: cur.R, zTries: [] };
    return acc;
  }, {} as { [op: string]: { p: string; L: string; R: string; zTries: { p?: string; L: string; R: string; toz: number }[]; allChecked?: boolean } });
// console.log('data :', data[data.length - 1]);
// let currentPoint = data['AAA'];
// let tries = 0;
// console.log('currentPoint :', currentPoint);

// findZ();
// console.log('tries :', tries);
// console.log('currentPoint :', currentPoint);

// function findZ() {
//   for (const dir of dirs) {
//     tries++;
//     if (currentPoint[dir] === 'ZZZ') {
//       currentPoint = data[currentPoint[dir]];
//       break;
//     }
//     currentPoint = data[currentPoint[dir]];
//     if (tries % dirs.length === 0) {
//       findZ();
//     }
//   }
// }
// const pointIndexes = Object.keys(data);
const gcd_two_numbers = (x: number, y: number): number => {
  let t = y;
  while (y) {
    t = y;
    y = x % y;
    x = t;
  }
  return x;
};
let tries = 0;
const APointsTracking = Object.assign({}, data);
const pointWithA = Object.keys(data).filter((pos) => pos.endsWith('A'));
// const pointWithZ = Object.keys(data).filter((pos) => pos.endsWith('Z'));
// console.log('pointWithZ :', pointWithZ);
console.log('pointWithA :', pointWithA);
findALLOneZ();
function findALLOneZ() {
  for (const dir of dirs) {
    tries++;
    for (const trackP of pointWithA) {
      APointsTracking[trackP] = {
        ...data[APointsTracking[trackP][dir]],
        zTries: APointsTracking[trackP].zTries,
      };
      if (APointsTracking[trackP].p.endsWith('Z')) {
        APointsTracking[trackP].zTries.push({ ...APointsTracking[trackP], toz: tries });
      }
    }

    if (pointWithA.every((p) => APointsTracking[p].zTries.length > 0)) {
      const commonMultiplierOftoZ = pointWithA.reduce((acc, cur, index) => {
        const name = pointWithA[index];
        const number = APointsTracking[name].zTries[0].toz; /// coincidentally always only one
        const bigger = Math.max(acc, number);
        const smaller = Math.min(acc, number);
        acc = (bigger * smaller) / gcd_two_numbers(bigger, smaller);
        return acc;
      }, 1);
      console.log('commonMultiplierOftoz :', commonMultiplierOftoZ);
      break;
    }
    if (tries % dirs.length === 0) {
      findALLOneZ();
      // setTimeout(() => {
      //   findALLOneZ();
      // });
    }
  }
}
