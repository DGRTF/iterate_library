import { addIterableMethodsInArray, addIterableMethodsInObject } from './index';

interface IRating {
  rating: number;
}

interface INumbers {
  numbers: number[];
}

interface IRatingNumbers extends IRating, INumbers { }

const getArray = () => addIterableMethodsInArray([
  {
    rating: 1,
    numbers: [1, 11, 111],
  },
  {
    rating: 2,
    numbers: [2, 22, 222],
  },
  {
    rating: 3,
    numbers: [3, 33, 333],
  },
  {
    rating: 4,
    numbers: [4, 44, 444],
  },
  {
    rating: 5,
    numbers: [5, 55, 555],
  },
]);

const getEmptyArray = () => addIterableMethodsInArray<IRatingNumbers>([]);

it.each([
  [getArray(), [1, 2, 3, 4, 5]],
  [getEmptyArray(), []],
])('enumerableMap', (array: ReturnType<typeof getArray>, expectedResult: number[]) => {
  const result = array
    .enumerableMap(x => x.rating)
    .enumerableToArray();

  expect(result).toEqual(expectedResult);
});

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

it.each([
  [getArray(),
  [
    { rating: 4, },
    { rating: 5, },
  ]
  ],
  [getEmptyArray(), []],
])('enumerableFilterStrict', (array: ReturnType<typeof getArray>, expectedResult: IRating[]) => {
  const result = array
    .enumerableFilterStrict(x => x.rating > 3)
    .enumerableMap(x => ({ rating: x.rating }))
    .enumerableToArray();

  expect(result).toEqual(expectedResult);
});

it.each([
  [getArray(), (x: IRatingNumbers) => x.rating > 3, true],
  [getArray(), (x: IRatingNumbers) => x.rating > 5, false],
  [getEmptyArray(), (x: IRatingNumbers) => x.rating > 3, false],
])('enumerableSome', (array: ReturnType<typeof getArray>, predicate: (ratingObj: IRatingNumbers) => boolean, expectedResult: boolean) => {
  const result = array.enumerableSome(predicate);

  expect(result).toEqual(expectedResult);
});

it.each([
  [getArray(), (x: IRatingNumbers) => x.rating > 3, true],
  [getArray(), (x: IRatingNumbers) => x.rating > 5, false],
  [getEmptyArray(), (x: IRatingNumbers) => x.rating > 3, false],
])('enumerableSomeStrict', (array: ReturnType<typeof getArray>, predicate: (ratingObj: IRatingNumbers) => boolean, expectedResult: boolean) => {
  const result = array.enumerableSomeStrict(predicate);

  expect(result).toEqual(expectedResult);
});

it.each([
  [getArray(), (x: IRatingNumbers) => x.rating > 0, true],
  [getArray(), (x: IRatingNumbers) => x.rating > 2, false],
  [getEmptyArray(), (x: IRatingNumbers) => x.rating > 3, true],
])('enumerableEvery', (array: ReturnType<typeof getArray>, predicate: (ratingObj: IRatingNumbers) => boolean, expectedResult: boolean) => {
  const result = array.enumerableEvery(predicate);

  expect(result).toEqual(expectedResult);
});

it.each([
  [getArray(), (x: IRatingNumbers) => x.rating > 0, true],
  [getArray(), (x: IRatingNumbers) => x.rating > 2, false],
  [getEmptyArray(), (x: IRatingNumbers) => x.rating > 3, true],
])('enumerableEveryStrict', (array: ReturnType<typeof getArray>, predicate: (ratingObj: IRatingNumbers) => boolean, expectedResult: boolean) => {
  const result = array.enumerableEveryStrict(predicate);

  expect(result).toEqual(expectedResult);
});

it.each([
  [getArray(), [1, 11, 111, 2, 22, 222, 3, 33, 333, 4, 44, 444, 5, 55, 555]],
  [getEmptyArray(), []],
])('enumerableFlatMap', (array: ReturnType<typeof getArray>, expectedResult: number[]) => {
  const result = array.enumerableFlatMap(x => x.numbers).enumerableToArray();
  const resultNative = array.flatMap(x => x.numbers);

  expect(result).toEqual(expectedResult);
  expect(result).toEqual(resultNative);
});

it.each([
  [getArray(), [1, 11, 111, 2, 22, 222, 3, 33, 333, 4, 44, 444, 5, 55, 555]],
  [getEmptyArray(), []],
])('enumerableFlatMap', (array: ReturnType<typeof getArray>, expectedResult: number[]) => {
  const result = array.enumerableFlatMap(x => x.numbers).enumerableToArray();

  expect(result).toEqual(expectedResult);
});

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

it.each([
  [getArray(), 5],
  [getEmptyArray(), 0],
])('enumerableCount', (array: ReturnType<typeof getArray>, expectedResult: number) => {
  const result = array.enumerableCount();

  expect(result).toEqual(expectedResult);
});

it.each([
  [getArray(), 15],
  [getEmptyArray(), 0],
])('enumerableReduce', (array: ReturnType<typeof getArray>, expectedResult: number) => {
  const result = array.enumerableReduce((prev, x) => prev as any + x.rating, 0);

  expect(result).toEqual(expectedResult);

  const nativeResult = array.reduce((prev, x) => prev + x.rating, 0);
  expect(nativeResult).toEqual(expectedResult);
});

it.each([
  [getArray(), '[object Object]2345'],
])('enumerableReduce with no initial value', (array: ReturnType<typeof getArray>, expectedResult: string) => {
  const result = array.enumerableReduce((prev, x) => prev as any + x.rating);

  expect(result).toEqual(expectedResult);

  const nativeResult = array.reduce((prev, x) => prev as any + x.rating);
  expect(nativeResult).toEqual(expectedResult);
});

test('enumerableGroupToArray', () => {
  const inventory = addIterableMethodsInArray([
    { name: "asparagus", type: "vegetables", quantity: 9 },
    { name: "bananas", type: "fruit", quantity: 5 },
    { name: "goat", type: "meat", quantity: 9 },
    { name: "cherries", type: "fruit", quantity: 5 },
    { name: "fish", type: "meat", quantity: 22 },
  ]);
  const w = inventory.enumerableGroupToArray(({ quantity }) => quantity);

  expect(w).toEqual([
    [9, [
      { name: "asparagus", type: "vegetables", quantity: 9 },
      { name: "goat", type: "meat", quantity: 9 },
    ],
    ],
    [5, [
      { name: "bananas", type: "fruit", quantity: 5 },
      { name: "cherries", type: "fruit", quantity: 5 },
    ],
    ],
    [22, [
      { name: "fish", type: "meat", quantity: 22 },
    ],
    ],
  ]);
});

it.each([
  [getArray(), 15],
])('enumerableReduceStrict', (array: ReturnType<typeof getArray>, expectedResult: number) => {
  const result = array.enumerableReduceStrict((prev, x) => prev + x.rating, 0);

  expect(result).toEqual(expectedResult);

  const nativeResult = array.reduce((prev, x) => prev + x.rating, 0);
  expect(nativeResult).toEqual(expectedResult);
});

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

test('check counters', () => {
  const array = getArray();

  const checkCount = (item: IRatingNumbers, count: number) => {
    if (item.rating - 1 !== count)
      throw new Error("Count is not valid");

    return false;
  };

  const checkCountForFlatMap = (item: IRatingNumbers, count: number) => {
    checkCount(item, count);

    return item.numbers;
  };

  const checkCountForReduce = (prev: boolean, item: IRatingNumbers, count: number) => checkCount(item, count);

  array.enumerableForEach(checkCount);
  array.enumerableForEachLazy(checkCount).enumerableToArray();
  array.enumerableSome(checkCount);
  array.enumerableSomeStrict(checkCount);
  array.enumerableEvery(checkCount);
  array.enumerableEveryStrict(checkCount);
  array.enumerableFilter(checkCount).enumerableToArray();
  array.enumerableFilterStrict(checkCount).enumerableToArray();
  array.enumerableToMap(checkCount, checkCount);
  array.enumerableMap(checkCount).enumerableToArray();
  array.enumerableGroupToArray(checkCount);
  array.enumerableGroupToMap(checkCount);
  // array.enumerableReduce(checkCountForReduce);
  array.enumerableReduceStrict(checkCountForReduce, false);
  array.enumerableFlatMap(checkCountForFlatMap);
  array.enumerableFind(checkCount);
  array.enumerableFindStrict(checkCount);
});

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

test('enumerableMergeSort', () => {
  const array = addIterableMethodsInArray(getArray());

  expect(() => array.enumerableMergeSort(a => a as any)).toThrow();
  expect(() => array.enumerableMergeSort(a => NaN)).toThrow();
});

it.each([
  [getArray(), [4, 5]],
  [getEmptyArray(), []],
])('enumerableSkip', (array: ReturnType<typeof getArray>, expectedResult: number[]) => {
  const result = array
    .enumerableSkip(3)
    .enumerableMap(x => x.rating)
    .enumerableToArray();

  expect(result).toEqual(expectedResult);
});

it.each([
  [getArray(), [1, 2, 3]],
  [getEmptyArray(), []],
])('enumerableTake', (array: ReturnType<typeof getArray>, expectedResult: number[]) => {
  const result = array
    .enumerableTake(3)
    .enumerableMap(x => x.rating)
    .enumerableToArray();

  expect(result).toEqual(expectedResult);
});

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

it.each([
  [getArray(), 1, false],
  [getEmptyArray(), 0, true],
])('enumerableFirstFluent', (array: ReturnType<typeof getArray>, expectedResultWas: number, expectedResultNotWas: boolean) => {
  let resultWas = 0;
  let resultNotWas = false;

  array
    .enumerableFirstFluent()
    .IfFound(x => resultWas = x.rating)
    .IfNotFound(() => resultNotWas = true);

  expect(resultWas).toBe(expectedResultWas);
  expect(resultNotWas).toBe(expectedResultNotWas);
});

it.each([
  [getArray(), 4, x => x > 3],
  [getEmptyArray(), undefined, x => x > 3],
  [getArray(), 1, x => x],
])('enumerableFind', (array: ReturnType<typeof getArray>, expectedResult: number | undefined, predicate: (item: any) => any) => {
  const enumerableResult = array
    .enumerableMap(x => x.rating)
    .enumerableFind(predicate);

  const nativeResult = array.map(x => x.rating).find(predicate);

  expect(enumerableResult).toBe(expectedResult);
  expect(nativeResult).toBe(expectedResult);
});

it.each([
  [getArray(), 4, x => x > 3],
  [getEmptyArray(), undefined, x => x > 3],
  [getArray(), undefined, x => x],
])('enumerableFindStrict', (array: ReturnType<typeof getArray>, expectedResult: number | undefined, predicate: (item: any) => boolean) => {
  const enumerableResult = array
    .enumerableMap(x => x.rating)
    .enumerableFindStrict(predicate);

  expect(enumerableResult).toBe(expectedResult);
});

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
