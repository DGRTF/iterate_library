import enumerableSome from "./enumerableSome";
import enumerableSomeStrict from "./enumerableSomeStrict";
import enumerableEvery from "./enumerableEvery";
import enumerableEveryStrict from "./enumerableEveryStrict";
import enumerableCount from "./enumerableCount";
import enumerableToArray from "./enumerableToArray";
import enumerableToMap from "./enumerableToMap";
import enumerableToSet from "./enumerableToSet";
import enumerableGroupToArray from "./enumerableGroupToArray";
import enumerableGroupToMap from "./enumerableGroupToMap";
import enumerableForEachFinal from "./enumerableForEachFinal";
import enumerableReduceStrict from "./enumerableReduceStrict";

export interface ILibraryMethods<TItem, TMethods> extends Iterable<TItem> {
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
  enumerableForEachFinal: typeof enumerableForEachFinal;
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
