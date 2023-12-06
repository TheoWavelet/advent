import { maps } from './index.ts';

export function fillGaps(map: (typeof maps)[0]) {
  return map.points.reduce((prev, curr, index) => {
    if (index === 0 && curr.startP > 0) {
      const gap = curr.startP - 1;
      if (gap > 0) {
        prev.push({
          startP: 0,
          startEndp: gap,
          destP: 0,
          destEndP: gap,
        });
      }
    }
    prev.push(curr);
    const next = map.points[index + 1];
    if (next) {
      const gap = next.startP - curr.startEndp - 1;
      if (gap > 0) {
        prev.push({
          startP: curr.startEndp + 1,
          startEndp: curr.startEndp + gap,
          destP: curr.startEndp + 1,
          destEndP: curr.startEndp + gap,
        });
      }
    }
    // console.log('prev :', prev);
    return prev;
  }, [] as typeof map.points);
}
export function fillMoreGaps(
  map: { startP: number; startEndp: number; destP: number; destEndP: number }[],
  point: { from: number; to: number }
) {
  // console.log('point :', point);
  if (!map.length) {
    map.push({
      startP: point.from,
      startEndp: point.to,
      destP: point.from,
      destEndP: point.to,
    });
  } else if (map[map.length - 1].startEndp < point.to) {
    map.push({
      startP: map[map.length - 1].startEndp === 0 ? 0 : map[map.length - 1].startEndp + 1,
      startEndp: point.to,
      destP: map[map.length - 1].startEndp === 0 ? 0 : map[map.length - 1].startEndp + 1,
      destEndP: point.to,
    });
  }
}
export function trim(
  destMap: { startP: number; startEndp: number; destP: number; destEndP: number }[],
  map: { startP: number; startEndp: number; destP: number; destEndP: number }[]
) {
  destMap.forEach((dest) => {
    const originalDest = { ...dest };

    const points = map.filter((p) => p.destP <= dest.startEndp && p.destEndP >= dest.startP);
    const smallestPointStart = points.reduce((prev, curr) => (prev.destP < curr.destP ? prev : curr));
    const biggestPointEnd = points.reduce((prev, curr) => (prev.destEndP > curr.destEndP ? prev : curr));
    if (smallestPointStart?.destP > dest.startP) {
      dest.destP = dest.destP + (smallestPointStart.destP - dest.startP);
      dest.startP = smallestPointStart.destP;
    }
    if (biggestPointEnd.destEndP < dest.startEndp) {
      dest.destEndP = dest.destEndP + (biggestPointEnd.destEndP - dest.startEndp);
      dest.startEndp = biggestPointEnd.destEndP;
    }
  });
  // const biggestSourceDest = map.reduce((prev, curr) => (prev.destEndP > curr.destEndP ? prev : curr));
  // const biggestDestSedt = destMap.reduce((prev, curr) => (prev.destEndP > curr.destEndP ? prev : curr));
  // if (biggestSourceDest?.destEndP > biggestDestSedt?.destEndP) {
  //   destMap.push({
  //     startP: biggestDestSedt.destEndP + 1,
  //     startEndp: biggestSourceDest.destEndP,
  //     destP: biggestDestSedt.destEndP + 1,
  //     destEndP: biggestSourceDest.destEndP,
  //   });
  // }
}
