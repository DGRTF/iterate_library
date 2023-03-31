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

interface ILibraryMethods<TItem, TMethods> extends Iterable<TItem> {
  enumerableSome: typeof enumerableSome;
  enumerableSomeStrict: typeof enumerableSomeStrict;
  enumerableEvery: typeof enumerableEvery;
  enumerableEveryStrict: typeof enumerableEveryStrict;
  enumerableCount: typeof enumerableCount;
  enumerableToArray: typeof enumerableToArray;
  enumerableToMap: typeof enumerableToMap;
  enumerableToSet: typeof enumerableToSet;
  enumerableGroupToArray<TItem, TKey>(this: Iterable<TItem>, getKey: (item: TItem, iterationCount: number) => TKey): [TKey, TItem[]][] & TMethods & ILibraryMethods<TItem, TMethods>;

  enumerableGroupToMap<TItem, TKey>(
    this: Iterable<TItem>,
    getKey: (item: TItem, iterationCount: number) => TKey): Map<TKey, TItem[]> & TMethods & ILibraryMethods<TItem, TMethods>;

  enumerableForEach: typeof enumerableForEach;
  enumerableReduceStrict: typeof enumerableReduceStrict;
  enumerableFirst: typeof enumerableFirst;
  enumerableFirstFluent: typeof enumerableFirstFluent;
  enumerableFind: typeof enumerableFind;
  enumerableFindStrict: typeof enumerableFindStrict;
  enumerableMap<TNewItem>(this: Iterable<TItem>, convert: (item: TItem, iterationCount: number) => TNewItem): Generator<TNewItem, void, unknown> & TMethods & ILibraryMethods<TNewItem, TMethods>;
  enumerableFilter<TItem>(this: Iterable<TItem>, predicate: (item: TItem, iterationCount: number) => any): Generator<TItem, void, unknown> & TMethods & ILibraryMethods<TItem, TMethods>;
  enumerableFilterStrict<TItem>(this: Iterable<TItem>, predicate: (item: TItem, iterationCount: number) => boolean): Generator<TItem, void, unknown> & TMethods & ILibraryMethods<TItem, TMethods>;
  enumerableFlatMap<TItem, TResultItem>(this: Iterable<TItem>, getInnerIterator: (item: TItem, iterationCount: number) => Iterable<TResultItem>): Generator<TItem, void, unknown> & TMethods & ILibraryMethods<TItem, TMethods>;
  enumerableForEachLazy<TItem>(this: Iterable<TItem>, functionForEveryItem: (item: TItem, iterationCount: number) => void): Generator<TItem, void, unknown> & TMethods & ILibraryMethods<TItem, TMethods>;
  enumerableMergeSort<TItem>(this: Iterable<TItem>, comparator: (a: TItem, b: TItem) => number): TItem[] & ILibraryMethods<TItem, TMethods>;
  enumerableSkip<TItem>(this: Iterable<TItem>, skipCount: number): Generator<TItem, void, unknown> & TMethods & ILibraryMethods<TItem, TMethods>;
  enumerableTake<TItem>(this: Iterable<TItem>, takeCount: number): Generator<TItem, void, unknown> & TMethods & ILibraryMethods<TItem, TMethods>;
  enumerableConcat<TItem>(this: Iterable<TItem>, ...sequences: (Iterable<TItem> | number)[]): Generator<TItem, void> & TMethods & ILibraryMethods<TItem, TMethods>;

  enumerableReduce<TItem, TInitValue, TResult>(this: Iterable<TItem>,
    getNewValue: (previousResult: TItem | TInitValue | TResult | undefined, item: TItem) => TResult, initialValue?: TInitValue | undefined | TResult)
    : TInitValue | TItem | TResult | undefined
}

export type { ILibraryMethods };
