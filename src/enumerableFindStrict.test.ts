import getArray, { getEmptyArray } from "./commonForTests/getArray";

it.each([
  [getArray(), 4, (x: number) => x > 3],
  [getEmptyArray(), undefined, (x: number) => x > 3],
])('enumerableFindStrict', (array: ReturnType<typeof getArray>, expectedResult: number | undefined, predicate: (item: any) => boolean) => {
  const enumerableResult = array
    .enumerableMap(x => x.rating)
    .enumerableFindStrict(predicate);

  expect(enumerableResult).toBe(expectedResult);
});
