import getArray, { IRatingNumbers } from './commonForTests/getArray';
import { addIterableMethodsInArray, setMethodsAllPrototypes } from './index';
import { ILibraryMethods, addPrefixToObject } from './types';

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

test('addIterableMethodsInArray prefix', () => {
  const ar = addIterableMethodsInArray([
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
  ], 'myPrefix');

  const numbers = ar.myPrefixMap(x => x.rating).myPrefixToArray();

  expect(numbers).toEqual([1, 2, 3, 4, 5]);
});

test('setMethodsAllPrototypes', () => {
  setMethodsAllPrototypes([
    Array,
    Map,
    Set,
  ],
    myPrefixPrefix);

  const result = [1, 2, 3, 4, 5].myPrefixMap(x => x + 2).myPrefixToArray();

  const resultMap = new Map([
    [1, { name: "One" }],
    [2, { name: "Two" }],
    [3, { name: "Three" }],
  ])
    .myPrefixMap(x => x[1].name)
    .myPrefixToArray();

  const resultSet = new Set([1, 2, 3, 4, 5, 1, 3, 5])
    .myPrefixMap(x => x + 2)
    .myPrefixToArray();

  expect(result).toEqual([3, 4, 5, 6, 7]);
  expect(resultMap).toEqual(["One", "Two", "Three"]);
  expect(resultSet).toEqual([3, 4, 5, 6, 7]);
});

const myPrefixPrefix = "myPrefix";
declare global {
  interface Array<T> extends addPrefixToObject<ILibraryMethods<T, {}, typeof myPrefixPrefix>, typeof myPrefixPrefix> { }
  interface Map<K, V> extends addPrefixToObject<ILibraryMethods<[K, V], {}, typeof myPrefixPrefix>, typeof myPrefixPrefix> { }
  interface Set<T> extends addPrefixToObject<ILibraryMethods<T, {}, typeof myPrefixPrefix>, typeof myPrefixPrefix> { }
}