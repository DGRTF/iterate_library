import getArray, { IRatingNumbers, getEmptyArray } from "./commonForTests/getArray";

it.each([
  [getArray(), (x: IRatingNumbers) => x.rating > 3, true],
  [getArray(), (x: IRatingNumbers) => x.rating > 5, false],
  [getEmptyArray(), (x: IRatingNumbers) => x.rating > 3, false],
])('enumerableSomeStrict', (array: ReturnType<typeof getArray>, predicate: (ratingObj: IRatingNumbers) => boolean, expectedResult: boolean) => {
  const result = array.enumerableSomeStrict(predicate);

  expect(result).toEqual(expectedResult);
});
