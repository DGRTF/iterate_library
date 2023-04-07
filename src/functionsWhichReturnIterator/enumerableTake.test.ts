import getArray, { getEmptyArray } from "../commonForTests/getArray";


it.each([
  [getArray(), [1, 2, 3]],
  [getEmptyArray(), []],
])('enumerableTake', (array: ReturnType<typeof getArray>, expectedResult: number[]) => {
  const result = array
    .enumerableTake(3)
    .enumerableMap(x => x.rating)
    .enumerableToArray();

  expect(result).toEqual(expectedResult);
});