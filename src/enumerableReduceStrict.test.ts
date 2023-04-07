import getArray from "./commonForTests/getArray";

it.each([
  [getArray(), 15],
])('enumerableReduceStrict', (array: ReturnType<typeof getArray>, expectedResult: number) => {
  const result = array.enumerableReduceStrict((prev, x) => prev + x.rating, 0);

  expect(result).toEqual(expectedResult);

  const nativeResult = array.reduce((prev, x) => prev + x.rating, 0);
  expect(nativeResult).toEqual(expectedResult);
});
