// const inputsText = await Deno.readTextFile('./16/inputs-test.txt');
// const isTest = true;
const inputsText = await Deno.readTextFile('./16/inputs-text.txt');
const isTest = false;
const inputs = inputsText.split('\n').map((row) => row.replaceAll('\r', '').split(''));
// console.log('inputs :', inputs.map((row) => row.join('')).join('\n'));

let log = 0;
const activePoints = new Map<string, 'left' | 'top' | 'right' | 'bottom'>();
const goThrough = (xy: number[], dir: 'left' | 'top' | 'right' | 'bottom') => {
  let nextPoint = xy;
  while (true) {
    log++;
    activePoints.set(nextPoint.join(','), dir);
    switch (dir) {
      case 'left':
        nextPoint = [nextPoint[0] - 1, nextPoint[1]];
        break;
      case 'top':
        nextPoint = [nextPoint[0], nextPoint[1] - 1];
        break;
      case 'right':
        nextPoint = [nextPoint[0] + 1, nextPoint[1]];
        break;
      case 'bottom':
        nextPoint = [nextPoint[0], nextPoint[1] + 1];
        break;
    }
    const next = inputs[nextPoint[1]]?.[nextPoint[0]];
    if (!next) {
      break;
    }
    if (next === '/') {
      dir = dir === 'bottom' ? 'left' : dir === 'right' ? 'top' : dir === 'top' ? 'right' : 'bottom';
    }
    if (next === '\\') {
      dir = dir === 'bottom' ? 'right' : dir === 'right' ? 'bottom' : dir === 'top' ? 'left' : 'top';
    }
    if (
      next === '.' ||
      (next === '|' && (dir === 'bottom' || dir === 'top')) ||
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
      goThrough(nextPoint, 'top');
      goThrough(nextPoint, 'bottom');
      break;
    }
    if (next === '-' && (dir === 'top' || dir === 'bottom')) {
      goThrough(nextPoint, 'left');
      goThrough(nextPoint, 'right');
      break;
    }
  }
};

isTest ? goThrough([0, 0], 'right') : goThrough([0, 0], 'bottom');
// console.log('activePoints :', activePoints);
console.log('activePoints :', activePoints.size);
activePoints.forEach((value, key) => {
  const xy = key.split(',').map(Number);
  inputs[xy[1]][xy[0]] = '#';
});
console.log('inputs :\n', inputs.map((row) => row.join('')).join('\n'));
