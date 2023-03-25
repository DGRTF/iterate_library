import groupToMap from "./common/groupToMap";

export default function enumerableGroupToArray<TItem, TKey>(this: Iterable<TItem>, getKey: (item: TItem, iterationCount: number) => TKey): [TKey, TItem[]][] {
  return [...groupToMap(this, getKey)];
}
