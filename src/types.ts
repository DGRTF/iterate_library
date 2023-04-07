import type enumerableSome from "./enumerableSome";
import type enumerableSomeStrict from "./enumerableSomeStrict";
import type enumerableEvery from "./enumerableEvery";
import type enumerableEveryStrict from "./enumerableEveryStrict";
import type enumerableCount from "./enumerableCount";
import type enumerableToArray from "./enumerableToArray";
import type enumerableToMap from "./enumerableToMap";
import type enumerableToSet from "./enumerableToSet";
import type enumerableForEach from "./enumerableForEach";
import type enumerableReduceStrict from "./enumerableReduceStrict";
import type enumerableFirst from "./enumerableFirst";
import type enumerableFirstFluent from "./enumerableFirstFluent";
import type enumerableFind from "./enumerableFind";
import type enumerableFindStrict from "./enumerableFindStrict";

type addPrefixToObject<TObject extends {}, TPrefix extends string> = {
  [key in keyof TObject as key extends string ? `${TPrefix}${key}` : never]: TObject[key]
}

interface ILibraryMethods<TItem, TMethods, TPrefix extends string> extends Iterable<TItem> {
  Some: typeof enumerableSome;
  SomeStrict: typeof enumerableSomeStrict;
  Every: typeof enumerableEvery;
  EveryStrict: typeof enumerableEveryStrict;
  Count: typeof enumerableCount;
  ToArray: typeof enumerableToArray;
  ToMap: typeof enumerableToMap;
  ToSet: typeof enumerableToSet;
  GroupToArray<TItem, TKey>(this: Iterable<TItem>, getKey: (item: TItem, iterationCount: number) => TKey): [TKey, TItem[]][] & TMethods & addPrefixToObject<ILibraryMethods<TItem, TMethods, TPrefix>, TPrefix>;

  GroupToMap<TItem, TKey>(
    this: Iterable<TItem>,
    getKey: (item: TItem, iterationCount: number) => TKey): Map<TKey, TItem[]> & TMethods & addPrefixToObject<ILibraryMethods<TItem, TMethods, TPrefix>, TPrefix>;

  ForEach: typeof enumerableForEach;
  ReduceStrict: typeof enumerableReduceStrict;
  First: typeof enumerableFirst;
  FirstFluent: typeof enumerableFirstFluent;
  Find: typeof enumerableFind;
  FindStrict: typeof enumerableFindStrict;
  Map<TNewItem>(this: Iterable<TItem>, convert: (item: TItem, iterationCount: number) => TNewItem): Generator<TNewItem, void, unknown> & TMethods & addPrefixToObject<ILibraryMethods<TItem, TMethods, TPrefix>, TPrefix>;
  Filter<TItem>(this: Iterable<TItem>, predicate: (item: TItem, iterationCount: number) => any): Generator<TItem, void, unknown> & TMethods & addPrefixToObject<ILibraryMethods<TItem, TMethods, TPrefix>, TPrefix>;
  FilterStrict<TItem>(this: Iterable<TItem>, predicate: (item: TItem, iterationCount: number) => boolean): Generator<TItem, void, unknown> & TMethods & addPrefixToObject<ILibraryMethods<TItem, TMethods, TPrefix>, TPrefix>;
  FlatMap<TItem, TResultItem>(this: Iterable<TItem>, getInnerIterator: (item: TItem, iterationCount: number) => Iterable<TResultItem>): Generator<TItem, void, unknown> & TMethods & addPrefixToObject<ILibraryMethods<TItem, TMethods, TPrefix>, TPrefix>;
  ForEachLazy<TItem>(this: Iterable<TItem>, functionForEveryItem: (item: TItem, iterationCount: number) => void): Generator<TItem, void, unknown> & TMethods & addPrefixToObject<ILibraryMethods<TItem, TMethods, TPrefix>, TPrefix>;
  MergeSort<TItem>(this: Iterable<TItem>, comparator: (a: TItem, b: TItem) => number): TItem[] & addPrefixToObject<ILibraryMethods<TItem, TMethods, TPrefix>, TPrefix>;
  Skip<TItem>(this: Iterable<TItem>, skipCount: number): Generator<TItem, void, unknown> & TMethods & addPrefixToObject<ILibraryMethods<TItem, TMethods, TPrefix>, TPrefix>;
  Take<TItem>(this: Iterable<TItem>, takeCount: number): Generator<TItem, void, unknown> & TMethods & addPrefixToObject<ILibraryMethods<TItem, TMethods, TPrefix>, TPrefix>;
  Concat<TItem>(this: Iterable<TItem>, ...sequences: (Iterable<TItem> | number)[]): Generator<TItem, void> & TMethods & addPrefixToObject<ILibraryMethods<TItem, TMethods, TPrefix>, TPrefix>;

  Reduce<TItem, TInitValue, TResult>(this: Iterable<TItem>,
    getNewValue: (previousResult: TItem | TInitValue | TResult | undefined, item: TItem) => TResult, initialValue?: TInitValue | undefined | TResult)
    : TInitValue | TItem | TResult | undefined
}

export type { ILibraryMethods, addPrefixToObject };
