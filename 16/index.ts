// const inputsText = await Deno.readTextFile('./16/inputs-test.txt');
// const isTest = true;
const inputsText = await Deno.readTextFile('./16/inputs-text.txt');
const isTest = false;
const inputs = inputsText.split('\n').map((row) => row.replaceAll('\r', '').split(''));
// console.log('inputs :', inputs.map((row) => row.join('')).join('\n'));

let log = 0;
const activePoints = new Map<string, 'left' | 'up' | 'right' | 'down'>();
const goThrough = (xy: number[], dir: 'left' | 'up' | 'right' | 'down') => {
  let nextPoint = xy;
  while (true) {
    log++;
    activePoints.set(nextPoint.join(','), dir);
    switch (dir) {
      case 'left':
        nextPoint = [nextPoint[0] - 1, nextPoint[1]];
        break;
      case 'up':
        nextPoint = [nextPoint[0], nextPoint[1] - 1];
        break;
      case 'right':
        nextPoint = [nextPoint[0] + 1, nextPoint[1]];
        break;
      case 'down':
        nextPoint = [nextPoint[0], nextPoint[1] + 1];
        break;
    }
    const next = inputs[nextPoint[1]]?.[nextPoint[0]];
    if (!next) {
      break;
    }
    if (next === '/') {
      dir = dir === 'down' ? 'left' : dir === 'right' ? 'up' : dir === 'up' ? 'right' : 'down';
    }
    if (next === '\\') {
      dir = dir === 'down' ? 'right' : dir === 'right' ? 'down' : dir === 'up' ? 'left' : 'up';
    }
    if (
      next === '.' ||
      (next === '|' && (dir === 'down' || dir === 'up')) ||
      (next === '-' && (dir === 'right' || dir === 'left'))
    ) {
      dir = dir;
    }
    const pointSaved = activePoints.get(nextPoint.join(','));
    if (
      pointSaved &&
      (next === '|' || next === '-' || (next === '/' && pointSaved === dir) || (next === '\\' && pointSaved === dir))
    ) {
      break;
    }
    if (next === '|' && (dir === 'right' || dir === 'left')) {
      goThrough(nextPoint, 'up');
      goThrough(nextPoint, 'down');
      break;
    }
    if (next === '-' && (dir === 'up' || dir === 'down')) {
      goThrough(nextPoint, 'left');
      goThrough(nextPoint, 'right');
      break;
    }
  }
};

// isTest ? goThrough([0, 0], 'right') : goThrough([0, 0], 'down');
// // console.log('activePoints :', activePoints);
// console.log('activePoints :', activePoints.size);
// activePoints.forEach((value, key) => {
//   const xy = key.split(',').map(Number);
//   inputs[xy[1]][xy[0]] = '#';
// });
// console.log('inputs :\n', inputs.map((row) => row.join('')).join('\n'));
let largestBeam = 0;
// goThrough([0, 0], 'right')
const getNextDir = (dir: 'left' | 'up' | 'right' | 'down', point: string) => {
  if (point === '/') {
    return dir === 'down' ? 'left' : dir === 'right' ? 'up' : dir === 'up' ? 'right' : 'down';
  }
  if (point === '\\') {
    return dir === 'down' ? 'right' : dir === 'right' ? 'down' : dir === 'up' ? 'left' : 'up';
  }
  if (point === '.') {
    return dir;
  }
  if (point === '|') {
    return dir === 'down' || dir === 'up' ? dir : undefined;
  }
  if (point === '-') {
    return dir === 'right' || dir === 'left' ? dir : undefined;
  }
};
inputs.forEach((row, y) => {
  activePoints.clear();
  if (row[0] === '.' || row[0] === '-') {
    goThrough([0, y], 'right');
  }
  if (row[0] === '/') {
    goThrough([0, y], 'up');
  }
  if (row[0] === '\\') {
    goThrough([0, y], 'down');
  }
  if (row[0] === '|') {
    goThrough([0, y], 'down');
    goThrough([0, y], 'up');
  }
  if (largestBeam < activePoints.size) {
    largestBeam = activePoints.size;
    return;
  }
});
const rawLast = inputs[0].length - 1;
inputs.forEach((row, y) => {
  activePoints.clear();
  if (row[rawLast] === '.' || row[rawLast] === '-') {
    goThrough([0, y], 'left');
  }
  if (row[rawLast] === '/') {
    goThrough([0, y], 'down');
  }
  if (row[rawLast] === '\\') {
    goThrough([0, y], 'up');
  }
  if (row[rawLast] === '|') {
    goThrough([0, y], 'down');
    goThrough([0, y], 'up');
  }
  if (largestBeam < activePoints.size) {
    largestBeam = activePoints.size;
    return;
  }
});

inputs[0].forEach((col, x) => {
  activePoints.clear();
  if (col === '.' || col === '|') {
    goThrough([x, 0], 'down');
  }
  if (col === '/') {
    goThrough([x, 0], 'right');
  }
  if (col === '\\') {
    goThrough([x, 0], 'left');
  }
  if (col === '-') {
    goThrough([x, 0], 'left');
    goThrough([x, 0], 'right');
  }
  if (largestBeam < activePoints.size) {
    largestBeam = activePoints.size;
    return;
  }
});
const rawLastY = inputs.length - 1;
inputs[rawLastY].forEach((col, x) => {
  activePoints.clear();
  if (col === '.' || col === '|') {
    goThrough([x, rawLastY], 'up');
  }
  if (col === '/') {
    goThrough([x, rawLastY], 'left');
  }
  if (col === '\\') {
    goThrough([x, rawLastY], 'right');
  }
  if (col === '-') {
    goThrough([x, rawLastY], 'left');
    goThrough([x, rawLastY], 'right');
  }
  if (largestBeam < activePoints.size) {
    largestBeam = activePoints.size;
    return;
  }
});

console.log('largestBeam :', largestBeam);
