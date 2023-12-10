// const inputsText = await Deno.readTextFile('./10/inputs-test.txt');
// const isTest = true;
const inputsText = await Deno.readTextFile('./10/inputs-text.txt');
const isTest = false;
// const inputs = inputsText.split('\n').map((row) => row.replace('\r', ''));
const inputs = inputsText.split('\n').map((row) => row.replace('\r', '').split(''));
// console.log('inputs :', inputs);
const data = inputs.map((row) => row.map((col) => ({ col, inLoop: col === 'S' ? true : false })));
type Point = {
  p: string;
  dir: 'right' | 'bottom' | 'top' | 'left';
  pos: {
    x: number;
    y: number;
  };
  parent: Point | null;
  next: Point | null;
  index: number;
};
const opposites = {
  right: 'left',
  left: 'right',
  top: 'bottom',
  bottom: 'top',
};
const pointDIrections = {
  F: ['right', 'bottom'],
  J: ['left', 'top'],
  L: ['top', 'right'],
  '7': ['left', 'bottom'],
  '|': ['top', 'bottom'],
  '-': ['left', 'right'],
} as const;
let currentPoint: Point = {
  p: 'J',
  dir: 'left',
  pos: {
    x: 10,
    y: 61,
  },
  parent: null,
  next: null,
  index: 0,
};
let currentPointTest: Point = {
  p: 'F',
  dir: 'left',
  pos: {
    x: 4,
    y: 0,
  },
  parent: null,
  next: null,
  index: 0,
};
if (isTest) {
  currentPoint = currentPointTest;
}
let loopLength = 0;
const loop = ['S' as any] as (keyof typeof pointDIrections)[];
// const loop = ['F'] as (keyof typeof pointDIrections)[];
while (true) {
  // if (currentPoint.next && !currentPoint.parent) {
  //   console.log('loopLength :', loopLength);
  //   break;
  // }
  loopLength++;
  const xy =
    currentPoint.dir === 'right'
      ? [currentPoint.pos.y, currentPoint.pos.x + 1]
      : currentPoint.dir === 'left'
      ? [currentPoint.pos.y, currentPoint.pos.x - 1]
      : currentPoint.dir === 'top'
      ? [currentPoint.pos.y - 1, currentPoint.pos.x]
      : [currentPoint.pos.y + 1, currentPoint.pos.x];

  data[xy[0]][xy[1]].inLoop = true;
  const nextP = inputs[xy[0]][xy[1]] as keyof typeof pointDIrections;
  // const nextP = inputs[xy[0]][xy[1]] as keyof typeof pointDIrections;
  if ((nextP as any) === 'S') {
    break;
  }
  loop.push(nextP);
  currentPoint.next = {
    p: nextP,
    dir: pointDIrections[nextP].find((dir) => dir !== opposites[currentPoint.dir]),
    pos: {
      x: xy[1],
      y: xy[0],
    },
    parent: currentPoint,
    next: null,
    index: loopLength,
  };
  currentPoint = currentPoint.next;
}
let insideLoop = 0;
data.forEach((row, j) => {
  row.forEach((col, index) => {
    if (!col.inLoop) {
      const leftLooped = row.filter(
        (r, i) => index > i && r.inLoop && (r.col === '|' || r.col === 'L' || r.col === 'J' || r.col === 'S')
      );
      const rightLooped = row.filter(
        (r, i) => index < i && r.inLoop && (r.col === '|' || r.col === 'L' || r.col === 'J' || r.col === 'S')
      );

      if (leftLooped.length && rightLooped.length) {
        if (leftLooped.length % 2 === 1 && rightLooped.length % 2 === 1) {
          insideLoop++;
        }
      }
    }
  });
});
// console.log('insideLoop :', data[3]);
console.log('insideLoop :', insideLoop);
// console.log('insideLoop :', 0 % 2);
