import type enumerableSome from "./enumerableSome";
import type enumerableSomeStrict from "./enumerableSomeStrict";
import type enumerableEvery from "./enumerableEvery";
import type enumerableEveryStrict from "./enumerableEveryStrict";
import type enumerableCount from "./enumerableCount";
import type enumerableToArray from "./enumerableToArray";
import type enumerableToMap from "./enumerableToMap";
import type enumerableToSet from "./enumerableToSet";
import type enumerableGroupToArray from "./enumerableGroupToArray";
import type enumerableGroupToMap from "./enumerableGroupToMap";
import type enumerableForEach from "./enumerableForEach";
import type enumerableReduceStrict from "./enumerableReduceStrict";

interface ILibraryMethods<TItem, TMethods> extends Iterable<TItem> {
  enumerableSome: typeof enumerableSome;
  enumerableSomeStrict: typeof enumerableSomeStrict;
  enumerableEvery: typeof enumerableEvery;
  enumerableEveryStrict: typeof enumerableEveryStrict;
  enumerableCount: typeof enumerableCount;
  enumerableToArray: typeof enumerableToArray;
  enumerableToMap: typeof enumerableToMap;
  enumerableToSet: typeof enumerableToSet;
  enumerableGroupToArray: typeof enumerableGroupToArray;
  enumerableGroupToMap: typeof enumerableGroupToMap;
  enumerableForEach: typeof enumerableForEach;
  enumerableReduceStrict: typeof enumerableReduceStrict;
  enumerableMap<TNewItem>(this: Iterable<TItem>, convert: (item: TItem) => TNewItem): Generator<TNewItem, void, unknown> & TMethods & ILibraryMethods<TItem, TMethods>;
  enumerableFilter<TItem>(this: Iterable<TItem>, predicate: (item: TItem) => any): Generator<TItem, void, unknown> & TMethods & ILibraryMethods<TItem, TMethods>;
  enumerableFilterStrict<TItem>(this: Iterable<TItem>, predicate: (item: TItem) => boolean): Generator<TItem, void, unknown> & TMethods & ILibraryMethods<TItem, TMethods>;
  enumerableFlatMap<TItem, TResultItem>(this: Iterable<TItem>, getInnerIterator: (item: TItem) => Iterable<TResultItem>): Generator<TItem, void, unknown> & TMethods & ILibraryMethods<TItem, TMethods>;
  enumerableForEachLazy<TItem>(this: Iterable<TItem>, functionForEveryItem: (item: TItem) => void): Generator<TItem, void, unknown> & TMethods & ILibraryMethods<TItem, TMethods>;

  enumerableReduce<TItem, TInitValue, TResult>(this: Iterable<TItem>,
    getNewValue: (previousResult: TItem | TInitValue | TResult | undefined, item: TItem) => TResult, initialValue?: TInitValue | undefined | TResult)
    : TInitValue | TItem | TResult | undefined
}

export type { ILibraryMethods };
