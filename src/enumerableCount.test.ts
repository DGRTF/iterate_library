import { addIterableMethodsInObject } from ".";
import getArray, { getEmptyArray } from "./commonForTests/getArray";


it.each([
  [getArray(), 5],
  [getEmptyArray(), 0],
])('enumerableCount', (array: ReturnType<typeof getArray>, expectedResult: number) => {
  const result = array.enumerableGroupToArray(x => x.rating).enumerableCount();
  const mapResult = array.enumerableGroupToMap(x => x.rating).enumerableCount();
  const setResult = addIterableMethodsInObject(new Set(array)).enumerableCount();

  const objectResult = addIterableMethodsInObject({
    *[Symbol.iterator]() {
      for (const item of array)
        yield item;
    }
  }).enumerableCount();

  expect(result).toEqual(expectedResult);
  expect(mapResult).toEqual(expectedResult);
  expect(setResult).toEqual(expectedResult);
  expect(objectResult).toEqual(expectedResult);
});
