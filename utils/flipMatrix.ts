export const flipMatrix = (matrix: string[][]): string[][] => {
  let result: string[][] = Array(matrix[0].length).map(() => Array(matrix.length).fill(0));
  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result[0].length; j++) {
      result[i][j] = matrix[j][i];
    }
  }
  return result;
};
