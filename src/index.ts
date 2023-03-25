import enumerableCount from "./enumerableCount";
import enumerableEvery from "./enumerableEvery";
import enumerableEveryStrict from "./enumerableEveryStrict";
import enumerableForEach from "./enumerableForEach";
import enumerableGroupToArray from "./enumerableGroupToArray";
import enumerableGroupToMap from "./enumerableGroupToMap";
import enumerableReduce from "./enumerableReduce";
import enumerableReduceStrict from "./enumerableReduceStrict";
import enumerableSome from "./enumerableSome";
import enumerableSomeStrict from "./enumerableSomeStrict";
import enumerableToArray from "./enumerableToArray";
import enumerableToMap from "./enumerableToMap";
import enumerableToSet from "./enumerableToSet";
import getEnumerableFilter from "./functionsWhichReturnIterator/getEnumerableFilter";
import getEnumerableFilterStrict from "./functionsWhichReturnIterator/getEnumerableFilterStrict";
import getEnumerableFlatMap from "./functionsWhichReturnIterator/getEnumerableFlatMap";
import getEnumerableForEachLazy from "./functionsWhichReturnIterator/getEnumerableForEachLazy";
import getEnumerableMap from "./functionsWhichReturnIterator/getEnumerableMap";
import { type ILibraryMethods } from "./types";

// export const getObjectCopyWithIterableMethods = <TObject extends Iterable<TItem>, TItem>(object: TObject) => {
//   return Array.isArray(object) ? addIterableAndYourMethodsInObject([...object], {}) :
//     addIterableAndYourMethodsInObject({ ...object }, {});
// }

export const setMethodsAllPrototypes = <TPrototype>(collections: { prototype: TPrototype }[]) =>
  collections.forEach(x => addIterableMethodsInObject(x.prototype as any));

export const addIterableMethodsInObject = <TObject extends Iterable<TItem>, TItem>(object: TObject): ILibraryMethods<TItem, {}> & TObject =>
  addIterableAndYourMethodsInObject(object, {});

export const addIterableMethodsInArray = <TItem>(object: TItem[]): ILibraryMethods<TItem, {}> & TItem[] =>
  addIterableAndYourMethodsInObject(object, {});

const addIterableAndYourMethodsInObject = <TObject extends Iterable<TItem>, TItem, TMethods extends {}>(object: TObject, methods: TMethods) => {
  const libraryMethods = { ...methods };

  const innerMethods = {
    enumerableSome,
    enumerableSomeStrict,
    enumerableEvery,
    enumerableCount,
    enumerableReduce,
    enumerableReduceStrict,
    enumerableGroupToArray,
    enumerableGroupToMap,
    enumerableEveryStrict,
    enumerableToArray,
    enumerableToSet,
    enumerableToMap,
    enumerableForEach,
    enumerableForEachLazy: getEnumerableForEachLazy(libraryMethods),
    enumerableFilter: getEnumerableFilter(libraryMethods),
    enumerableMap: getEnumerableMap(libraryMethods),
    enumerableFilterStrict: getEnumerableFilterStrict(libraryMethods),
    enumerableFlatMap: getEnumerableFlatMap(libraryMethods),
  };

  for (const [methodName, method] of Object.entries(innerMethods))
    (libraryMethods as any)[methodName] = method;

  for (const [methodName, method] of Object.entries(libraryMethods))
    (object as any)[methodName] = method;

  return object as ILibraryMethods<TItem, TMethods> & TObject;
}
