import addIterableMethodsInIterableObject from "./common/addIterableMethodsInIterableObject";
import groupToMap from "./common/groupToMap";

export default <TMethods extends object>(methods: TMethods) =>
  function enumerableGroupToMap<TItem, TKey>(
    this: Iterable<TItem>,
    getKey: (item: TItem, iterationCount: number) => TKey): Map<TKey, TItem[]> {

    return addIterableMethodsInIterableObject(groupToMap(this, getKey), methods);
  }
