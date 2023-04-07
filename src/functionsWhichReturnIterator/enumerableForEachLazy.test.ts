import getArray from "../commonForTests/getArray";

test('enumerableForEachLazy', () => {
  const array: ReturnType<typeof getArray> = getArray();

  const expectedResult = [
    {
      rating: 1,
      numbers: [],
    },
    {
      rating: 2,
      numbers: [],
    },
    {
      rating: 3,
      numbers: [],
    },
    {
      rating: 4,
      numbers: [],
    },
    {
      rating: 5,
      numbers: [],
    },
  ];

  const result = array.enumerableForEachLazy(x => x.numbers = []).enumerableToArray();

  expect(result).toEqual(expectedResult);
  expect(array.enumerableToArray()).toEqual(expectedResult);
});