import { addIterableMethodsInObject } from ".";
import getArray, { IRatingNumbers, getEmptyArray } from "./commonForTests/getArray";

it.each([
  [getArray(), (x: IRatingNumbers) => x.rating > 0, true],
  [getArray(), (x: IRatingNumbers) => x.rating > 2, false],
  [getEmptyArray(), (x: IRatingNumbers) => x.rating > 3, true],
])('enumerableEvery', (array: ReturnType<typeof getArray>, predicate: (ratingObj: IRatingNumbers) => boolean, expectedResult: boolean) => {
  const result = array.enumerableEvery(predicate);

  expect(result).toEqual(expectedResult);
});
