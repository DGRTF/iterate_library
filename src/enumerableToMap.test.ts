import getArray from "./commonForTests/getArray";

test('enumerableToMap', () => {
  const expectedResult = [
    [1, { rating: 5, numbers: [5, 55, 555] }],
    [0, { rating: 4, numbers: [4, 44, 444] }],
  ]
  const actualMap = getArray()
    .enumerableMergeSort((x, y) => x.rating - y.rating)
    .enumerableToMap(x => x.rating % 2, x => x);

  expect([...actualMap]).toEqual(expectedResult);
});
