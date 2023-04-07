import getArray, { getEmptyArray } from "../commonForTests/getArray";


it.each([
  [getArray(), [4, 5]],
  [getEmptyArray(), []],
])('enumerableSkip', (array: ReturnType<typeof getArray>, expectedResult: number[]) => {
  const result = array
    .enumerableSkip(3)
    .enumerableMap(x => x.rating)
    .enumerableToArray();

  expect(result).toEqual(expectedResult);
});