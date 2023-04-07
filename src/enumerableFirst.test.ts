import getArray, { getEmptyArray } from "./commonForTests/getArray";

it.each([
  [getArray(), 1, true],
  [getEmptyArray(), undefined, false],
])('enumerableFirst', (array: ReturnType<typeof getArray>, expectedResultItem: number | undefined, expectedResultIsFind: boolean) => {
  const [item, isFind] = array
    .enumerableMap(x => x.rating)
    .enumerableFirst();

  expect(item).toBe(expectedResultItem);
  expect(isFind).toBe(expectedResultIsFind);
});
