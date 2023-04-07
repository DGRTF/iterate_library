import getArray, { IRating, getEmptyArray } from "../commonForTests/getArray";


it.each([
  [getArray(),
  [
    { rating: 4, },
    { rating: 5, },
  ]
  ],
  [getEmptyArray(), []],
])('enumerableFilter', (array: ReturnType<typeof getArray>, expectedResult: IRating[]) => {
  const result = array
    .enumerableFilter(x => x.rating > 3)
    .enumerableMap(x => ({ rating: x.rating }))
    .enumerableToArray();

  expect(result).toEqual(expectedResult);
});