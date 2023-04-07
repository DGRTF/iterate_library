import { addIterableMethodsInArray } from ".";
import getArray from "./commonForTests/getArray";

it.each([
  [[6, 5, 3, 1, 8, 9, 7, 2, 4], [1, 2, 3, 4, 5, 6, 7, 8, 9], false, true],
  [[6, 5, 3, 1, 8, 7, 2, 4], [1, 2, 3, 4, 5, 6, 7, 8], false, true],
  [[], [], true, false]
])('enumerableMergeSort', (array: number[], expectedResult: number[], expectedEvery: boolean, expectedSome: boolean) => {
  const newArray = addIterableMethodsInArray(array);

  const actual = newArray.enumerableMergeSort((a, b) => a - b);
  const every = actual.enumerableEvery(x => x > 5);
  const some = actual.enumerableSome(x => x > 5);

  expect(actual.map(x => x)).toEqual(expectedResult);
  expect(every).toBe(expectedEvery);
  expect(some).toEqual(expectedSome);
});

test('enumerableMergeSort throw', () => {
  const array = addIterableMethodsInArray(getArray());

  expect(() => array.enumerableMergeSort(a => a as any)).toThrow();
  expect(() => array.enumerableMergeSort(a => NaN)).toThrow();
});
