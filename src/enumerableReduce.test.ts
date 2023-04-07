import getArray, { getEmptyArray } from "./commonForTests/getArray";

it.each([
  [getArray(), 15],
  [getEmptyArray(), 0],
])('enumerableReduce', (array: ReturnType<typeof getArray>, expectedResult: number) => {
  const result = array.enumerableReduce((prev, x) => prev as any + x.rating, 0);

  expect(result).toEqual(expectedResult);

  const nativeResult = array.reduce((prev, x) => prev + x.rating, 0);
  expect(nativeResult).toEqual(expectedResult);
});

it.each([
  [getArray(), '[object Object]2345'],
])('enumerableReduce with no initial value', (array: ReturnType<typeof getArray>, expectedResult: string) => {
  const result = array.enumerableReduce((prev, x) => prev as any + x.rating);

  expect(result).toEqual(expectedResult);

  const nativeResult = array.reduce((prev, x) => prev as any + x.rating);
  expect(nativeResult).toEqual(expectedResult);
});
