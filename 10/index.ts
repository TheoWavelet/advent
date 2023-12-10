const inputsText = await Deno.readTextFile('./10/inputs-test.txt');
// const inputsText = await Deno.readTextFile('./10/inputs-text.txt');
// const inputs = inputsText.split('\n').map((row) => row.replace('\r', ''));
const inputs = inputsText.split('\n').map((row) => row.replace('\r', '').split(''));
// console.log('inputs :', inputs);
const data = inputs.map((row) => row.map((col) => ({ col, inLoop: false })));
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
// let currentPoint: Point = {
//   p: 'J',
//   dir: 'top',
//   pos: {
//     x: 10,
//     y: 61,
//   },
//   parent: null,
//   next: null,
//   index: 0,
// };
let currentPoint: Point = {
  p: 'F',
  dir: 'right',
  pos: {
    x: 0,
    y: 2,
  },
  parent: null,
  next: null,
  index: 0,
};
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
    // console.log("(nextP as any) === 'S' :", (nextP as any) === 'S');
    // console.log('inputs :', inputs);
    // console.log('inputs :', inputs);
    // console.log('xy :', xy);
    // console.log('nextP :', nextP);
    // console.log('loopLength :', loopLength);
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
// console.log('currentPoint :', currentPoint);
// console.log('loop :', loop);
console.log('loop :', loop.length);
// console.log('loop :', loop[Math.floor(loop.length / 2)]);
console.log('Math.floor(loop.length / 2) :', Math.floor(loop.length / 2));
// // console.log('loop :', loop[8]);
// let insideLoop = 0;
// data.forEach((row) => {
//   row.forEach((col, index) => {
//     if (!col.inLoop) {
//       const leftLooped = row.filter(
//         (r, i) => index > i && r.inLoop && (r.col === 'I' || r.col === 'L' || r.col === 'J')
//       );
//       // console.log('leftLooped :', leftLooped);
//       leftLooped.length && leftLooped.length % 2 === 1 ? insideLoop++ : '';
//       console.log('leftLooped.length % 2 :', leftLooped.length % 2);
//     }
//   });
// });
// console.log('insideLoop :', insideLoop);
