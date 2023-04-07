import getArray, { getEmptyArray } from "../commonForTests/getArray";

it.each([
  [getArray(), [1, 2, 3, 4, 5]],
  [getEmptyArray(), []],
])('enumerableMap', (array: ReturnType<typeof getArray>, expectedResult: number[]) => {
  const result = array
    .enumerableMap(x => x.rating)
    .enumerableToArray();

  expect(result).toEqual(expectedResult);
});
