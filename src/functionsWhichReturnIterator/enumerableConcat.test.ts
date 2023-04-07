import getArray, { getEmptyArray } from "../commonForTests/getArray";

it.each([
  [getArray(), [6, 7], [8, 9, 10], [3, 4, 5, 6, 7, 8, 9, 10]],
  [getEmptyArray(), [6, 7, 8], [9, 10], [6, 7, 8, 9, 10]],
  [getArray(), [], [6], [3, 4, 5, 6]],
  [getEmptyArray(), [], [], []],
  [getArray(), [], [], [3, 4, 5]],
  [getEmptyArray(), 6, 7, [6, 7]],
  [getArray(), 6, 7, [3, 4, 5, 6, 7]],
  [getArray(), undefined, 7, [3, 4, 5, undefined, 7]],
])('enumerableConcat', (array: ReturnType<typeof getArray>,
  secondSequence: number[] | number,
  thirdSequence: number[] | number,
  resultSequence: number[] | number) => {
  const enumerableResult = array
    .enumerableMap(x => x.rating)
    .enumerableConcat(secondSequence, thirdSequence)
    .enumerableFilterStrict(x => x > 2 || x === undefined)
    .enumerableToArray();

  expect(enumerableResult).toEqual(resultSequence);
});
