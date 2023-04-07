import getArray, { getEmptyArray } from "../commonForTests/getArray";


it.each([
  [getArray(), [1, 11, 111, 2, 22, 222, 3, 33, 333, 4, 44, 444, 5, 55, 555]],
  [getEmptyArray(), []],
])('enumerableFlatMap', (array: ReturnType<typeof getArray>, expectedResult: number[]) => {
  const result = array.enumerableFlatMap(x => x.numbers).enumerableToArray();
  const resultNative = array.flatMap(x => x.numbers);

  expect(result).toEqual(expectedResult);
  expect(result).toEqual(resultNative);
});

it.each([
  [getArray(), [1, 11, 111, 2, 22, 222, 3, 33, 333, 4, 44, 444, 5, 55, 555]],
  [getEmptyArray(), []],
])('enumerableFlatMap 2', (array: ReturnType<typeof getArray>, expectedResult: number[]) => {
  const result = array.enumerableFlatMap(x => x.numbers).enumerableToArray();

  expect(result).toEqual(expectedResult);
});