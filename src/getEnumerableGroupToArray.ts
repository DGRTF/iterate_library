import addIterableMethodsInIterableObject from "./common/addIterableMethodsInIterableObject";
import groupToMap from "./common/groupToMap";

export default <TMethods extends object>(methods: TMethods) =>
  function enumerableGroupToArray<TItem, TKey>(this: Iterable<TItem>, getKey: (item: TItem, iterationCount: number) => TKey): [TKey, TItem[]][] & TMethods {
    return addIterableMethodsInIterableObject([...groupToMap(this, getKey)], methods);
  }
