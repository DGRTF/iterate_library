import getArray, { getEmptyArray } from "./commonForTests/getArray";

it.each([
  [getArray(), 4, x => x > 3],
  [getEmptyArray(), undefined, x => x > 3],
  [getArray(), 1, x => x],
])('enumerableFind', (array: ReturnType<typeof getArray>, expectedResult: number | undefined, predicate: (item: any) => any) => {
  const enumerableResult = array
    .enumerableMap(x => x.rating)
    .enumerableFind(predicate);

  const nativeResult = array.map(x => x.rating).find(predicate);

  expect(enumerableResult).toBe(expectedResult);
  expect(nativeResult).toBe(expectedResult);
});