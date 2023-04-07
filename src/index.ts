import enumerableCount from "./enumerableCount";
import enumerableEvery from "./enumerableEvery";
import enumerableEveryStrict from "./enumerableEveryStrict";
import enumerableFind from "./enumerableFind";
import enumerableFindStrict from "./enumerableFindStrict";
import enumerableFirst from "./enumerableFirst";
import enumerableFirstFluent from "./enumerableFirstFluent";
import enumerableForEach from "./enumerableForEach";
import getEnumerableGroupToArray from "./getEnumerableGroupToArray";
import getEnumerableGroupToMap from "./getEnumerableGroupToMap";
import enumerableReduce from "./enumerableReduce";
import enumerableReduceStrict from "./enumerableReduceStrict";
import enumerableSome from "./enumerableSome";
import enumerableSomeStrict from "./enumerableSomeStrict";
import enumerableToArray from "./enumerableToArray";
import enumerableToMap from "./enumerableToMap";
import enumerableToSet from "./enumerableToSet";
import getEnumerableConcat from "./functionsWhichReturnIterator/getEnumerableConcat";
import getEnumerableFilter from "./functionsWhichReturnIterator/getEnumerableFilter";
import getEnumerableFilterStrict from "./functionsWhichReturnIterator/getEnumerableFilterStrict";
import getEnumerableFlatMap from "./functionsWhichReturnIterator/getEnumerableFlatMap";
import getEnumerableForEachLazy from "./functionsWhichReturnIterator/getEnumerableForEachLazy";
import getEnumerableMap from "./functionsWhichReturnIterator/getEnumerableMap";
import getEnumerableSkip from "./functionsWhichReturnIterator/getEnumerableSkip";
import getEnumerableTake from "./functionsWhichReturnIterator/getEnumerableTake";
import getEnumerableMergeSort from './getEnumerableMergeSort';
import { type addPrefixToObject, type ILibraryMethods } from "./types";
import addMethodsInObject from "./common/addMethodsInObject";

const enumerablePrefix = "enumerable";

export const setMethodsAllPrototypes = <TPrototype, TPrefix extends string = typeof enumerablePrefix>(collections: { prototype: TPrototype }[], prefix: TPrefix = enumerablePrefix as TPrefix) =>
  collections.forEach(x => addIterableMethodsInObject(x.prototype as any), prefix);

export const addIterableMethodsInObject =
  <TObject extends Iterable<TItem>, TItem, TPrefix extends string = typeof enumerablePrefix>(object: TObject, prefix: TPrefix = enumerablePrefix as TPrefix):
    addPrefixToObject<ILibraryMethods<TItem, {}, typeof enumerablePrefix>, typeof enumerablePrefix> & TObject =>
    addIterableAndYourMethodsInObject(object, {}, prefix);

export const addIterableMethodsInArray = <TItem, TPrefix extends string = typeof enumerablePrefix>(object: TItem[], prefix: TPrefix = enumerablePrefix as TPrefix): addPrefixToObject<ILibraryMethods<TItem, {}, TPrefix>, TPrefix> & TItem[] =>
  addIterableAndYourMethodsInObject(object, {}, prefix);

const addIterableAndYourMethodsInObject =
  <TObject extends Iterable<TItem>, TItem, TMethods extends {}, TPrefix extends string>(object: TObject, methods: TMethods, prefix: TPrefix) => {

    const libraryMethods = { ...methods };

    const innerMethods = {
      [prefix + "Some"]: enumerableSome,
      [prefix + "SomeStrict"]: enumerableSomeStrict,
      [prefix + "Every"]: enumerableEvery,
      [prefix + "Count"]: enumerableCount,
      [prefix + "Reduce"]: enumerableReduce,
      [prefix + "ReduceStrict"]: enumerableReduceStrict,
      [prefix + "GroupToArray"]: getEnumerableGroupToArray(libraryMethods),
      [prefix + "GroupToMap"]: getEnumerableGroupToMap(libraryMethods),
      [prefix + "EveryStrict"]: enumerableEveryStrict,
      [prefix + "ToArray"]: enumerableToArray,
      [prefix + "ToSet"]: enumerableToSet,
      [prefix + "ToMap"]: enumerableToMap,
      [prefix + "ForEach"]: enumerableForEach,
      [prefix + "First"]: enumerableFirst,
      [prefix + "FirstFluent"]: enumerableFirstFluent,
      [prefix + "Find"]: enumerableFind,
      [prefix + "FindStrict"]: enumerableFindStrict,
      [prefix + "ForEachLazy"]: getEnumerableForEachLazy(libraryMethods),
      [prefix + "Filter"]: getEnumerableFilter(libraryMethods),
      [prefix + "Map"]: getEnumerableMap(libraryMethods),
      [prefix + "FilterStrict"]: getEnumerableFilterStrict(libraryMethods),
      [prefix + "FlatMap"]: getEnumerableFlatMap(libraryMethods),
      [prefix + "MergeSort"]: getEnumerableMergeSort(libraryMethods),
      [prefix + "Skip"]: getEnumerableSkip(libraryMethods),
      [prefix + "Take"]: getEnumerableTake(libraryMethods),
      [prefix + "Concat"]: getEnumerableConcat(libraryMethods),
    };

    object = addMethodsInObject(object, addMethodsInObject(libraryMethods, innerMethods));

    return object as addPrefixToObject<ILibraryMethods<TItem, TMethods, TPrefix>, TPrefix> & TObject;
  }

