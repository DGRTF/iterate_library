import getArray, { IRatingNumbers, getEmptyArray } from "./commonForTests/getArray";

it.each([
  [getArray(), (x: IRatingNumbers) => x.rating > 0, true],
  [getArray(), (x: IRatingNumbers) => x.rating > 2, false],
  [getEmptyArray(), (x: IRatingNumbers) => x.rating > 3, true],
])('enumerableEveryStrict', (array: ReturnType<typeof getArray>, predicate: (ratingObj: IRatingNumbers) => boolean, expectedResult: boolean) => {
  const result = array.enumerableEveryStrict(predicate);

  expect(result).toEqual(expectedResult);
});
