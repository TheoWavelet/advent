// const inputsText = await Deno.readTextFile('./12/inputs-test.txt');
// const isTest = true;
const inputsText = await Deno.readTextFile('./12/inputs-text.txt');
const isTest = false;
// const inputs = inputsText.split('\n').map((row) => row.replace('\r', ''));
// console.log('inputsText :', inputsText);
const inputs = inputsText.split('\n').map(
  (row) =>
    row
      .replace('\r', '')
      .split(' ')
      .map((it) => (it.includes(',') ? it.split(',').map(Number) : it.split(''))) as [[string], [number]]
);
// console.log('inputs :', inputs);
const cache = new Map<string, number>();
const count = (arr: string[], nums: number[]) => {
  if (arr.length === 0) {
    return nums.length === 0 ? 1 : 0;
  }
  if (nums.length === 0) {
    return arr.includes('#') ? 0 : 1;
  }
  const key = arr.join('') + nums.toString();
  // console.log('key :', key);
  if (cache.has(key)) {
    return cache.get(key);
  }
  let sum = 0;
  if (arr[0] === '.' || arr[0] === '?') {
    sum += count(arr.slice(1), [...nums]);
  }
  if (arr[0] === '#' || arr[0] === '?') {
    nums[0] <= arr.length &&
    arr.slice(0, nums[0]).every((it) => it !== '.') &&
    (nums[0] === arr.length || arr[nums[0]] !== '#')
      ? (sum += count(arr.slice(nums[0] + 1), nums.slice(1)))
      : (sum += 0);
  }
  cache.set(key, sum);
  return sum;
};
let total = 0;
inputs.forEach((row) => {
  // const total2 = count(row[0], row[1]); // part one
  const total2 = count(
    [...row[0], '?', ...row[0], '?', ...row[0], '?', ...row[0], '?', ...row[0]],
    [...row[1], ...row[1], ...row[1], ...row[1], ...row[1]]
  );
  total += total2;
});

console.log('total :', total);
