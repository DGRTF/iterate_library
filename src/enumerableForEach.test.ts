import getArray, { IRatingNumbers, getEmptyArray } from "./commonForTests/getArray";

test('enumerableForEach', () => {
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

  array.enumerableForEach(x => x.numbers = []);

  expect(array.enumerableToArray()).toEqual(expectedResult);
});
